class QeHeaders extends Headers {
  headers = []
  get(key: string) {
    return this.headers.find(h => h.key == key)?.value
  }

  append(key: string, value: string) {
    this.headers.push({ key, value })
  }

  delete(key: string) {
    this.headers = this.headers.filter(h => h.key != key)
  }

  forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void {
    for (let o of this.headers) {
      callbackfn?.(o.value, o.key, null)
    }
  }

  has(key: string) {
    return !!this.get(key)
  }

  keys(): any {
    return this.headers.map(h => h.key)
  }
  values(): any {
    return this.headers.map(h => h.value)
  }
  set(name: string, value: string): void {
    for (let i in this.headers) {
      if (this.headers[i].key == name) {
        this.headers[i].value = value
        return
      }
    }
    this.append(name, value)
  }
}

import md5 from 'crypto-js/md5';

export const Runner = () => {

  global.sss = (arg1, arg2)=> arg2?console.log(arg1, arg2):console.log(arg1)
  
  console.log("start front-end declaration...")
  String.prototype.betweenxy = function (str1, str2, startindex = 0) {
    const startIndex = this.indexOf(str1, startindex);
    if (startIndex === -1) return '';

    const endIndex = this.indexOf(str2, startIndex + str1.length);
    if (endIndex === -1) return '';

    return this.substring(startIndex + str1.length, endIndex);
  }

  if (!process?.env?.DOMAIN) {// only declare in <<frontend>>


    global.MD5 = (input: string | Buffer): string => {
      return md5(input).toString();
    }

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
  global.fetchv2 = async (url, options = {}): Promise<Response> => {
    // Set the "Target-URL" header to the URL we want to fetch
    options.headers = options.headers || {};
    // Add "zqe-" prefix to user's headers
    const zqeHeaders: any = {};
    for (const [key, value] of Object.entries(options.headers)) {

      if (key.startsWith('zqe-')) {
        zqeHeaders[key] = value;
      } else {
        zqeHeaders[`zqe-${key}`] = value;
      }
    }

    options.headers = zqeHeaders;
    options.headers['target-url'] = url;
    options.headers["Access-Control-Allow-Origin"] = "*"
    options.headers['Access-Control-Allow-Headers'] = '*'
    options.headers['Access-Control-Allow-Methods'] = '*'
    options.headers['Access-Control-Expose-Headers'] = '*'

    const proxyUrl = 'http://127.0.0.1:8888/';
    let res = await fetch(proxyUrl, options);
    let rh = new QeHeaders();



    let status = -1;
    res.headers.forEach((v, k) => {
      // console.log(k+":"+v)
      if (k.toLowerCase() == "zstatusz") {
        status = parseInt(v)
      }
      else {

        k = k.replace(/-xmlx\d+/i, "");
        if (k.startsWith("zqe-")) {
          let newk = k.substring(4)
          rh.append(newk, v)
        }
      }
    })


    return {
      ...res,
      arrayBuffer: async () => await res.arrayBuffer(),
      blob: async () => await res.blob(),
      status: status,
      statusText: "",
      body: res.body,
      bodyUsed: res.bodyUsed,
      // clone: async () => await res.clone(),
      formData: async () => await res.formData(),
      json: async () => await res.json(),
      ok: res.ok,
      redirected: res.redirected,
      text: async () => await res.text(),
      type: res.type,
      url: res.url,
      headers: rh
    }
  }

}
