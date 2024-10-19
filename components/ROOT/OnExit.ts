
const makeoffline = async (colname = "worker") => {
    await global.db.collection(colname).updateMany({},
        [
            {
                $set: { ["WS" + process.env.CDN]: "offline" }
            }
        ],
        {
            upsert: false
        }
    )
}
export default async () => {
    process.on('SIGINT', async function () {
        if (parseInt(process.env.CDN) > 0) {
            // await makeoffline("worker")
        }
        process.exit(0) // if you don't close yourself this will run forever
    });
}
