import Router from "next/router"
export default (callback)=>
{
  if(typeof window != "undefined")
  {
    if(!global.currentpage)
    {
        global.currentpage = Router.asPath
        callback();
    }
    else
    {
      if(global.currentpage != Router.asPath)
      {
        global.currentpage = Router.asPath
        callback();
      }
    }
  }
}


