import { CSSProperties } from 'react';
import NumAbbrev from './NumAbbrev';
export default (props:{
  myvote:number, stars?:number, id:string, width?:number, height?:number, 
  voterscount?:number, style?:CSSProperties,emoji?:boolean, readonly?:boolean
  on?:(number)=>void, showrank?:boolean,fontColor?:string, fontSize?:string | number
})=>
{

  var stablenum = props.myvote || props.stars || 0;
  let midopacity = 0.9
  var color = (num)=>{
    for(let i = 1; i <= 5; i++)
    {
      if(i <= num)
      {
        var el = document.getElementById("s"+i+"_"+ props.id) as HTMLImageElement
        el.src = global.cdn("/files/stargold.svg")
        el.style.transform = "scale(0.9)"
        el.style.opacity = "1"
      }
      else
      {
        if(Math.abs(i - num) < 1 && Math.abs(i - num) > 0.05)
        {
          var el = document.getElementById("s"+i+"_"+ props.id) as HTMLImageElement
          el.src = global.cdn("/files/stargoldhalf.svg")
          el.style.transform = "scale(0.8)"
          el.style.opacity = "0.8"
        }
        else
        {
          var el = document.getElementById("s"+i+"_"+ props.id) as HTMLImageElement
          el.src = global.cdn("/files/star.svg")
          el.style.transform = "scale(0.8)"
          el.style.opacity = "0.5"
        }
      }
    }
  }

  var w= props.width||30
  var h = props.height||25

  var starimgs = [1,1,1,1,1].map(x=> global.cdn("/files/star.svg"))
  var opacities = [0.5,0.5,0.5,0.5,0.5]
  if(stablenum > 0)
  {
    if(stablenum < 1)
    {
      opacities[0] = midopacity
      starimgs[0] = global.cdn("/files/stargoldhalf.svg")
    } 
    else
    {
      opacities[0] = 1
      starimgs[0] = global.cdn("/files/stargold.svg")
    }
  }
  if(stablenum > 1)
  {
    if(stablenum < 2)
    {
      opacities[1] = midopacity
      starimgs[1] = global.cdn("/files/stargoldhalf.svg")
    } 
    else
    {
      opacities[1] = 1
      starimgs[1] = global.cdn("/files/stargold.svg")
    }
  }
  if(stablenum > 2)
  {
    if(stablenum < 3)
    {
      opacities[2] = midopacity
      starimgs[2] = global.cdn("/files/stargoldhalf.svg")
    } 
    else
    {
      opacities[2] = 1
      starimgs[2] = global.cdn("/files/stargold.svg")
    }
  }
  if(stablenum > 3)
  {
    if(stablenum < 4)
    {
      opacities[3] = midopacity
      starimgs[3] = global.cdn("/files/stargoldhalf.svg")
    } 
    else
    {
      opacities[3] = 1
      starimgs[3] = global.cdn("/files/stargold.svg")
    }
  }
  if(stablenum > 4)
  {
    if(stablenum < 5)
    {
      opacities[4] = midopacity
      starimgs[4] = global.cdn("/files/stargoldhalf.svg")
    } 
    else
    {
      opacities[4] = 1
      starimgs[4] = global.cdn("/files/stargold.svg")
    }
  }

  let ranktext = props.stars.toString()
  if(props.voterscount)
  {
    ranktext = props.stars.toLocaleString(lang.region,{maximumFractionDigits:2}) +
     "/" + NumAbbrev(props.voterscount)
  }
  
  const sp = (e) =>{e.stopPropagation(); }
  return <f-c style={{...props.style, direction:"ltr"}}>

      {props.emoji?<f-cc style={{height:h, width:w, cursor:"pointer"}}
            onMouseDown={(e)=>{sp(e)}} onMouseUp={(e)=>{sp(e)}}  onTouchStart={(e)=>{sp(e)}} onTouchEnd={(e)=>{sp(e)}}
            onMouseEnter={(e)=>{sp(e);props.readonly?null:color(1)}}  
            onMouseLeave={(e)=>{sp(e);props.readonly?null:color(stablenum)}}  
            onClick={(e)=>{sp(e);if(props.readonly) return ;stablenum = 1; props.on?.(stablenum); }}>
        <img style={{height:h, width:h, marginTop:2 }} src={global.cdn("/files/emoji/😤.png")} /></f-cc>:null}

        
      <f-cc style={{height:h, width:w, cursor:"pointer"}}
      onMouseDown={(e)=>{sp(e)}} onMouseUp={(e)=>{sp(e)}}  onTouchStart={(e)=>{sp(e)}} onTouchEnd={(e)=>{sp(e)}}
            onMouseEnter={(e)=>{sp(e);props.readonly?null:color(1)}}  
            onMouseLeave={(e)=>{sp(e);props.readonly?null:color(stablenum)}}  
            onClick={(e)=>{sp(e);if(props.readonly) return ;stablenum = 1; props.on?.(stablenum); }}>
        <img id={"s1_"+props.id} style={{transform:"scale(0.8)", transition:"all 0.2s ease-out", height:h, width:30, opacity:opacities[0],  }} 
        src={starimgs[0]} /></f-cc>

        <f-cc style={{height:h, width:w, cursor:"pointer"}}
        onMouseDown={(e)=>{sp(e)}} onMouseUp={(e)=>{sp(e)}}  onTouchStart={(e)=>{sp(e)}} onTouchEnd={(e)=>{sp(e)}}
            onMouseEnter={(e)=>{sp(e);props.readonly?null:color(2)}}  
            onMouseLeave={(e)=>{sp(e);props.readonly?null:color(stablenum)}}  
            onClick={(e)=>{sp(e);if(props.readonly) return ;stablenum = 2; props.on?.(stablenum);}}>
        <img id={"s2_"+props.id} style={{transform:"scale(0.8)", transition:"all 0.2s ease-out", height:h, width:30, opacity:opacities[1] }} 
        src={starimgs[1]} /></f-cc>

        <f-cc style={{height:h, width:w, cursor:"pointer"}}
        onMouseDown={(e)=>{sp(e)}} onMouseUp={(e)=>{sp(e)}}  onTouchStart={(e)=>{sp(e)}} onTouchEnd={(e)=>{sp(e)}}
            onMouseEnter={(e)=>{sp(e);props.readonly?null:color(3)}}  
            onMouseLeave={(e)=>{sp(e);props.readonly?null:color(stablenum)}}  
            onClick={(e)=>{sp(e);if(props.readonly) return ;stablenum = 3; props.on?.(stablenum); }}>
        <img id={"s3_"+props.id} style={{transform:"scale(0.8)", transition:"all 0.2s ease-out", height:h, width:30, opacity:opacities[2] }} 
        src={starimgs[2]} /></f-cc>

        <f-cc style={{height:h, width:w, cursor:"pointer"}}
        onMouseDown={(e)=>{sp(e)}} onMouseUp={(e)=>{sp(e)}}  onTouchStart={(e)=>{sp(e)}} onTouchEnd={(e)=>{sp(e)}}
            onMouseEnter={(e)=>{sp(e);props.readonly?null:color(4)}}  
            onMouseLeave={(e)=>{sp(e);props.readonly?null:color(stablenum)}}  
            onClick={(e)=>{sp(e);if(props.readonly) return ;stablenum = 4; props.on?.(stablenum); }}>
        <img id={"s4_"+props.id} style={{transform:"scale(0.8)", transition:"all 0.2s ease-out", height:h, width:30, opacity:opacities[3] }} 
        src={starimgs[3]}/></f-cc>

        <f-cc style={{height:h, width:w, cursor:"pointer"}}
        onMouseDown={(e)=>{sp(e)}} onMouseUp={(e)=>{sp(e)}}  onTouchStart={(e)=>{sp(e)}} onTouchEnd={(e)=>{sp(e)}}
            onMouseEnter={(e)=>{sp(e);props.readonly?null:color(5)}}  
            onMouseLeave={(e)=>{sp(e);props.readonly?null:color(stablenum)}}  
            onClick={(e)=>{sp(e);if(props.readonly) return ;stablenum = 5; props.on?.(stablenum);}}>
        <img id={"s5_"+props.id} style={{transform:"scale(0.8)", transition:"all 0.2s ease-out", height:h, width:30, opacity:opacities[4] }} 
        src={starimgs[4]} /></f-cc>

        {props.emoji?<f-cc style={{height:h, width:w, cursor:"pointer"}}
        onMouseDown={(e)=>{sp(e)}} onMouseUp={(e)=>{sp(e)}} 
            onMouseEnter={(e)=>{sp(e);props.readonly?null:color(5)}}  
            onMouseLeave={(e)=>{sp(e);props.readonly?null:color(stablenum)}}  
            onClick={(e)=>{sp(e);if(props.readonly) return ;stablenum = 5; props.on?.(stablenum); }}>
        <img style={{height:h, width:h, marginTop:2 }} src={global.cdn("/files/emoji/😍.png")} /></f-cc>:null}

        {props.showrank?<><sp-3/><span style={{color:props.fontColor||"white", fontSize:props.fontSize||10, 
        verticalAlign:"middle", marginBottom:-2}}>({ranktext})</span></>:null}

</f-c>
}