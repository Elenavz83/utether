import TextArea from './TextArea';
import WindowFloat from './WindowFloat'
import Bold from './Bold';
import { CSSProperties } from 'react';

export default (props: {
  value?: string,
  defaultValue?: string,
  body?: string,
  maxlen?: number,
  title?: string,
  onclose?: () => void,
  width?: number | string,
  maxWidth?: number | string,
  title2?: string,
  small?: boolean,
  z?: number,
  style?: CSSProperties,
  onchange?: (string) => void,
  selectonclick?: boolean,
  on?: (string) => void,
  onrighticon?: () => void,
  onlefticon?:()=>void,
  explain?:string,
}) => {

  var value = null
  if (typeof props.value != "undefined") {
    value = props.value.toString();
  }
  if (typeof props.defaultValue != "undefined") {
    value = props.defaultValue.toString();
  }
  if (typeof props.body != "undefined") {
    value = props.body.toString();
  }
  var txt = value.toString();
  let charsleft = (props.maxlen || 1000) - (value || "").length
  return <WindowFloat title={props.title} onclose={() => { props.onclose ? props.onclose() : null }}
    maxWidth={props.maxWidth || props.width} z={props.z}>

    <TextArea title={props.title2} defaultValue={value} style={props.style} selectonclick={props.selectonclick}
      minHeight={props.small ? 0 : "8rem"} on={(t) => {
        txt = t; props.onchange?.(txt);
        if (props.small && txt.endsWith('\n')) {
          props.on(txt.trim())
        }
        charsleft = (props.maxlen || 1000) - txt.length
        let el = document.getElementById("txtareafloatchleft")
        el.innerHTML = lang.xxcharsleft.replace(/XX/, (charsleft).toLocaleString(lang.region))
        el.style.color = charsleft > 0 ? "darkgreen" : "maroon"
      }}
      // onrighticon={() => props.onrighticon?.()}
      // onlefticon={() => props.onlefticon?.()}
    />

    <f-c style={{ margin: "-3px 3px 0 3px", color: charsleft > 0 ? "darkgreen" : "maroon" }}>
      <f-11 id="txtareafloatchleft">{lang.xxcharsleft.replace(/XX/,
        ((props.maxlen || 1000) - (value || "").length).toLocaleString(lang.region))}</f-11>
    </f-c>
    <br-x />
    <span style={{ fontSize: 11 }}>{props.explain}</span>

    <div style={{ textAlign: "center", marginTop: 5, display: "flex", justifyContent: "center" }}>
      <f-cc class={styles.btnaccept} onClick={() => {
        if (charsleft > 0) {
          props.on(txt)
        }

      }} ><Bold>{lang.done}</Bold></f-cc> &nbsp;
    </div>
  </WindowFloat>
}