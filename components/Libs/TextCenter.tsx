import Copy from './Copy'

export default (props:{
  title?:string,
  sup?:string,
  fontSize?:number | string,
  value?:any,
  copyval?:string,
  copyalert?:string,
})=>
{
return <>
  <span style={{ fontSize:13}}>{props.title}<sup style={{ fontSize:8}}>&nbsp;{props.sup}</sup> </span>
    <div className={props.fontSize?null:styles.flexibletxtsize}  style={{fontSize:props.fontSize, width:"100%",
     textAlign:"center",  color:"green", marginTop:5, marginBottom:5}}>
      {props.value} &nbsp;
    <div style={{display:"inline-block", marginRight:3, verticalAlign:"middle"}}>
    {props.copyval? <img className={styles.menubtn} onClick={()=>{
        Copy(props.copyval)
        alerter(props.copyalert||"Copied to the clipboard")
      }} src ={global.cdn("/files/copy.svg")} alt="copy icon" style={{width:15, height:15}}/>:null}
    </div>
  </div>
</>
}