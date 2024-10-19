
import mongodblib from '@/lib/mongodb'
import { UpdateWorkersStatus } from './Websocket/worker'

const makeoffline = async (colname = "worker") => {
    await global.db.collection(colname).updateMany({},
        [
            {
                $set: {["WS"+ process.env.CDN]:"offline" }
            }
        ],
        {
            upsert: false
        }
    )
}

export default async () => {
    if (!global.mongo) {
        global.mongo = await mongodblib
        global.db = global.mongo.db(process.env.MONGODB_DB)

        let test = global.db.collection("zlang-fa").findOne({});
        if (test) {
            console.log("Connection with Mongo DB was SUCCESSFULL...")
        }
        else {
            console.log("Connection with Mongo DB was PROBLEMATIC...")
        }
    }

    if (!global.ObjectId) {
        let mongo = await (await import("mongodb")).ObjectId
        global.ObjectId = mongo
    }
    if (!global.Long) {
        global.Long = await (await import("mongodb")).Long
    }

    global.db.collection("logs").createIndex({ date: 1 });

    Object.defineProperty(Array.prototype, 'includesid', {
        value: function (objid) {
            return !!this.find(obj => obj.equals(objid))
        }
    });

    if(parseInt(process.env.CDN) > 0)
    {
        await makeoffline("worker")
    }
    
    if(process.env.CDN == "1")
    {
        setInterval(async ()=>{
            await UpdateWorkersStatus()
        }, 30000)
    }

    // db.collection('device').createIndex({ "lastseen": 1 }, { expireAfterSeconds: 3600 });
    global.db.collection('device').createIndex({ "uid": 1 });
}
