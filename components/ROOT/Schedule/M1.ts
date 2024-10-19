export default async () => {
    setInterval(async () => {
        if(global.db)
        {
            let expids = Object.keys(global.expsviews||{})
            let e = global.db.collection("explore");
            for(let expid of expids)
            {
                if(global.expsviews[expid] > 0 && process.env.CDN != "0")
                {
                    await e.updateOne({expid: new global.ObjectId(expid)}, {$inc:{views:global.expsviews[expid]}});
                    global.expsviews[expid] = 0;
                }
            }




            let jids = Object.keys(global.jidsviews||{})
            let j = global.db.collection("journals");
            for(let jid of jids)
            {
                if(global.jidsviews[jid] > 0  && process.env.CDN != "0")
                {
                    await j.updateOne({jid: new global.ObjectId(jid)}, {$inc:{views:global.jidsviews[jid]}})
                    global.jidsviews[jid] = 0;
                }
            }
        }
        
    }, 60000)
}
