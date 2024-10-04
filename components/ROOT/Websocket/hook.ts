
export default async (connection, body) => {

    if (!body.devid || !body.app || !body.wid) {
        connection.close();
        console.log("Hooker error:", body)
        return;
    }

    let localworker = global.workers?.find?.(w => w.devid == body.devid && w.app == body.app && w.wid == body.wid);

    if (!localworker) {
        connection.close();
        console.log("Hooker error:", "No local worker found.")
        return;
    }

    console.log("Local hook connected: " + body.wid);
    let onmsg = (msg) => {
        connection.send(JSON.stringify(msg));
    }
    let watchdog = 0;
    localworker.onclose.push(() => {
        connection.close(1000, "worker hooker.js (error: the worker is disconnected from this server...");
    })
    localworker.onmessage.push(onmsg)
    connection.on('message', async function incoming(data) {
        watchdog = 0;

        if (data.includes("QE")
            && (data.includes("PING") || data.includes("PONG"))
            && data.includes("|")
        ) {
            connection.send("QE|PONG|QE");
            return;
        }

        if (localworker) {
            localworker.connection.send(data);
        }
        else {
            connection.close(1000, "hooker.js (error: the worker is disconnected from this server...");
        }
    });

    let wd = setInterval(() => {
        if (watchdog++ > 6) {
            clearInterval(wd)
            try { connection.close?.() } catch { }
            if (localworker) {
                localworker.onmessage = localworker.onmessage.filter(f => f != onmsg); //removing listener
            }
        }
    }, 5000)
    connection.on('error', err => { })
    connection.on('close', async () => { })
}

