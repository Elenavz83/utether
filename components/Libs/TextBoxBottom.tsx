import { useState, useEffect } from 'react';



export default (props: {
  id?:string,
  onmentionclose?:()=>void,
  readOnly?:boolean,
  placeholder?:string,
  loginrequired?:()=>void,
  isMobile?:boolean,
  on?:(v:{text:string})=>void,


}) => {
  var [txt, setTxt] = useState('');
  var shift = false;
  var alt = false

  useEffect(() => {
    var t = document.getElementById("txt")
    var d = document.getElementById("div")
    t.scrollTop = t.scrollHeight;
    t.style.height = '1rem';
    t.style.height = (t.scrollHeight) + 'px';
    d.style.height = t.scrollHeight + "px";
  })



  return <div style={{
    position: "fixed", display: "flex", justifyContent: "center", marginTop: 5,
    bottom: 15, left: 0, width: "100%", zIndex: 99
  }}>

    <f-csb id={props.id + "_mention"} class={styles.mentionhide}>
      <f-c><sp-2 /><span id={props.id + "_mention_name"}></span></f-c>

      <img src={global.cdn("/files/close.svg")} style={{ height: 40, padding: "10px 10px 10px 10px", objectFit: "cover" }} onClick={(e) => {
        (e.target as any).parentNode.className = styles.mentionhide;
        props.onmentionclose?.()
      }} />
    </f-csb>

    <div id="div" className={styles.divsend} style={{
      position: "relative",
      maxWidth: "49rem", maxHeight: "25rem"
    }}>
      <textarea
        style={{
          width: "calc(100% - 20px)",
          margin: lang.dir == "rtl" ? "2px 10px 0px 5px" : "5px 5px 0px 10px",
          paddingLeft: lang.dir == "rtl" ? 48 : null,
          paddingRight: lang.dir == "ltr" ? 48 : null,
          direction: lang.dir,
          fontFamily: "inherit",
        }}
        className={styles.txtsend}
        readOnly={props.readOnly}
        disabled={props.readOnly}
        placeholder={props.placeholder as any}
        id="txt" dir="auto" spellCheck={false} defaultValue={txt}
        onClick={(e) => {
          if (!global.user.loggedin) {
            props.loginrequired?.()
            e.preventDefault();
          }
        }}
        onKeyDown={(e) => {
          if (!global.user.loggedin) {
            props.loginrequired?.()
            return
          }
          if (e.shiftKey) {
            shift = true;
          }
          if (e.altKey) {
            alt = true;
          }
          if (e.key == "Enter" && !alt && !shift && txt.trim().length > 0) {
            if (props.isMobile) {
              return
            }
            document.getElementById("txt").value = "";
            e.preventDefault();
            setTxt('')
            props.on?.({ text: txt });
            return;
          }
        }}
        onKeyUp={(e) => {
          if (!global.user.loggedin) {
            props.loginrequired?.()
            return
          }
          if (e.shiftKey) {
            shift = false;
          }
          if (e.altKey) {
            alt = false;
          }
          if (e.key == "Enter" && !alt && !shift && txt.trim().length > 0)
            return
          setTxt(e.target.value)
        }} />


      {/* 
    <div style={{position:"absolute", left:5, bottom:1,}}>
      <div style={{paddingLeft:10, paddingTop:10, paddingBottom:1, paddingRight:10, cursor:"pointer", }}
      onClick={(e)=>
        {
            props.onclose?.()
        }}><img src={global.cdn("/files/back.svg")} style={{width:28, height:28}} /></div>
      </div> */}


      <div style={{
        position: "absolute",
        right: lang.dir == "ltr" ? 10 : null,
        left: lang.dir == "rtl" ? 10 : null,
        bottom: -2,
      }}>
        {txt.length == 0 ? null :
          <div style={{ paddingLeft: 10, paddingTop: 10, paddingRight: 10, cursor: "pointer", }}
            onClick={(e) => {
              if (txt.trim().length > 0) {
                document.getElementById("txt").value = "";
                e.preventDefault();
                setTxt('')
                props.on?.({ text: txt });
                return;
              }
            }}><img src={global.cdn("/files/send.svg")} style={{
              width: 28, height: 28,
              transform: lang.dir == "rtl" ? "rotate(180deg)" : null
            }} /></div>
        }
      </div>



    </div>
  </div>
}