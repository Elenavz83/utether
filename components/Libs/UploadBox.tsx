import Upload, { UploadStatuses } from './Upload'

export default (props:{
  id?:string, title?:string, state?:any,singlefile?:boolean,readOnly?:boolean,
  on?:(st:UploadStatuses)=>void,
  explains?:boolean,maxsize?:number,extensionfilter?:any
})=>
{
  var functions:any = {}
    return <>
          <br-x/>
          <span style={{fontSize:14, fontWeight:600, paddingLeft:0}}>{props.title}</span>
          
          <div style={{marginTop:5, display:"flex"}}>
            <input id={props.id+"upload_inptxt"} style={{textAlign:"left", paddingLeft:10}} className={styles.txtfile} placeholder="" type='text'
            defaultValue={(props.state && props.state.length > 0)?(props.singlefile?props.state:props.state[0]):""} readOnly={props.readOnly}
            onBlur={(e)=>
            {
              if(e.target.value)
              {
                if(props.singlefile)
                {
                  props.on?.(e.target.value)
                }
                else
                {
                  props.on?.([e.target.value])
                }
              }
            }} />
            <f-cc class={styles.select_file} 
            style={{borderRadius:lang.dir == "ltr"?"0 8px 8px 0":"8px 0 0 8px"}}
            onClick={()=>{uploaders[props.id]?.open?.()}}>{lang.selectfiles}</f-cc>
          </div>

          <br-x/>
            {props.explains?<span style={{fontSize:10}}>.jpg, .jpeg, .png, .txt, .pdf, .zip, .rar , .js, .cs, .dll, .py <br/>{lang.max5f10mb}</span>:null}

            <Upload 
              id={props.id}
              singlefile = {props.singlefile}
              maxsize={props.maxsize}
              extensionfilter={props.extensionfilter}
              on={(st)=>
              {
                props.on?.(st)
              }}
              
            />
    </>
}