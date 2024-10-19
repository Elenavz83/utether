// This is an example of how to access a session from an API route
import APIVerify from "@/components/APIVerify";
import type { NextApiRequest, NextApiResponse } from "next"



export default async (req: NextApiRequest, res: NextApiResponse) => {

  var { valid, post, userip, email, role, verify, body, } = await APIVerify(req, res);
  res.send(global.langs[req.query.lang.toString() || "fa"])
}
