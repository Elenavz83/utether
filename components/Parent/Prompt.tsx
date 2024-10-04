import WindowFloat from '../Libs/WindowFloat'
import { useEffect, useState } from 'react'
import TextAreaEditFloat from '../Libs/TextAreaEditFloat'
import ReplacePro from '../Libs/ReplacePro'
import LogFloat from '../Libs/LogFloat'


function Toast(props) {
  useEffect(() => {
    let to = 3000;
    if(props.fast)
    {
      to = 700
    }
    setTimeout(() => {
      if (document.getElementById("notifer"))
        document.getElementById("notifer").className = `${styles.notification} ${styles.show}`
    }, 200);
    const timeout = setTimeout(() => {
      if (document.getElementById("notifer"))
        document.getElementById("notifer").className = `${styles.notification} ${styles.hide}`
      setTimeout(() => {
        props.onfinish?.()
      }, to);
    }, to);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div id="notifer" className={`${styles.notification} ${styles.hide}`} style={{ backgroundColor: props.color }}>
      {props.message}
    </div>
  );
}

export default (props) => {
  let [state, setState] = useState<any>
    ({ show: null, title: null, text: null, oktext: null, canceltext: null })
  let uniquekey = new Date().getTime();
  global.logger = {}

  if (!global.loglist) {
    global.loglist = [];
  }


  global.closelog = () => {
    setTimeout(() => {
      setState({ show: null, })
    }, 1000);
  }

  global.success = (text: string, fast:boolean = false) => {
    setTimeout(() => {
      setState({ show: "toast", text, color: "#4CAF50", fast })
    }, 300);
  }

  global.error = (text: string) => {
    setState({ show: "toast", text, color: "maroon" })
  }



  global.confirmer = (title: string, text: string | Element, oktext: string, canceltext: string): Promise<boolean> => {
    if (text) {
      setState({ show: "confirm", title, text, oktext, canceltext })
    }
    else {
      setState({ show: "confirm", title: null, text: title })
    }

    return new Promise(r => {
      global.confirmresolve = (x) => { r(x) }
    })
  }

  global.alerter = (title: string, text: string | Element, style?: any, watermarkimg?: string): Promise<void> => {
    if (text) {
      setState({ show: "alert", title, text, style, watermarkimg })
    }
    else {
      setState({ show: "alert", title: null, text: title, style, watermarkimg })
    }
    return new Promise(r => {
      global.alertresolve = (x) => { r(x) }
    })
  }

  global.prompter = (title: string, text: string, maxlen: number = null,
    small: boolean = false, defaulttext: string = "", style?: any, selectonclick:boolean = true,
     type:("text"|"number"|"url"|"email"|"tel") = "text"): Promise<string> => {
    if (text) {
      setState({ show: "prompt", title, text, maxlen, small, defaulttext, style ,selectonclick, type})
    }
    else {
      setState({ show: "prompt", title: null, text: title, maxlen: null, small, defaulttext ,selectonclick, type})
    }

    return new Promise(r => {
      global.promptresolve = (x) => { r(x) }
    })
  }


  global.logonstop = (cb: () => void) => {
    global.loggeronstop = () => { cb() };
  }

  global.log = (obj: { text: string, type: "ok" | "error" | "warning", date: Date }) => {
    if (state.show != "log") {
      global.loglist.push(obj)
      global.logger = {};
      setState({ show: "log" })
      setTimeout(() => {
        for (let it of global.loglist) {
          global.logger?.add?.(it)
        }
        global.loglist = [];
      }, 500);
    }
    else {
      if (global.loglist.length == 0) {
        global.logger?.add?.(obj)
      }
      else {
        global.loglist?.push(obj)
      }
    }
  }

  const logchecker = () => {
    setTimeout(() => {
      if (state.show == "log") {
        logchecker();
      }
    }, 1000);
  }


  if (!state.show) {
    return null
  }
  else if (state.show == "toast") {
    return <Toast message={state.text} color={state.color} fast={state.fast} onfinish={() => { setState({ show: false }) }} />
  }
  else if (state.show == "prompt") {
    let width = state.style?.width;
    delete state.style?.width
    let zIndex = state.style?.zIndex
    delete state.style?.zIndex
    return <TextAreaEditFloat title={state.title || lang.sysmsg} title2={state.text} maxlen={state.maxlen}
      style={state.style} width={width} z={zIndex} selectonclick={state.selectonclick} type={state.type}
      small={state.small} value={state.defaulttext} onclose={() => {
        setState({})
        global.promptresolve(null)
      }} on={(txt) => { global.promptresolve(txt); setState({ show: false }) }} />
  }
  else if (state.show == "log") {
    return <LogFloat function={global.logger} onclose={() => { setState({}) }} z={1000} />
  }
  else if (state.show == "confirm") {
    return <WindowFloat title={state.title || lang.sysmsg} onclose={() => { global.confirmresolve(false); setState({ show: false }) }}
      maxWidth={350} z={9999}>

      {typeof state.text == "string" ? <p>{ReplacePro(state.text, "\n", <br key={"alert_" + uniquekey++} />)}</p> : state.text}
      <br-x />
      <f-cc class={styles.btnaccept} onClick={() => { global.confirmresolve(true); setState({ show: false }) }}>{state.oktext ? state.oktext : lang.imsure}</f-cc>
      <br-xx />
      <f-cc class={styles.btncancel} onClick={() => { global.confirmresolve(false); setState({ show: false }) }}>{state.canceltext ? state.canceltext : lang.cancel}</f-cc>
    </WindowFloat>
  }
  else if (state.show == "alert") {
    return <WindowFloat title={state.title || lang.sysmsg}
      onclose={() => { global.alertresolve?.(); setState({ show: false }) }}
      maxWidth={450} z={10000}>

      {typeof state.text == "string" ? <p style={{ ...state.style, zIndex: 452 }}>
        {ReplacePro(state.text, "\n", <br key={"alert_" + uniquekey++} />)}
      </p> : state.text}
      <br-x />
      <br-xx />
      <f-cc class={styles.btnaccept} onClick={() => { global.alertresolve?.(); setState({ show: false }) }}>{lang.confirm}</f-cc>
    </WindowFloat>
  }

}