import { ObjectId } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"

import requestIp from 'request-ip'

export type APISession = {
  uid: string,
  name: string,
  image: string,
  imageprop: {
    zoom: number,
    x: number,
    y: number,
    portion: number,
    refw: number
  },
  cchar: string,
  unit: string,
  workspace: string,
  servid: ObjectId,
  servsecret: string,
  usedquota: number,
  quota: number,
  quotaunit: string,
  status: "approved" | "rejected" | "waiting",
  regdate: number,
  expid: ObjectId,
  role: string | null,
  path: string,
  devmod: boolean,
  userip: string,
  body: any
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<APISession> => {

  if (global.Startup != "OK") {
    if (global.Startup == "PENDING") {
      await new Promise(r => setInterval(() => { if (global.Startup != "PENDING") r(null); else console.log("WAITING...") }, 100))
    }
    else {
      global.Startup = "PENDING";
      await (await import("../startup.ts")).Run()
      global.Startup = "OK";
    }
  }

  const userip = (requestIp.getClientIp(req)?.replace("::ffff:", "")) || "::"
  var post = req.method?.toLowerCase() == "post"

  if (post && !(req.body.startsWith("{") || req.body.startsWith("["))) {
    return ({ userip }) as APISession
  }
  var body = post ? JSON.parse(req.body) : null;

  if (post) {
    if (body?.expid) {
      body.expid = new global.ObjectId(body.expid)
    }
    if (body?.servid) {
      body.servid = new global.ObjectId(body.servid)
    }
    if (body?.chatid) {
      body.chatid = new global.ObjectId(body.chatid)
    }
    if (body?.msgid) {
      body.msgid = new global.ObjectId(body.msgid)
    }
    if (body?.transid) {
      body.transid = new global.ObjectId(body.transid)
    }
    if (body?.uid) {
      body.uid = new global.ObjectId(body.uid)
    }
  }

  if ((body?.passcode || body?.PASSCODE) && (body?.passcode || body?.PASSCODE) == process.env.PASSCODE) {
    return {
      name: "Service Bot",
      role: "admin",
      userip: "0.0.0.0",
      uid: new global.ObjectId("635111afff61db2b04928f45"),
      body,
    } as APISession
  }


  let session = JSON.parse(`{}`)
  let cookies = await import("cookies-next")

  if (cookies.hasCookie("session", { req, res })) {
    try {
      session = cookies.getCookie("session", { req, res })
      session = JSON.parse(decodeURIComponent(session))
    } catch { }
  }


  let srv = {} as any
  let user = null;
  if (session.servid) {
    srv = await api("http://localhost:3000/api/userv/servid", {
      servid: session.servid,
      servsecret: session.servsecret,
    })


    let u = global.db.collection("users")
    let users = await u.find({}).project({ _id: 0 }).toArray()

    for (let usr of users) {
      if (MD5(usr.usersecret) == srv.usersecrethash) {
        user = usr
      }
    }
  }

  if (session.servid) {
    session.servid = new ObjectId(session.servid)
  }
  if (session.expid) {
    session.expid = new ObjectId(session.expid)
  }

  console.log(session)


  return {

    ...session,
    ...srv,
    body,
    role: user?.role || null,
    nodeenv: global.nodeenv,
    userip
  } as APISession
}