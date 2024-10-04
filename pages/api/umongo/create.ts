// This is an example of how to access a session from an API route
import APIVerify from "@/components/APIVerify";
import SerialGenerator from "@/components/Libs/SerialGenerator";
import { Collection, MongoDBCollectionNamespace } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next"



export default async (req: NextApiRequest, res: NextApiResponse) => {

  // await global.mongo.db("tester").collection("yes").insertOne({ok:true})
  var session = await APIVerify(req, res);
  let { userip, role, body, status, servid } = session


  console.log("BODY IS:", body)
  if (status != "approved") {
    res.send({ code: -1 })
    return
  }


  try {
    // Connect to the MongoDB server
    await mongo.connect();

    let dbt = mongo.db(body.dbname)
    if ((await dbt.collections()).length > 0) {
      res.send({ code: -2 })
    }

    const adminDb = mongo.db("admin");
    // Create a new user
    const username = body.dbname;
    const password = SerialGenerator(50);
    const roles = [{ role: 'dbAdmin', db: body.dbname }, { role: 'readWrite', db: body.dbname }]

    const result = await adminDb.command({
      createUser: username,
      pwd: password,
      roles: roles
    });

    let mongourl = `mongodb://${username}:${password}@87.107.104.86:27018/?authSource=admin`
    global.db.collection("dbs").insertOne({
      servid,
      dbname: username,
      url: mongourl
    })
    await ImportNecessaries(username)
    res.send({ code: 0, url: mongourl })
  } catch (err) {
    console.error('An error occurred while creating the user:', err);
    res.send({ code: -3 })
  }
}

const ImportNecessaries = async (dbname:string) => {

  let codes = ["ar", "es", "de", "fa", "fr", "tr", "ru", "id", "ur", "en", "ko", "ja", "pt", "zh",]
  let obj = ["code", "languagename", "region", "dir", "ff", "ffb", "textw", "txtmt",
    "loading", "choose", "delconf", "delete", "region", "rank", "selectwallet", "balance",
    "stop", "confirm", "amount", "example", "profilepic", "uploadnewpic", "upload",
    "sort", "category", "addopts", "catfilter", "howtosort", "copied", "xxcharsleft",
    "done", "uploadwaiterr", "uploadmaxerr", "selectfiles", "more", "selectcurrency",
    "transpileerr", "savedsuccess", "yourwallets", ""
  ]

  var MongoClient = require(dbname).MongoClient
  var client = new MongoClient("mongodb://root:uAKETRyEaNChAYbOxclETYPU@87.107.104.86:27017/?authSource=admin")
  let mongo = await client.connect()
  let db = mongo.db("qepal")

  let langs = {}
  for (let code of codes) {
    langs[code] = await db.collection(`zlang-${code}`).find({}).toArray()
  }

  var uclient = new MongoClient("mongodb://root:uAKETRyEaNChAYbOxclETYPU@87.107.104.86:27018/?authSource=admin")
  let umongo = await uclient.connect()
  let udb = umongo.db(dbname)

  for (let code of codes) {
    for (let k of obj) {
      let c = udb.collection(`zlang-${code}`)
      await c.deleteMany({ [k]: { $exists: true } });
      let val = langs[code].find(el => !!el[k])?.[k]
      if (!val && k == "ffb") {
        val = langs[code].find(el => !!el["ff"])?.["ff"]
      }
      if (val) {
        let res = await c.insertOne({ [k]: val })
      }
    }
  }

  let uc = udb.collection("users") as Collection

  let count = await uc.countDocuments({})
  if(count == 0)
  {
    await uc.insertOne({usersecret:"", role:""})
  }
}
