import Upload from './Upload'
import {useState} from 'react'
import TextBox from './TextBox'
import Circle from './Circle'

export default (props:{
  value?:any,
  body?:any,
  defaultValue?:any,
  url?:string,
  id?:string,
  title?:string,
  onlefticon?:()=>void,
  onrighticon?:()=>void,
  lefticon?:any,
  righticon?:any,
  extensionfilter?:any,
  on?:(any)=>void,
  reload?:()=>void,
})=>
{
  var functions:any = {}
  var propval = props.value||props.body||props.url || props.defaultValue||null
  if(propval && typeof propval == "object")
  {
    propval = "Uploading..."
  }
  var [doc, setDoc] = useState<any>({url:propval});
  var refresh = ()=> setDoc(JSON.parse(JSON.stringify(doc)))


    return <>
    <TextBox id={"txtbx_"+props.id} title={props.title} lefticon={props.lefticon} nolefticonrotate
     onlefticon={()=>{props.onlefticon?.()}}  defaultValue={propval} on={(n)=>{ doc.url = n; props.on?.(n)}}
     righticon={doc.percent?<Circle {...{percent:doc.percent, width:15}} />:global.cdn("/files/upload2.svg")}
     onrighticon={()=>{functions.open()}} />
    <Upload functions={functions}
    extensionfilter={props.extensionfilter}
              state = {doc.url}
              singlefile
              hidefileicons
              on={(u)=>{ if(u.length > 0 && typeof u[0] == "string") doc.url = u; refresh(); props.on?.(u); props.reload?.()}}
              onprogress={(percent)=>{doc.percent = percent; refresh(); 
                if(percent == 100)
                {
                  setTimeout(() => {
                      doc.percent = null;
                      refresh()
                  }, 500);
                }}}
              id={"uploadbx_"+props.id}
              marginLeft={5}
            />
    </>
}