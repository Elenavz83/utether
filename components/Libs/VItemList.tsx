import Window from './Window'
import VItem from './VItem'
import { useState } from 'react'
import WindowFloat from './WindowFloat'
import Icon2Titles from './Icon2Titles'

export default (props:{
  items?:any[],
  txtmt?:number,
  title?:string,
})=>
{
  var [form , setForm] = useState(null)
  var packs = []
  var len = Math.min(6, props.items.length);
  for(let i = 0; i < len; i+=3)
  {
      packs.push([
        <VItem key={"vitem_"+props.items[i].title} title={props.items[i].title} image={props.items[i].image}
         on={()=>props.items[i].on?.()} txtmt={props.txtmt}/>,
        (i+1) < len? <VItem key={"vitem_"+props.items[i+1].title} title={props.items[i+1].title} 
        image={props.items[i+1].image} image2={props.items[i+1].image2} 
        on={()=>props.items[i+1].on?.()} txtmt={props.txtmt}/>:null,
        (i+2) < len? <VItem key={"vitem_"+props.items[i+2].title} title={props.items[i+2].title} 
        image={props.items[i+2].image} image2={props.items[i+2].image2} on={()=>props.items[i+2].on?.()} txtmt={props.txtmt}/>:null,
      ])
  }

  if(props.items.length > len)
  {
    var lastrow = packs[packs.length - 1];
    lastrow[lastrow.length - 1] = <VItem key="more_vitem" title={lang.more} image={global.cdn("/files/more.svg")} s={45} 
    on={()=>{setForm("more")}} txtmt={props.txtmt}/>
  }

  return <>

  {form=="more"?<WindowFloat title={lang.selcurrency} onclose={()=>setForm(null)}>
    {
      props.items.map((it,i)=>{
        if(i < 5) return null;
        return <div key={"vitem_"+it.title}><Icon2Titles
        style={{backgroundColor:"#f1ddc1"}}
        title1={it.title}
        title2={it.title2}
        image={it.image}
        on={()=>{
          it.on?.();
          setForm(null);
        }}/><br-xxx/></div>
      })
    }
    

  </WindowFloat>:null}
  
  <Window title={props.title}>  
        {packs.map((row,i)=>{
          return <div key={"vitem_r"+ i} className={styles.dbar}>
            {row}
          </div>
        })}
  </Window></>
}