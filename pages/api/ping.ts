// This is an example of how to access a session from an API route
import type { NextApiRequest, NextApiResponse } from "next"



export default async (req: NextApiRequest, res: NextApiResponse) => {

  res.send({ code: 0, cdn: process.env.CDN, pong:true})
}
