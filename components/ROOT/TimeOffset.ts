
export default async () => {
  global.timeoffset = 0;
  // try {
  //   var cryptotimesync = await fetch("https://bitquery.io/wp-content/uploads/2020/09/bitquery_logo_w.png")
  //   global.timeoffset = new Date(cryptotimesync.headers.get("date")).getTime() - new Date().getTime();
  // }
  // catch { }

  // console.log("Crypto time offset is:" + global.timeoffset + " ms");
}
