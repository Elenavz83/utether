// This is an example of how to access a session from an API route
import type { NextApiRequest, NextApiResponse } from "next"
import APIVerify from '../../components/APIVerify'
import SMS from '../../components/Tools/SMS'
import Avanak from '../../components/Tools/Avanak'
import PayConfig from '../../components/PayConfig'
import Lorem from '../../components/Libs/Lorem'
import Translate from '../../components/Tools/Translate'

const crypto = require('crypto')
const fs = require("fs")
import EN from '../../components/Langs/en'


let count = 0;

const objtranslate = async (myObject, exceptionList, from = 'fa', to = 'en') => {

  function isKeyInExceptionList(parentKey, key) {
    let parentKeys = parentKey ? parentKey.split(".") : [];
    let obj = parentKey ? getObjectByKeyPath(myObject, parentKeys) : myObject;
    return exceptionList.includes(parentKey + "." + key) || exceptionList.includes(parentKey) || 
    exceptionList.includes(parentKey + ".*") || exceptionList.includes(parentKey + ".*." + key) ||
     exceptionList.includes(parentKey + "." + key + ".*");
  }

  function getObjectByKeyPath(obj, keys) {
    for (let i = 0; i < keys.length; i++) {
      obj = obj[keys[i]];
    }
    return obj;
  }

  async function changeLastChildToString(obj, parentKey) {
    if (typeof obj === "string") { // If the object is a string, change its value to "NEWSTRING" if it's not in the exception list
      if (!isKeyInExceptionList(parentKey, "")) {
        console.log(count++)
        return await Translate(obj, from, to);
      } else {
        return obj;
      }
    } else if (Array.isArray(obj)) { // If the object is an array, iterate through its elements
      for (let i = 0; i < obj.length; i++) {
        obj[i] = await changeLastChildToString(obj[i], parentKey ? parentKey + "." + i : i.toString()); // Recursively call the function on each element
      }
      return obj;
    } else if (typeof obj === "object") { // If the object is an object, iterate through its keys
      for (let key in obj) {
        obj[key] = await changeLastChildToString(obj[key], parentKey ? parentKey + "." + key : key); // Recursively call the function on each child
      }
      return obj;
    } else { // If the object is not a string, array, or object, return it as is
      return obj;
    }
  }

  await changeLastChildToString(myObject, "")
}







export default async (req: NextApiRequest, res: NextApiResponse) => {
  var { valid, post, userip, email, uid, role, verify, body, } = await APIVerify(req, res);
  if (!role) {
    res.send({ code: -1 })
  }


  let qelangs = global.langlist.map(x => x.code);

  // console.log(qelangs)

  // let FARSI = {...EN};
  // let exception = [
  //   "code",
  //   "code",
  //   "languagename",
  //   "region",
  //   "dir",
  //   "ff",
  //   "ffb",
  //   "journalminlen",
  //   "journalexclen",
  //   "journalmaxlen",
  //   "expmanlen",
  //   "expmaxfreelen",
  //   "textw",
  //   "txtmt",
  //   "guaranteemode.0",
  //   "wallets.usdc",
  //   "methods.usdttrc20",
  //   "methods.usdtbep20",
  //   "methods.usdctrc20",
  //   "methods.usdcbep20",
  //   "methods.tron",
  //   "methods.irshebawithdraw",
  //   "methods.ircardtocard",
  //   "units.tron",
  //   "units.usdc",
  //   "units.usdt",
  //   "unitsfullname.usdc",
  //   "unitsfullname.tron",
  //   "unitsfullname.usdt",
  // ]


  // await objtranslate(FARSI,exception,"en","fa")

  // console.log("FINSISHED!")
  // fs.writeFileSync("EN.json", JSON.stringify(FARSI,null, 4))

  // let page = await global.newPage?.()
  // await page.goto("https://chat.openai.com")
  

  


  res.send({ code: 0 })
}
