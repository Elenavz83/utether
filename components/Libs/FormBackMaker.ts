import Router from 'next/router'
export default 
{
    MakeBackableForm:(name)=>
    {
        if(!global.currennturl)
        {
          global.onback = {}
          global.currennturl= window.location.href;

          setInterval(()=>
          {
           if(global.currennturl.includes("#") && (window.location.href != global.currennturl) && global.onform)
           {
             if(typeof global.onback[global.onform] == "function")
             {
                global.onback[global.onform]();
             }
             global.onform = null;
           }
           global.currennturl= window.location.href;
          }, 200)
        }

        window.history.replaceState({ ...window.history.state, as: Router.asPath.split("#").join(""), url: Router.asPath.split("#").join("") }, '', Router.asPath.split("#").join(""))
        window.history.pushState({ ...window.history.state, as: window.location.href+"#", url: window.location.href }, '', window.location.href+"#")
        global.onform = name;

        var body = document.getElementsByTagName("body")[0]
        body.style.overflow = "hidden";
    },
    
    RemoveBackableForms:(name)=>
    {
        if(global.onform == name)
        {
            global.onform = null
            window.history.replaceState({ ...window.history.state, as: Router.asPath.split("#").join(""), url: Router.asPath.split("#").join("") }, '', Router.asPath.split("#").join(""))
            var body = document.getElementsByTagName("body")[0]
            body.style.overflowY = "auto";
        }
    },

    AddOnBack:(name, cb)=>
    {
        if(!global.onback)
        {
            global.onback = {}
        }
        
        global.onform = name;
        global.onback[name] = ()=>
        {
            cb();
        }
    }


}