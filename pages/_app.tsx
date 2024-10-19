import SiteConfig from "@/components/SiteConfig";
global.cdn = (url: string) => {
  if (url.startsWith("/files")) {
    return SiteConfig.sitefiles + url.replace(/\/files\//g, "/")
  }
  else {
    return url
  }
}

global.api = async (url: string, data?: any): Promise<any> => {
  if (data) {
    return await (await fetch(url, { method: "POST", body: JSON.stringify(data) })).json()
  }
  else {
    return await (await fetch(url)).json()
  }
}

// import'./styles.css"
import '../styles/globals.css'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Prompt = dynamic(() => import("../components/Parent/Prompt.tsx").then(x => x.default), { suspense: false, ssr: false })
const QELoader = dynamic(() => import("../components/Parent/QELoader.tsx").then(x => x.default), { suspense: false, ssr: false })


import QSON from '../components/Parent/QSON'
import Scroller from '../components/Parent/Scroller'
import Router from "next/router";

QSON();
Scroller();



export default function App({ Component, pageProps }) {

  let sessionreloader: any = {};

  global.styles = styles

  global.cdn = (url: string) => {
    if (url.startsWith("/files")) {
      return SiteConfig.sitefiles + url.replace(/\/files\//g, "/")
    }
    else {
      return url
    }
  }

  global.api = async (url: string, data?: any): Promise<any> => {
    if (data) {
      return await (await fetch(url, { method: "POST", body: JSON.stringify(data) })).json()
    }
    else {
      return await (await fetch(url)).json()
    }
  }

  global.pageProps = pageProps;
  global.reloadsession = () => {
    console.log("reloading session...")
    global.winscrollers = {}
    global.onunloader?.()
    sessionreloader?.run?.();
  }

  global.reload = () => {
    global.noloading = true;
    Router.push(window.location.href);
    global.reloadsession();
    console.log("RELOADING...")
  }

  if (!(process?.env?.NODE_ENV) && typeof global.ObjectId == "undefined") {
    global.ObjectId = class {
      toString() {
        let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return (
          timestamp +
          'xxxxxxxxxxxxxxxx'
            .replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16))
        );
      }
    }
  }


  useEffect(() => {
    if (typeof global.ObjectId == "undefined") {
      global.ObjectId = class {
        toString() {
          let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
          return (
            timestamp +
            'xxxxxxxxxxxxxxxx'
              .replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16))
          );
        }
      }
    }

    if (!global.Declared) {
      global.Declared = true;
      import('../components/Parent/Progress.ts').then(x => x.Runner())
      import('../components/Parent/Declarations.ts').then(x => x.Runner())
    }
    if (!global.parentdiv) {
      global.parentdiv = document.getElementById("wind")
    }
    global.parentdiv.onscroll = (e) => {
      let target: any = e.currentTarget;
      Object.values<any>(global.winscrollers).forEach(f => f?.(target.scrollHeight, target.scrollTop))


      if (!global.gototop && target.scrollTop > 1000) {
        global.gototop = true;
        if (document?.getElementById && document.getElementById("gototop"))
          document.getElementById("gototop").style.display = "block"
      }
      else if (global.gototop && target.scrollTop < 200) {
        global.gototop = false;
        if (document?.getElementById && document.getElementById("gototop"))
          document.getElementById("gototop").style.display = "none"
      }
    }
    if (typeof window != "undefined" && global.lang) {
      document.getElementById("wind").style.fontFamily = "vr"
    }
  })


  global.sss = (arg1, arg2) => arg2 ? console.log(arg1, arg2) : console.log(arg1)

  global.Round = (number, digits) => {
    if (digits >= 0) {
      return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
    }

    var factor = Math.pow(10, -digits);
    var rounded = Math.round(number / factor) * factor;

    if (digits == -1) {
      return Math.floor(rounded);
    } else {
      return Math.floor(rounded / 10) * 10;
    }
  }

  return (
    <div id="wind" style={{ overflowY: "auto", height: "100vh", direction:global.lang?.dir || "rtl", fontFamily:"vr" }} >
      <Prompt />
      <Component {...pageProps} />
      <QELoader />
    </div>

  )
}

