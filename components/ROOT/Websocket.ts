// const WebSock = require("ws").Server;
import * as WebSosket from 'ws'
import url from 'url'
import { IncomingMessage } from 'http';

export default async () => {

    console.log("Starting ws server at port: "+  process.env.WSPORT)

    let socket = new WebSosket.WebSocketServer({port: process.env.WSPORT });
    socket.on('connection', async (connection:WebSosket, req:IncomingMessage) => {

        connection.on
        let newurl =  req.url.split("/wss").join("")
        const parsedUrl = url.parse(newurl, true);
        let path =  parsedUrl.pathname+".ts";
        
        // console.log("NEW WS CONNECTION:", path)

        if (process.env.NODE_ENV == "development") {
            delete require.cache[require.resolve('./Websocket' + path)];
        }
        let api = (await require('./Websocket' + path)).default
        if (api) {
            api(connection, parsedUrl.query)
        }
        else {
            // console.log("ws wrong api..closing...")
            connection.close();
        }
    });
    // socket.on('error',e=> console.log(e))
    // socket.on('close',e=> console.log("webco"))
    console.log("websocket started on port:"+process.env.WSPORT )
}