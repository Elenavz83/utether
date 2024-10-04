import { CSSProperties } from "react";

export default (props:{on:(cheched:boolean)=>{}, style?:CSSProperties,
defaultChecked?:boolean, defaultValue?:boolean})=>
{
    let uid = Math.floor(Math.random()*1000);
    return <div className={styles.checkbox} style={props.style}>
    <input className={styles.inpcbx} defaultChecked={props.defaultChecked || props.defaultValue} 
     id={`chk-${uid}`} type="checkbox" onChange={(e)=>{ 
        props.on?.(e.target.checked)
    }} autoComplete="off"/>
    <label className={styles.cbx} htmlFor={`chk-${uid}`}><span>
    <svg width="12px" height="10px">
      <use href={`#check-${uid}`}></use>
    </svg></span></label>
    
    <svg className={styles.inlinesvg}>
      <symbol id={`check-${uid}`} className="0 0 12 10">
        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
      </symbol>
    </svg>
  </div>
}