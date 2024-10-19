import type { Db } from "mongodb";
// import type { Cache } from 'inmemfilecache';
// import type WebSocket from "ws";
import { WebSocket as WSSK } from "ws";
// import type {ObjectId} from 'mongodb'
import type { User } from "./components/User";

import { AllSymElement, GoodSymElement } from "./components/Worker/Libs/IRBourse";
import { DSKey, DSource } from "./components/ACI/Datasource";
import { Session } from "./components/SSRVerify";


declare type ScheduleJob = any;

declare type never = any

declare global {

    declare namespace JSX {
        type Elm = React.HTMLAttributes<HTMLElement> & { class?: string };
        interface IntrinsicElements {
            [elemName: string]: React.DetailedHTMLProps<Elm, HTMLElement>,
        }
    }

    function SSRVerify(context:any):Promise<Session>
    var SWebsocket: typeof import('ws');

    var ACI: { [key in string]: any } = {};
    var ASI: { [s: string]: Array<SWebsocket> }
    var workers: Array<any> = [];
    var ACIRequires: { [key in string]: any } = {};
    var AWIRequires: { [key in string]: any } = {};
    function Round(number, digits): number

    type Elm = React.HTMLAttributes<HTMLElement> & { class?: string };

    interface IntrinsicElements {
        [elemName: string]: React.DetailedHTMLProps<Elm, HTMLElement>,
    }

    var setScroller: (id: string) => void;
    var Datasources: { [key in DSKey]: DSource }
    var db: import("mongodb").Db;
    var mongo: import("mongodb").MongoClient;
    var styles: any;
    var cache: Cache;
    var main: Function;
    var nodeenv: string;
    var devmode: boolean;
    function log(obj: { text: string, type?: "ok" | "error" | "warning", date?: Date }): void;
    function sss(arg1: any, arg2?: any): void;
    function reloadsession(): void;
    function reload(): void;
    function closejournal(): void;
    function journals(arg: { items?: any[], jids?: string[] }): void;
    namespace QSON {
        export function parse(input: string): any;
        export function stringify(input: Object): String;
    }
    interface String {
        betweenxy(str1: string, str2: string, startindex?: number): string;
    }


    var fs: typeof import('fs');


    var P: PConfig
    var user: User
    var lang: any
    var langs: { [key in string]: any }
    var componentids: any
    var Android: any
    interface Window {
        FromAndroid: (obj: any) => void;
        countries: any
        attachEvent: any
    }
    interface EventTarget {
        scrollIntoView: (options: ScrollIntoViewOptions | boolean) => void
        select: () => void
        value: any
    }
    var ObjectId: any
    function closelog(): void;
    function cdn(url: string): string;
    function api(url:string, data?:any):Promise<any>;
    var device: {
        send: (obj: any, expirems: number, deviceobj?: any) => void,
        ws: any,
        software: string,
        wsopen: boolean,
        wsport: number,
        version: number,
        platform: string,
    }
    function onunloader(): void;

    var fs: typeof import('fs');

    function success(text: string, fast: boolean = false): void
    function error(text: string): void
    function alerter(title: string, text?: string | Element, style?: any): Promise<void>;
    function prompter(title: string, text?: string, maxlen?: number, small?: boolean, defaulttext?: string, style?: any,
        selectonclick: boolean = true,
        type: ("text" | "number" | "url" | "email" | "tel") = "text"): Promise<string>
    function confirmer(title: string, text?: string | element, oktext?: string, canceltext?: string): Promise<boolean>
    var confirm: any
    var DEVMODE: boolean = false;
    var winscrollers: { []: () => void }
    function fetchv2(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    var parentdiv: HTMLElement
    function MD5(input: string | Buffer): string

    interface String {
        betweenxy(str1: string, str2: string, startindex?: number): string
    }
    interface Array {
        includesid(object: any)
    }
    function Schedule(hour: number, minute: number, second: number, cb: () => ScheduleJob)
}

