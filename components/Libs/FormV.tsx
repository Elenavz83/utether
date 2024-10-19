import WindowFloat from "./WindowFloat";

export default (props:{title:string, items:Array<{name:string|number, value:any, image?:string, icon?:string}>
onhelp?:any, onclose?:any, on?:any, strvalue:string}) => {

  let btnbg = "#c9ceb1"
  let optstyle = { height: 35, width: "100%", margin: 2, borderRadius: 3, backgroundColor: btnbg }

  return  <WindowFloat title={props.title} onclose={() => { props.onclose?.(); }} 
  onhelp={props.onhelp?(()=>{props.onhelp?.()}):null}>
    {
      props.items.map((item, i) => {
        let it = item;
        if(typeof it != "object")
        {
          it = {name:it, value:it}
        }
        let itp = props.items[i + 1];
        if(itp && typeof itp != "object")
        {
          itp = {name:itp, value:itp}
        }
        let Img = null;
        if(item.image || item.icon)
        {
          Img = <img src={global.cdn("/files/ok.svg")} style={{width:15, height:15, margin:"0 5px", display:"inline-block", verticalAlign:"middle"}}/>
        }
        if (i % 2 == 0) {
          return <f-cc key={"form_"+i+"_"+ item}>
            <f-cc  class={styles.hover} style={{ ...optstyle, backgroundColor: it.name == props.strvalue ? 'green' : btnbg }}
             onClick={() => { props.on?.(it.name, it.value) }}>
              <f-11><sp-2 />{Img}{(it.name).toLocaleString(lang.region)}<sp-2 /></f-11>
            </f-cc>
            {itp ? <f-cc class={styles.hover} style={{ ...optstyle, backgroundColor: itp.name == props.strvalue ? 'green' : btnbg }} 
            onClick={() => { props.on?.(itp.name,itp.value) }}>
              <f-11><sp-2 />{Img}{(itp.name).toLocaleString(lang.region)}<sp-2 /></f-11>
            </f-cc> : null}
          </f-cc>
        }
        return null;
      })
    }
    <br-xx />
  </WindowFloat>
}