
import type WebSocket from "ws";
import { LivePrice } from "../../ASI/LivePrice";

export default async (connection: WebSocket, _channel) => {

    let onlyusers = false;
    let {email, securekey, ...channel} = _channel
    if(onlyusers)
    {
        if(!email || !securekey)
        {
            console.log("subscription no user ws connectiondenied.")
            connection.close();
            return;
        }

        let u = global.db.collection("users");
        let user = await u.findOne({email: email, securekey: securekey})
        if(!user)
        {
            console.log("subscription wrong user, ws connection denied.")
            connection.close();
            return;
        }
    }

    let key = global.MD5(JSON.stringify(channel))
    if (!global.ASI) {
        global.ASI = {};
    }
    if (!global.ASI[key]) {
        global.ASI[key] = []
    }
    global.ASI[key].push(connection);

    let watchdog = 0;
    
    let c = setInterval(() => {
        if (watchdog++ > 3) {
            // console.log("Subscrition to...")
            clearInterval(c);
            global.ASI[key].splice(global.ASI[key].indexOf(connection), 1)
            try { connection.close(); connection = null } catch { }
            return;
        }
        try{connection.send("QE|PING")} catch{}
    }, 5000)

    connection.on('message', async function incoming(data) {
        watchdog = 0;
        if (data.toString('utf8').trim() == "QE|PING") {
            return;
        }
        connection.close()
    });
    connection.on('error', err => { })
    connection.on('close', async (event) => {})
}
