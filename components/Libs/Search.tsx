import Router from 'next/router'
import { useState, useEffect } from 'react'
export default (props:{
  defaultValue?:string,
  on?:(string)=>void,
  mainpage?:boolean,
  title?:string,
  lbtntext?:string,
  onplus?:()=>void,
  lefticon?:any,
  lefticondisable?:boolean, placeholder?:string,
  onbtnl?:()=>void,onlefticon?:()=>void,
}) => {
  var [clicked, setClicked] = useState(false)

  useEffect(() => {
    if (!props.defaultValue && !Router.query.s && (document.getElementById("searchinput") as HTMLInputElement).value) {
      (document.getElementById("searchinput") as HTMLInputElement).value = ""
    }
  })
  var onsearch = (txt) => {
    if (props.on) {
      props.on(txt)
    }
    else {
      if (props.mainpage) {
        Router.push(global.root + "/" + txt)
      }
      else {
        if (txt == "") {
          delete Router.query.s
          Router.push({ pathname: Router.pathname, query: Router.query })
        }
        else {
          Router.query.s = txt
          Router.push({ pathname: Router.pathname, query: Router.query })
        }
      }

    }
  }
  return <div className={styles.searchbox}>

    <div style={{ width: "100%", marginTop: 5, padding: "0.5rem 0.5rem 0.5rem 0.5rem", fontSize: 12, fontWeight: 600 }}>
      {props.title}
      <f-c style={{ marginTop: 3 }}>
        {props.lbtntext ? <><f-cc class={styles.btnnewticket} onClick={() => { props.onbtnl?.() }}>{props.lbtntext}</f-cc>
          <sp-3 /><div className={styles.divider}></div><sp-3 /></> : null}
        &nbsp;

        {props.onplus ? <>
          <img style={{ cursor: "pointer", width: 28, height: 28 }} src={global.cdn("/files/plus.svg")}
            alt="new icon" onClick={() => {
              props.onplus?.()
            }} />
          <sp-3 />
        </> : null}

        {props.lefticon ? <>
          <img className={props.lefticondisable ? styles.disablesat : null}
           style={{ cursor: "pointer", width: 28, height: 28 }} src={global.cdn(props.lefticon)}
            alt="search option's icon" onClick={() => {
              props.onlefticon?.()
            }} />
          <sp-3 />
        </> : null}




        <div style={{ position: "relative", width: "100%", }}>

          <f-cc class={styles.hoverfade} style={{
            position: "absolute", left: global.lang.dir == "rtl" ? 5 : null,
            right: global.lang.dir == "ltr" ? 5 : null, top: 3, padding: "3px 10px", cursor: "pointer",
          }}
            onClick={() => {

              if ((document.getElementById("searchinput") as HTMLInputElement).value?.length > 0) {
                if (props.mainpage) {
                  Router.push(global.root)
                }
                else {
                  delete Router.query.s
                  Router.push({ pathname: Router.pathname, query: Router.query })
                }
              }
            }}>
            <img
              style={{ width: 23, height: 23 }} src={global.cdn("/files/close.svg")}
              alt="search close's icon" onClick={() => {

              }} /></f-cc>

          <input id="searchinput" style={{ padding: "0 5px", fontFamily: "inherit" }} className={styles.txt3}
            onClick={(e) => { if (!clicked) { e.target.select(); e.preventDefault(); setClicked(true) } }}
            placeholder={props.placeholder} type='text' defaultValue={props.defaultValue}
            onBlur={() => { setClicked(false) }}

            spellCheck={false} onKeyDown={(event) => {
              // console.log(event)
              if (event.key == "Enter" || event.key == "NumpadEnter") {
                onsearch(event.target.value)
              }
            }} /></div>
        &nbsp;<img style={{ cursor: "pointer", width: 28, height: 28, transform: lang.dir == "rtl" ? "rotate(180deg)" : null }} src={global.cdn("/files/go.svg")}
          alt="go for search" onClick={() => {
            onsearch((document.getElementById("searchinput") as HTMLInputElement).value)
          }} />
      </f-c>
    </div>
  </div>
}