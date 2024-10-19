import { CSSProperties } from "react"

export default (props?:{
  title?:string,
  contentbg?:string,
  children?:any,
  style?:CSSProperties
})=>
{
return <>
<div style={{ width:"100%", paddingBottom:5, marginBottom:0, backgroundColor:props.contentbg||"#f1e3cf", 
      borderRadius:"0.5rem ", fontSize:13, zIndex:100, boxShadow:"2px 2px 10px 2px rgba(0, 0, 0, 0.5)",...props.style}}>
  {props.title?<f-cc style={{height:25, backgroundColor:"#c1a076", borderRadius:"0.5rem 0.5rem 0 0",}}>
    <f-12 style={{color:"black"}}>{props.title}</f-12>
  </f-cc>:null}

    {props.children}

</div>
</>

    }