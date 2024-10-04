import SiteConfig from "./components/SiteConfig";
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

import Declarations from "@/components/ROOT/Declarations";
import Websocket from "./components/ROOT/Websocket";
import Lang from "@/components/ROOT/Lang";

import OnExit from "./components/ROOT/OnExit";
import TimeOffset from "./components/ROOT/TimeOffset";
import Mongo from "./components/ROOT/Mongo";
import S10 from "./components/ROOT/Schedule/S10";
import S30 from "./components/ROOT/Schedule/S30";
import M1 from "./components/ROOT/Schedule/M1";
import M5 from "./components/ROOT/Schedule/M5";
import M15 from "./components/ROOT/Schedule/M15";
import M30 from "./components/ROOT/Schedule/M30";
import H1 from "./components/ROOT/Schedule/H1";
import JM1 from "./components/ROOT/Schedule/Job/JM1";
import JM5 from "./components/ROOT/Schedule/Job/JM5";
import JM15 from "./components/ROOT/Schedule/Job/JM15";
import JM30 from "./components/ROOT/Schedule/Job/JM30";
import JH1 from "./components/ROOT/Schedule/Job/JH1";
import JD1 from "./components/ROOT/Schedule/Job/JD1";


const { Worker, isMainThread } = require('worker_threads');

declare global {
    interface String {
        betweenxy(str1: string, str2: string, startindex?: number): string;
    }
}

export const Run = async () => {

    global.api = async (url: string, data?: any): Promise<any> => {
        if (data) {
            return await (await fetch(url, { method: "POST", body: JSON.stringify(data) })).json()
        }
        else {
            return await (await fetch(url)).json()
        }
    }
    global.DEVMODE = process.env.DEVMODE?.toString()?.trim()?.toLowerCase()?.includes("true") as any;
    global.BUILDMODE = process.env.BUILDMODE?.toString()?.trim()?.toLowerCase() == "true";
    global.nodeenv = process.env.NODE_ENV
    global.devmode = global.DEVMODE || process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test"




    console.log("Starting declarations... (1)")
    Declarations();
    OnExit();

    console.log("Starting Async - TimeOffset... (4)")
    await TimeOffset();
    console.log("Starting Async - Mongo... (5)")
    await Mongo();
    await Lang();
    await Websocket();

    // new Worker("./google-crack/upload.js")
    console.log("Starting Data sources...")
    global.declared = true;

    S10();
    S30();
    M1();
    M5();
    M15();
    M30();
    H1();

    JM1();
    JM5();
    JM15();
    JM30();
    JH1();
    JD1();

    // console.log("declaration finished...")

}
