import { useState } from "react"
import Bold from './Bold'
import Copy from './Copy'
import UploadSingleBox from './UploadSingleBox'
import WindowFloat from './WindowFloat'

export default (props:{extensionfilter?:any, defaultValue?:string, onclose?:()=>void,
    ondone?:(d?:string)=>void
})=>{
    let [upload, setUpload] = useState<any>({})
    let [cpicon, setCpIcon] = useState(global.cdn("/files/copy.svg"))
    return <WindowFloat title={lang.newupload} onclose={()=>props.onclose?.()} z={260}>
    <UploadSingleBox
    extensionfilter={props.extensionfilter}
    defaultValue={props.defaultValue}
     id="upload" title="" 
    on={(n)=>{setUpload({uploadval: n})}} value={upload.uploadval} reload={()=>{setCpIcon(global.cdn("/files/copy.svg"))}}
    lefticon={cpicon} onlefticon={()=>{Copy(upload.uploadval); setCpIcon(global.cdn("/files/ok.svg"))}}/>
    <br-x/>
    <f-cc class={styles.btnaccept} onClick={()=>{
        props.ondone?.(typeof upload.uploadval == "string"?upload.uploadval:null)
    }}><Bold>{lang.finish}</Bold></f-cc>
    </WindowFloat>
}