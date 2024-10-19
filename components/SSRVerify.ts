import { ObjectId } from 'mongodb'
import requestIp from 'request-ip'


export type SSRSession = {
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
  lang: string,
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
}

export default async (context): Promise<SSRSession> => {

  // context.res.setHeader('Cache-Control','public, s-maxage=20, stale-while-revalidate=20')

  let session = JSON.parse((context?.query?.session) || `{}`)
  let cookies = await import("cookies-next")

  if (session?.uid) {
    cookies.deleteCookie("session", { req: context.req, res: context.res })
    cookies.setCookie("session", JSON.stringify(session), { req: context.req, res: context.res })
  }
  else {
    if (cookies.hasCookie("session", { req: context.req, res: context.res })) {
      try {
        session = cookies.getCookie("session", { req: context.req, res: context.res })
        session = JSON.parse(decodeURIComponent(session))
      } catch { }
    }
  }

  let userip = (requestIp.getClientIp(context.req)?.replace("::ffff:", "")) || "::"
  var lang = context.resolvedUrl.substr(1, 3)
  lang = lang.replace(/\?/g, "");

  if (lang[2] == "/" || !lang[2]) {
    lang = lang.substr(0, 2);
  }
  else {
    lang = "fa"
  }

  // const session = await Session(context.req, context.res)

  if (session?.user?.uid) {
    session.user.uid = new global.ObjectId(session?.user?.uid);
  }


  let srv = {} as any
  let user = null;


  let devmod = ((typeof window != "undefined" ? window.location.hostname : process.env.DOMAIN).split(".").length > 2)


  return {
    uid: "userid",
    name: "armin",
    image: "https://irmapserver.ir/qepal/user.svg",
    imageprop:null,
    lang: "fa",
    cchar: "IR",
    unit: "toman",
    workspace: "test",
    servid: new ObjectId(),
    servsecret: "testservsecret",
    usedquota: 0,
    quota: 1000,
    quotaunit: "req",
    status: "approved",
    regdate: 0,
    expid: new ObjectId(),
    role: null,
    path: "",
    devmod: true,
    userip: "127.0.0.1",
  } as SSRSession
}
