import { useState } from 'react';
import CountryList from './CountryList';
import Bold from './Bold';

export default (props:{defaultCChar?:string,
  title?:string,
  sup?:string,
  defaultPhone?:string,
  onccode:(string)=>void,
  oncchar:(string)=>void,
  readOnly?:boolean,
  onok?:()=>void,
  on?:(string)=>void,
  id:string,
  placeholder?:string,
  clist:{title:string, title2:string,}

 }) => {
  var [countries, setCountries] = useState(null);
  var [clist, setClist] = useState(false);
  var [ccode, setCCode] = useState(props.defaultCChar ? props.defaultCChar?.toLowerCase?.() : "us");

  //var cntx = localStorage.getItem("countries");
  var country = null;
  if (typeof window != "undefined") {
    if (!window.countries) {
      var getCountries = async () => {
        window.countries = await (await fetch(global.cdn("/files/countries.json"))).json();
        setCountries(window.countries)
      }
      getCountries();
    }
    else {
      if (!countries) {
        countries = window.countries
      }
    }
    var country:any = window.countries ? Object.values(countries).filter(c => (c as any).code.toLowerCase() == ccode.toLowerCase())[0] : null;

  }


  return <>

    {clist ? <CountryList countries={window.countries} title={props.clist.title} searchtitle={props.clist.title2} placeholder="Example: +1"
      on={(cc) => { setCCode(cc); props.onccode ? props.onccode(countries[cc].dialCode) : null; props.oncchar ? props.oncchar(countries[cc].code) : null }}
      onclose={() => { setClist(false) }} /> : null}

    <div style={{ width: "100%", marginTop: 5, fontSize: 12, }}>
      <Bold>{props.title}</Bold><sup style={{ fontSize: 8 }}>{props.sup}</sup>
      <div style={{ display: "flex", alignItems: "center", marginTop: 3,direction:"ltr" }}>
        {country ? <><div style={{ width: 30, height: 20, borderRadius: 3, overflow: "hidden", cursor: "pointer" }} onClick={() => {
          setClist(true)
        }}
          dangerouslySetInnerHTML={{ __html: country.flag }}

        ></div>&nbsp;</> : "null"}
        <Bold style={{ fontSize: 15 }} onClick={() => {
          setClist(true)
        }}>{country ? country.dialCode : ""}</Bold>&nbsp;&nbsp;
        <input id={props.id ? props.id : null} defaultValue={props.defaultPhone}
         readOnly={props.readOnly} style={{ textAlign: "left", paddingLeft: 5 }}
          className={styles.txt4} type="number"
          onKeyDown={(e) => {
            if (e.code == "Enter" || e.code == "NumpadEnter" || e.key == "Enter") {
              props.onok?.();
            }
          }}
          placeholder={props.placeholder} onChange={(e) => { props.on ? props.on(e.target.value) : null }} />
      </div>
    </div></>
}