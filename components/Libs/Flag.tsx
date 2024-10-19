import { CSSProperties, useState } from 'react';

export default (props:{ccode?:string, style:CSSProperties, onclick?:()=>{}, })=>
{
  var [countries, setCountries] = useState(null);
  if(typeof window != "undefined")
  {
    if(!window.countries)
    {
      var getCountries = async ()=>
      {
        window.countries = await (await fetch(global.cdn("/files/countries.json"))).json();
        setCountries(window.countries)
      }
      getCountries();
    }
    else {
      if(!countries)
      {
        countries = window.countries
      }
    }
  }

  var getCountry = (ccode)=>
  {
    if(typeof window != "undefined")
    {
      return window.countries?Object.values(countries).filter(c=> (c as any).code.toLowerCase() == ccode.toLowerCase())[0]:null;
    }
    return null
  }

  if(!props.ccode)
  {
    return null
  }

  if(props.ccode.length == 2)
  {
    return <f-cc style={{ cursor:props.style?.cursor, verticalAlign:"middle",display:"inline-block", borderRadius:2, width:props.style?.width||25,height:(Number(props.style.height || 0) - 2)||16,overflow:"hidden",
    marginLeft:props.style?.marginLeft, marginRight:props.style?.marginRight}} onClick={()=>{props.onclick?.()}}>
            <div dangerouslySetInnerHTML={{__html:(getCountry(props.ccode) as any)?.flag}}
                style={{display:"inline-block", verticalAlign:"middle", width:props.style?.width||25, height:props.style?.height||18, marginTop:props.style?.marginTop}}></div>
            </f-cc>
  }
  else
  {
    return <img src={global.cdn("/files/flags/")+ props.ccode+".svg"} style={{verticalAlign:"middle",display:"inline-block", borderRadius:2, width:props.style?.width||25,height:props.style?.height||25, marginLeft:props.style?.marginLeft, marginRight:props.style?.marginRight}} onClick={()=>{props.onclick?.()}}/>
  }

}