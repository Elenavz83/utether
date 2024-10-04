// This is an example of how to access a session from an API route
import type { NextApiRequest, NextApiResponse } from "next"
import APIVerify from "@/components/APIVerify";


export default async (req: NextApiRequest, res: NextApiResponse) => {

  var { userip, role, body, } = await APIVerify(req, res);

  let cols = await global.db.collections()
  cols[0].collectionName
  res.send({ code: 0, cdn: process.env.CDN, pong:true})
}
