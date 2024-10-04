export default (date:Date)=>{
    return <f-c style={{display:"inline-block", direction:"ltr"}}>
    <span>{date.toLocaleDateString(lang.region)}</span>
    <sp-3/>
    <span>{date.toLocaleTimeString(lang.region)}</span>
  </f-c>
}