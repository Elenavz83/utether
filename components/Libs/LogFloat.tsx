import { useEffect } from 'react'
import { useState } from 'react'

const LogItem = (props) => {
  let color = "yellowgreen"
  let icon = global.cdn("/files/ok.svg")
  if (props.type == "error") {
    color = "#f45000"
    icon = global.cdn("/files/close.svg")
  }
  else if (props.type == "warning") {
    color = "#dfe127"
    icon = global.cdn("/files/warning.svg")
  }
  return <div style={{ color }}>
    <img src={global.cdn(icon)} style={{
      display: "inline-block", verticalAlign: "middle", width: 12,
      marginTop: props.type == "warning" ? -4 : 0
    }} /><sp-3 />
    <span>{">"} {props.children} </span></div>
}

export default (props) => {
  let [items, setItems] = useState([
    // { text: "Requesting DNS...", type: "ok", date: new Date() },
    // {
    //   text: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries\
    //  for previewing layouts and visual mockups.", type: "error", date: new Date()

  ]);

  let [autoscrolldown, setAutoscrolldown] = useState(true);

  props.function.add = (text, type, date) => {

    if (typeof text == "object") {
      items.push({ text: text.text, type: text.type, date: text.date || new Date() })
      setItems([...items])
    }
    else {
      items.push({ text, type: type || "ok", date: date || new Date() })
      setItems([...items])
    }
  }

  


  useEffect(() => {
    if (items.length > 0) {
      if (autoscrolldown) {
        let el = document.getElementById("logger")
        el.scrollTo(0, el.scrollHeight)
      }
    }
    global.setScroller("logger");
  })

  let lgrbtm = null

  return <>
    <div className={styles.blackblurybg} style={{ zIndex: props.z || 250, opacity: props.darkness }}
      onMouseDown={() => { props.onclose?.() }}></div>
    <div className={styles.dialog}
      style={{
        width: "92vw", maxWidth: props.maxWidth || "22rem", zIndex: props.wz || (props.z ? props.z + 1 : null),
        // height: 150,
        top: "50%",
        backgroundColor: "#000000ee",
        ...props.style
      }}>


      {/* <img className={styles.hoverfade} src={global.cdn("/files/minimize.svg")} style={{ width: 20, position: "absolute", top: 10, right: 10 }} /> */}
      <c-cc style={{ height: "100%", width: "100%", borderRadius: 5, padding: "10px 0 20px 0", color: "yellowgreen" }}>

        <br-x />
        <br-x />
        <br-x />
        <img src={global.cdn("/files/qeraw.webp")} style={{ width: 130 }} />
        <img src={global.cdn("/files/loading3dots.svg")} style={{ position: "absolute", width: 70, height: 70, top: 70 }} />
        <br-x />
        <br-x />
        <br-x />
        <br-x />
        <img className={styles.hoverfade} src={global.cdn("/files/forbidden.svg")}
          style={{ position: "absolute", width: 15, height: 15, top: 98, right: 20 }}
          onClick={()=>{
            global.loggeronstop?.()
          }}
          onMouseEnter={() => {
            document.getElementById("loggerstop").style.width = "25px";
          }}
          onMouseLeave={() => {
            document.getElementById("loggerstop").style.width = "0px";
          }}
        />

        <span id="loggerstop" style={{
          color: "white", overflowX: "hidden",
          position: "absolute", right: 45, top: 98, width: 0, transition: "ease 0.2s", fontSize: 11,
          lineHeight: 1.25
        }}>{lang.stop}</span>

        {items.length > 0 ? <c-x style={{
          width: "90%", fontSize: 10, lineHeight: 2, border: "solid 1px #229e0055", padding: "5px 10px 5px 10px",
          borderRadius: 5, position: "relative"
        }}>
          <c-cc style={{
            position: "absolute", bottom: 5, right: lang.dir == "ltr" ? 5 : null,
            left: lang.dir == "rtl" ? 5 : null
          }}>
            <img className={styles.hoverfadexx} src={global.cdn("/files/share2.svg")}
              style={{ width: 30, }} onClick={() => {

              }} />
            <br-xx />
            <img id="loggerbtm" className={styles.hoverfadexx} src={global.cdn("/files/godown.svg")}
              style={{ width: 30, display: "none", marginTop: 5 }} onClick={() => {
                let el = document.getElementById("logger")
                el.scrollTo(0, el.scrollHeight)
                setTimeout(() => {
                  setAutoscrolldown(true)
                }, 300);
              }} />
          </c-cc>


          <div id="logger" style={{ maxHeight: 400, minHeight: 120, overflowY: "scroll", }}
            onWheel={() => {
              setAutoscrolldown(false)
            }}
            onTouchMove={() => {
              setAutoscrolldown(false)
            }}
            onMouseMove={() => {
              if (global.mousedown) setAutoscrolldown(false)
            }}
            onMouseDown={() => {
              global.mousedown = true;
            }}
            onMouseUp={() => {
              global.mousedown = false;
            }}
            onScroll={(e) => {
              if (!lgrbtm) {
                lgrbtm = document.getElementById("loggerbtm")
              }
              if (((e.target as any).scrollTop + 450) < (e.target as any).scrollHeight - 20) {

                lgrbtm.style.display = "block"
              }
              else {
                lgrbtm.style.display = "none"
                setAutoscrolldown(true)
              }
            }}>
            {items.map(it => {
              return <LogItem  type={it.type} key={Math.random()+it.date?.getTime()}>{it.text}</LogItem>
            })}
          </div>

        </c-x> : null}

      </c-cc>


    </div>
  </>

}