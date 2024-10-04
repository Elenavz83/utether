import dynamic from 'next/dynamic';
import User from '@/components/User';
import Router from 'next/router'

// import Lang from '@/components/Langs/fa'

export default (xprops) => {
  global.root = "/" + xprops.lang;
  let sprops = xprops.props || xprops;
  // global.lang = sprops.lang
  // global.lang = Lang


  let props = QSON.parse(sprops.data)
  global.user = User(props.session);
  global.nodeenv = props.session?.nodeenv
  global.lang = props.nlangs

  if (typeof props.session?.devmode != "undefined") global.devmode = props.session?.devmode

  if (typeof window != "undefined" && global.lang) {
    document.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.key === 'q') {
        event.preventDefault();
        Router.push(global.root + "/admin")
      }
    });

    let lng = localStorage.getItem("lang-" + xprops.lang);
    if (lng) {
      if (new Date().getTime() - Number(localStorage.getItem("lang-" + xprops.lang + "-exp")) > 900000) {
        (async () => {
          let resp = await (await fetch("/api/lang?lang=" + xprops.lang)).json()
          if (Object.keys(resp || {}).length > 1) {
            global.lang = resp;
            localStorage.setItem("lang-" + xprops.lang, JSON.stringify(global.lang))
            localStorage.setItem("lang-" + xprops.lang + "-exp", new Date().getTime().toString())
            reload()
          }
        })()
      }
    }
    if ((!lng) && global.lang) {
      setTimeout(() => {
        (async () => {
          let resp = await (await fetch("/api/lang?lang=" + xprops.lang)).json()
          if (Object.keys(resp || {}).length > 1) {
            global.lang = resp;
            localStorage.setItem("lang-" + xprops.lang, JSON.stringify(global.lang))
            localStorage.setItem("lang-" + xprops.lang + "-exp", new Date().getTime().toString())
            reload()
          }
        })()
      }, 2000);
    }
    else {
      global.lang = JSON.parse(lng)
    }

    document.getElementById("wind").style.fontFamily = global.lang.ff
  }
  else {
    // console.log("NOOOOO")
  }

  // console.log("LANGSSSSSSS:", global.lang)


  const Page = dynamic(() => import('@/components/Pages/' + xprops.filepath).then(x => x.default), { suspense: false, ssr: false })

  return <Page {...props} />
}


export async function getServerSideProps(context) {

  if (global.Startup != "OK") {
    if (global.Startup == "PENDING") {
      await new Promise(r => setInterval(() => { if (global.Startup != "PENDING") r(null); else console.log("WAITING...") }, 100))
    }
    else {
      global.Startup = "PENDING";
      await (await import("@/startup.ts")).Run()
      global.Startup = "OK";
    }
  }
  let path = context.query.path
  let filepath = null
  let sprops: any = null;


  if (path[0] == "favicon.ico") {
    return {
      notFound: true
    }
  }

  if (path[0].length != 2)//its not a language code
  {
    return {
      notFound: true
    }
  }

  else if (path.length == 2) {
    if (fs.existsSync(`./components/Pages/${path[1]}.tsx`)) {
      filepath = `${path[1]}.tsx`
    }
    else if (fs.existsSync(`./components/Pages/${path[1]}/index.tsx`))
      filepath = `${path[1]}/index.tsx`
  }
  else if (path.length == 3) {
    if (fs.existsSync(`./components/Pages/${path[1]}/${path[2]}.tsx`))
      filepath = `${path[1]}/${path[2]}.tsx`
    else if (fs.existsSync(`./components/Pages/${path[1]}/${path[2]}/index.tsx`))
      filepath = `${path[1]}/${path[2]}/index.tsx`
  }
  else if (path.length == 4) {
    if (fs.existsSync(`./components/Pages/${path[1]}/${path[2]}/${path[3]}.tsx`))
      filepath = `${path[1]}/${path[2]}/${path[3]}.tsx`
    else if (fs.existsSync(`./components/Pages/${path[1]}/${path[2]}/${path[3]}/index.tsx`))
      filepath = `${path[1]}/${path[2]}/${path[3]}/index.tsx`
  }
  else if (path.length == 5) {
    if (fs.existsSync(`./components/Pages/${path[1]}/${path[2]}/${path[3]}/${path[4]}.tsx`))
      filepath = `${path[1]}/${path[2]}/${path[3]}/${path[4]}.tsx`
    else if (fs.existsSync(`./components/Pages/${path[1]}/${path[2]}/${path[3]}/${path[4]}/index.tsx`))
      filepath = `${path[1]}/${path[2]}/${path[3]}/${path[4]}/index.tsx`
  }
  else if (path.length == 6) {
    if (fs.existsSync(`./components/Pages/${path[1]}/${path[2]}/${path[3]}/${path[4]}/${path[5]}.tsx`))
      filepath = `${path[1]}/${path[2]}/${path[3]}/${path[4]}/${path[5]}.tsx`
    else if (fs.existsSync(`./components/Pages/${path[1]}/${path[2]}/${path[3]}/${path[4]}/${path[5]}/index.tsx`))
      filepath = `${path[1]}/${path[2]}/${path[3]}/${path[4]}/${path[5]}/index.tsx`
  }


  console.log("PATH: ",filepath)
  sprops = (await import(`@/components/Pages/` + filepath)).getServerSideProps
  let lang = path[0]


  let obj = (await sprops(context))
  if (obj.props) {
    obj.props["lang"] = lang
    obj.props["filepath"] = filepath
  }

  return obj
}
