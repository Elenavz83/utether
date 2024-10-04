// This is an example of how to access a session from an API route
import APIVerify from "@/components/APIVerify";
import SerialGenerator from "@/components/Libs/SerialGenerator";
import type { NextApiRequest, NextApiResponse } from "next"



export default async (req: NextApiRequest, res: NextApiResponse) => {

    var { valid, post, userip, email, role, verify, body, } = await APIVerify(req, res);

    console.log(body)
    let a = global.db.collection("users")
    let s = global.db.collection("sessions")
    let user = await a.findOne({ username: body.username, password: body.password })
    if (user) {
        let token = SerialGenerator(30)
        let r = await s.insertOne({ sessionToken: token, userId: user._id, expires: new Date(new Date().getTime() + 5 * 86400000) })
        console.log(r)
        res.setHeader("Set-Cookie", `session-token=${token}; Path=/; SameSite=Strict`).send({ code: 0 })
    }
    else
    {
        res.send({code:-1})
    }

}
