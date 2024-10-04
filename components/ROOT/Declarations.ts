import SSRVerify from '../SSRVerify'
import SerialGenerator from '../Libs/SerialGenerator'
import schedule from 'node-schedule'
import fs from 'fs'
import path from 'path';
import ws from 'ws'

const crypto = require('crypto');
export default () => {

    global.ACI = {};
    global.ACIRequires = {};
    global.AWIRequires = {};
    global.ASI = {};
    global.SWebsocket = ws
    // dns.ALL
    // console.log("ENVIIIIIIIII:", process.env.NODE_ENV)

    global.sss = (arg1, arg2)=> arg2?console.log(arg1, arg2):console.log(arg1)


    global.fetchv2 = async (input, init) => {
        return await fetch(input, {...init, redirect:'manual'})
    }

    String.prototype.betweenxy = function (str1, str2, startindex = 0) {
        const startIndex = this.indexOf(str1, startindex);
        if (startIndex === -1) return '';

        const endIndex = this.indexOf(str2, startIndex + str1.length);
        if (endIndex === -1) return '';

        return this.substring(startIndex + str1.length, endIndex);
    }


    global.MD5 = (data:string|Buffer)=>{
        const hash = crypto.createHash('md5');
        hash.update(data);
        const hashResult = hash.digest('hex');
        return hashResult;
    }

    global.Schedule = function (hour, minute, second, cb): any {
        const rule = new schedule.RecurrenceRule();
        if (hour) {
            rule.hour = hour;
        }
        if (minute) {
            rule.minute = 0;
        }
        if (second) {
            rule.second = 0;
        }
        return schedule.scheduleJob(rule, async function () {
            cb();
        })
    }

    global.QSON = {
        stringify: (obj) => JSON.stringify(obj),
        parse: (str) => JSON.parse(str)
    }


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



    var crypto = require("crypto");
    global.SSRVerify = SSRVerify;//require('../SSRVerify')
    global.visitors = {}
    global.wrongserialrequests = {}
    global.logcache = []
    global.sessionemailuidmap = {};
    global.expmsgcol = {};
    global.timeoffset = 0;
    if (!global.serialGenerator) {
        global.serialGenerator = SerialGenerator
    }
    global.captchas = {};
    if (!global.fs) {
        global.fs = require('fs')
    }
    if (!global.lastemailtype) {
        global.lastemailtype = {}
    }
    if (!global.crypto) {
        global.crypto = crypto
    }
    if (!global.gethash) {
        global.gethash1 = hash => crypto.createHash('md5').update(hash).digest("hex").substr(0, 10)
    }

    if (!global.md5) {
        global.md5 = hash => crypto.createHash('md5').update(hash).digest("hex")
    }


    global.devices = {}

    if (!global.workers) {
        global.workers = []
    }

    global.temp = {}

    global.agent = {};

    global.Datasources = {} as any;

}