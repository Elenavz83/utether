export default (props:{
  urls?:string[],
  files?:string[],
  values?:string[],
  marginLeft?:number|string,
  s?:number,
})=> {

  var fname = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r',]
  var urls = props.urls||props.files||props.values;
  // urls.sort((a,b)=> a.at(0) - b[0])
  return  <div style={{display:"flex",marginTop:5, marginLeft:props.marginLeft}}>
    
  {urls.map((url,i)=> 
    {
      if(typeof url != "string")
      {
        return null
      }
      var p = url.split(".");
      var suffix = p[p.length - 1];
      if(url && url.length > 0)
      {
          if(url.toLowerCase().endsWith(".jpg") || url.toLowerCase().endsWith(".jpeg") || url.toLowerCase().endsWith(".png") || url.toLowerCase().endsWith(".gif")|| url.toLowerCase().endsWith(".svg")|| url.toLowerCase().endsWith(".webp"))
          {
              return <div key={fname[i]+"."+suffix} style={{position:"relative", marginRight:5, lineHeight:0.7, marginTop:-5}}>
                  <a style={{position:"relative", display:"flex", flexDirection:"column", alignItems:"center",paddingRight:5}} target="_blank" href={url}>
                  <img style={{borderRadius:5, width:props.s||40, height:props.s||40}} src={url} alt={fname[i]+"."+suffix + "'s preview"} />
                  <h5>{fname[i]+"."+suffix}</h5></a>
              </div>
          }
          else if(url.toLowerCase().endsWith(".zip") || url.toLowerCase().endsWith(".rar") || url.toLowerCase().endsWith(".dll") || url.toLowerCase().endsWith(".mp4")
                  || url.toLowerCase().endsWith(".mp3") || url.toLowerCase().endsWith(".txt")|| url.toLowerCase().endsWith(".pdf")|| url.toLowerCase().endsWith(".cs")
                  || url.toLowerCase().endsWith(".py")|| url.toLowerCase().endsWith(".js")|| url.toLowerCase().endsWith(".apk")|| url.toLowerCase().endsWith(".doc")|| url.toLowerCase().endsWith(".docx")
                  || url.toLowerCase().endsWith(".ppt")|| url.toLowerCase().endsWith(".pptx")|| url.toLowerCase().endsWith(".psd")|| url.toLowerCase().endsWith(".exe")|| url.toLowerCase().endsWith(".vtt"))
          {
            return <div key={fname[i]+"."+suffix} style={{position:"relative", marginRight:5, lineHeight:0.7, marginTop:-5}}>
                  <a style={{position:"relative", display:"flex", flexDirection:"column", alignItems:"center",paddingRight:5}} target="_blank" href={url}>
                  <img style={{borderRadius:5, width:props.s||40, height:props.s||40}} src={"/files/"+suffix+".svg"} alt={fname[i]+"."+suffix + "'s preview"} />
                  <h5>{fname[i]+"."+suffix}</h5>
                  </a>
              </div>
          }
          else if(url)
          {
            return <div key={fname[i]+"."+suffix} style={{position:"relative", marginRight:5, lineHeight:0.7, marginTop:-5}}>
            <a style={{position:"relative", display:"flex", flexDirection:"column", alignItems:"center",paddingRight:5}} target="_blank" href={url}>
            <img style={{borderRadius:5, width:props.s||40, height:props.s||40}} src={global.cdn("/files/file.svg")} alt={fname[i]+"."+suffix + "'s preview"}/>
            <h5>{fname[i]+"."+suffix}</h5></a>
            </div>
          }
      }
    })}
    </div>
}
