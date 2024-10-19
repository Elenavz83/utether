

export default async (connection, body) => {


    connection.on('message', async function incoming(data) {
        console.log("message from client to echo:"+ data.toString('utf8'))
        connection.send("echo back!");
    });
    connection.on('error', err => {

    })
    connection.on('close', async (event) => {
        console.log("echo client closed!")
    })
}
