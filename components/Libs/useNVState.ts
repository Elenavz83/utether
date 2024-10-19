import { useState, useEffect } from "react";
import Router from 'next/router'

export default (obj, name = "") => {
    var [o, setO] = useState(obj)
    
    useEffect(() => {
      if (typeof window != "undefined") {
        let item = window.localStorage.getItem(Router.pathname + "_" + name)
        if (typeof item == "string") {
          item = JSON.parse(item)
          
          if(item != null && typeof item != undefined)
          {
            if(!o || typeof o != "object" || Array.isArray(o))
            {
              setO(item);
            }
            else
            {
              let keys = Object.keys(o)
              let reload = false;
              for(let k of keys)
              {
                if((o[k] == null) && (item[k] != null))
                {
                  reload = true
                  o[k] = item[k]
                }
              }
              if(reload)
              {
                setO({...o});
              }
            }
          }
        }
      }
    })
    const setFunc = (ob) => {
      if (typeof window != "undefined") {
        window.localStorage.setItem(Router.pathname + "_" + name, JSON.stringify(ob))
        setO(ob);
      }
    }
    return [o, setFunc]
  }