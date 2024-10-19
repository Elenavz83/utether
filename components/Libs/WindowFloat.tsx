import { CSSProperties } from "react"

export default (props:{
  z?:number, onclose?:()=>void, darkness?:number,
  maxWidth?:number | string, 
  padding?:number | string, 
  wz?:number, 
  titleBackColor?:string,
  titleColor?:string,
  title?:string,
  children?:any,
  onhelp?:()=>void,
  style?:CSSProperties,
  watermarkimg?:string
}) => {
  return <>
    <div className={styles.blackblurybg} style={{ zIndex: props.z || 250, opacity: props.darkness }}
      onMouseDown={() => { props.onclose?.() }}></div>
    <div className={styles.dialog}
      style={{ width: "92vw", maxWidth: props.maxWidth || "26rem", zIndex: props.wz || (props.z ? props.z + 1 : 251), ...props.style }}>

      <div style={{
        display: "flex", height: 30, alignItems: "center", backgroundColor: props.titleBackColor || "#c1a076", 
        borderRadius: "0.5rem 0.5rem 0 0", justifyContent: "center", fontSize: 12
      }}>
        <span style={{ color: props.titleColor || "black"}}>{props.title}</span>
        <div className={styles.hover} style={{ position: "absolute", right: 5, top: 3, cursor: "pointer" }} onClick={() => props.onclose ? props.onclose() : null}>
          <img src={global.cdn("/files/close.svg")} alt="close icon" style={{ width: 23, height: 23 }} />
        </div>
        {props.onhelp ? <div style={{ position: "absolute", left: 5, top: 3, cursor: "pointer" }} onClick={() => { props.onhelp?.() }}>
          <img src={global.cdn("/files/help.svg")} alt="help icon" style={{ width: 24, height: 24 }} />
        </div> : null}
      </div>
      <div style={{
        position: "relative", width: "100%", textAlign: "justify", padding: props.padding || "0.5rem 0.5rem 0.5rem 0.5rem", lineHeight: 1.5,
        backgroundColor: props.style?.backgroundColor
      }}>
        {props.children}

        {props.watermarkimg?<f-cc style={{
          position: "absolute", width: "100%", height: "100%", zIndex: -1,
          opacity: 0.2, top:0, left:0,
        }}>
          <img src={global.cdn(props.watermarkimg)} style={{height: "60%", maxHeight:200, marginTop:-30 }} />
        </f-cc>:null}
      </div>
    </div>
  </>

}