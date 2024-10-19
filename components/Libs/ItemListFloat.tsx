import WindowFloat from './WindowFloat'

export default (props:{trigger:number, items:Array<any>, title:string,onclose?:()=>void,
  head?:any, foot?:any, onhelp?:()=>void
})=>
{
  
  var couples = []

  var wstyle= null
  if(props.trigger == 400)
  {
    wstyle = styles.itemlist400w
  }
  else if(props.trigger == 600)
  {
    wstyle = styles.itemlist600w
  }
  else if(props.trigger == 800)
  {
    wstyle = styles.itemlist800w
  }
  else if(props.trigger == 1024)
  {
    wstyle = styles.itemlist1024w
  }

  var sstyle= null
  if(props.trigger == 400)
  {
    sstyle = styles.itemlist400s
  }
  else if(props.trigger == 600)
  {
    sstyle = styles.itemlist600s
  }
  else if(props.trigger == 800)
  {
    sstyle = styles.itemlist800s
  }
  else if(props.trigger == 1024)
  {
    sstyle = styles.itemlist1024s
  }


  for(let i = 0; i < props.items.length; i+=2)
  {
    if((i + 1) < props.items.length)
    { 
      couples.push(<div key={props.title+"_"+i} className={wstyle} style={{width:"100%", justifyContent:"space-evenly"}}>
          {props.items[i]}
          &nbsp;
          {props.items[i+1]}
        </div>)
    }
    else
    {
      couples.push(<div key={props.title+"_"+i} className={wstyle}>
        {props.items[i]}
      </div>)
    }
  }
return <>

      <WindowFloat title={props.title} onclose={()=>{props.onclose?.()}} onhelp={props.onhelp}>
      
        {props.head}
        <div style={{width:"100%", textAlign:"justify", padding: "", lineHeight:1.2}}>
        
        {couples}
        
        <div className={sstyle}>{props.items.map(x=>x)}</div>
        {props.foot}
        
        </div>
        </WindowFloat>

</>

    }