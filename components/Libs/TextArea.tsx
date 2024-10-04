import { CSSProperties } from 'react'
import Bold from './Bold'
export default (props:{
    bold?:boolean,
    title?:string,
    defaultValue?:string,
    placeholder?:string,
    readonly?:boolean,
    readOnly?:boolean,
    minHeight?:number|string,
    style?:CSSProperties
    on?:(string)=>void,
    selectonclick?:boolean,
})=>
{
    var uniqekey = Math.random()*100
    return <div style={{width:"100%"}}>
    <div style={{fontSize:12, }}>{props.bold?<Bold>{props.title}</Bold>:props.title}</div>
    <textarea dir="auto"  key={uniqekey++} defaultValue={props.defaultValue} spellCheck={false} placeholder={props.placeholder}
    rows={1}
    readOnly={props.readonly||props.readOnly}
    style={{width:"100%", minHeight:(typeof props.minHeight == "undefined"?"8rem":props.minHeight), marginTop:4,
     resize:"none", padding:"6px 5px 5px 5px", 
     borderRadius:2, 
     fontFamily:"inherit", direction:lang.dir,...props.style}}
     onChange={(e)=>{props.on?.(e.target.value)}} 
     onClick={(e)=>{setTimeout(()=>{e.target.scrollIntoView({ behavior: 'smooth',block: "center"});},300);
     if(props.selectonclick)
     {
        e.target.select();
     }
    }}/></div>
}