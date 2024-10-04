import Router from "next/router"
export default (name:string, func:()=>void, ms:number)=>
{
    if(!global.intervalobjs)
    {
        global.intervalobjs = [];
    }
    var intervaluniqueid = name
    for(let interval of global.intervalobjs)
    {
      if(interval.page != Router.asPath || interval.uniqueid == intervaluniqueid)
      {
        clearInterval(interval.id)
        interval.expired = true;
      }
    }
    global.intervalobjs = global.intervalobjs.filter(x=>!x.expired);
    var free = true;
    global.intervalobjs.push(
    {
        page:Router.asPath,
        uniqueid: intervaluniqueid,
        expired:false,
        id: setInterval(() => 
        {
          if(!free)
          {
            return;
          }
          free = false;
          func();
          free = true;
        }, ms),
    })
}


