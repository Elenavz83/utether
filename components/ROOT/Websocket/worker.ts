import * as WSK from 'ws'


export const UpdateWorkersStatus = async () => {

    let offlines = global.workers.filter(w => !(w?.lastseen) || (w.lastseen < new Date().getTime() - 30000))
    let onlines = global.workers.filter(w => (w.lastseen > new Date().getTime() - 30000))
    let wdb = global.db.collection("worker");
    let WS = "WS" + process.env.CDN;
    let qoff = {
        $or: offlines.map(w => {
            return {
                devid: new global.ObjectId(w.devid), app: w.app, wid: w.wid, [WS]: { $ne: "offline" }
            }
        })
    }
    let qon = {
        $or: onlines.map(w => {
            return {
                devid: new global.ObjectId(w.devid), app: w.app, wid: w.wid, [WS]: { $ne: "online" }
            }
        })
    }

    if (process.env.DOMAIN.split('.').length > 2) {
        console.log("WS Connection on DEVELOPER IS NOT Supported.")
        return;
    }

    for (let worker of offlines) {
        try {
            worker.ws?.close?.();
        } catch { }

        try {
            worker.onclose.forEach(func => {
                func({ reason: "ping timeout", code: 0 })
            })
        } catch { }
    }



    if (offlines.length > 0) {
        await wdb.updateMany(qoff,
            {
                $set: {
                    [WS]: "offline",
                    busy: false,
                },
            },
            { upsert: false })
    }
    if (onlines.length > 0) {
        await wdb.updateMany(qon,
            {
                $set: {
                    [WS]: "online",
                    busy: false,
                },
            },
            { upsert: false })
    }

    // console.log("Onlines:", onlines)
    global.workers = onlines;
}

export default async (connection: WSK.WebSocket, body) => {

    if (!(body.app && body.devid && body.wid)) {
        connection.send("QE|ERR0")
        await new Promise(r=> setTimeout(()=> r(null),1000));
        connection.close();
        console.log("WORKER force disconnedted because of error.");
        return;
    }

    body.devid = body.devid.toString()

    let owneruid = null;
    let owneremail = null;
    let ownerrole = null;

    if (!body.owneremail || !body.securekey) {
        connection.send("QE|ERR1")
        await new Promise(r=> setTimeout(()=> r(null),1000));
        connection.close();
        console.log("WORKER force disconnedted because of security concern (1).");
        return;
    }

    let owner = await global.db.collection("users").findOne({ securekey: body.securekey, email: body.owneremail });

    if (owner) {
        owneruid = owner.uid;
        owneremail = owner.email;
        ownerrole = owner.role;
    }
    else {
        connection.send("QE|ERR2")
        await new Promise(r=> setTimeout(()=> r(null),1000));
        connection.close();
        console.log("WORKER force disconnedted because of security concern (2).");
        return;
    }


    let worker = await global.db.collection("worker").findOne({
        devid: new global.ObjectId(body.devid),
        app: body.app,
        wid: body.wid,
    })

    if (worker && ((worker.owneremail != owneremail) || (worker.ownerrole != ownerrole))) {
        connection.send("QE|ERR3")
        connection.close();
        console.log("WORKER force disconnedted because of security concern (3).");
        console.log("Worker:", worker)
        return;
    }


    if (!worker) {
        worker = {
            ...body, devid: new global.ObjectId(body.devid), app: body.app, wid: body.wid, owneremail, ownerrole,
        }
        await global.db.collection("worker").insertOne(worker)
    }
    delete worker._id;


    let updateobj: any = {}
    if (body.image && worker.image != body.image) updateobj.image = body.image;
    if (body.owner && worker.owner != body.owner) updateobj.owner = body.owner;
    if (body.private && worker.private != body.private) updateobj.private = body.private;

    if (Object.keys(updateobj).length > 0)
        await global.db.collection("worker").updateOne({ devid: new global.ObjectId(body.devid), app: body.app, wid: body.wid },
            { $set: updateobj });

    console.log("WORKER connected:" + worker.app + " / " + worker.wid);

    let cbs = {};
    let watchdog = 0;
    let obj = {
        ws: connection,
        connection,
        ...worker,
        app: body.app,
        devid: body.devid,
        fastclose: body.fastclose,
        wid: body.wid,
        wslinks: [`wss://ws${process.env.CDN}.${process.env.MAINDOMAIN}`],
        lastseen: new Date().getTime(),
        busy: new Date().getTime(),
        local: true,
        fresh: true,
        ownerrole,
        owneremail,
        owneruid,
        online: true,
        onmessage: [],
        onclose: [],
        send: (data) => {
            let mid = new global.ObjectId().toString();
            return new Promise(res => {
                let msg = JSON.stringify({
                    mid,
                    ...data,
                })
                cbs[mid] = {
                    mid,
                    cb: (ob) => { res(ob) }
                }
                connection.send(msg)
            })
        }
    }

    let prevIdx = global.workers.findIndex(w=> w.app == obj.app && w.wid == obj.wid && w.devid == w.devid);
    if(prevIdx >= 0)
    {
        global.workers.splice(prevIdx, 1);
    }
    global.workers.push(obj);

    await UpdateWorkersStatus();

    let wd = setInterval(async () => {
        if (watchdog++ > 6) {
            console.log("WORKER is disconnecting due to ping timeout:" + worker.app + " / " + worker.wid);
            await UpdateWorkersStatus();
            clearInterval(wd);
            global.workers = global.workers.filter(w=> w!= obj)
        }
    }, 5000)

    connection.on('message', async function incoming(dt) {
        watchdog = 0;
        obj.lastseen = new Date().getTime()
        let data = dt.toString('utf8');

        if (data.includes("QE")
            && (data.includes("PING") || data.includes("PONG"))
            && data.includes("|")
        ) {
            connection.send("QE|PONG|QE");
            return;
        }

        try {
            let message = JSON.parse(data);
            if (message.awid && message.path && message.method) {
                var classx: any = null;
                let { awid, path, method, ...rest } = message
                if (process.env.NODE_ENV != "production") {
                    let result = await (await fetch(`http://127.0.0.1:${process.env.PORT}/api/AWI/api?path=${encodeURIComponent(message.path)}&method=${message.method}`
                        + `&app=${body.app}&devid=${body.devid}&wid=${body.wid}&email=${owneremail}`, {
                        method: "POST",
                        body: JSON.stringify(rest)
                    })).json()
                    result.awid = awid;
                    connection.send(JSON.stringify(result))
                }
                else {
                    if (!global.AWIRequires[message.path]) {
                        global.AWIRequires[message.path] = await require(`../../../components/AWI/${message.path}`)
                    }
                    classx = global.AWIRequires[message.path];

                    let result = await classx?.default?.[message.method]?.(rest, body.app, body.devid, body.wid, owneremail) || {}
                    result.awid = awid;
                    connection.send(JSON.stringify(result))
                }
            }
            else if (cbs[message.mid]) {
                cbs[message.mid].cb(message);
                delete cbs[message.mid]
            }
            else {
                obj.onmessage.forEach((func) => {
                    func(message);
                })
            }
        } catch (err) { console.log("Worker XError:", err) }
    });

    connection.on('error', err => { })
    connection.on('close', async (event) => {
        if (obj.fastclose) {
            obj.lastseen = new Date().getTime() - 600000
            await UpdateWorkersStatus();
        }
    })
}
