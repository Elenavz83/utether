import { CSSProperties } from 'react'
import Bold from './Bold'

export default (props:{
  title1?:any, title2?:any, title3?:any, price1?:any, unbold?:boolean, nobold?:boolean,
  icon?:any, image?:any,bgtransparent?:boolean, mb?:number, style?:CSSProperties,
  on?:()=>void,onclose?:()=>void, special?:any, specialcolor?:string, specialtextcolor?:string,image2?:string,
  roundicon?:boolean, unit1?:any, righticons?:any,lineHeight?:string|number, 

}) => {
  var alt = "icon"
  if (props.title1) {
    alt = typeof props.title1 == "string" ? (props.title1.toLowerCase() + "'s icon") : "object's icon"
  }
  else if (props.price1) {
    alt = "price " + props.price1 + "'s icon"
  }

  let unbold = props.nobold || props.unbold;

  let title1 = null
  let title2 = null
  let title3 = null

  if (typeof props.title1 == "string") {
    title1 = <h1>{unbold ? props.title1 : <Bold>{props.title1}</Bold>}</h1>
    // title1 = <f-13>{unbold ? props.title1 : <Bold>{props.title1}</Bold>}</f-13>
  }
  else {
    title1 = props.title1
  }

  if (typeof props.title2 == "string") {
    title2 = <h2>{props.title2}</h2>
  }
  else {
    title2 = props.title2
  }

  if (typeof props.title3 == "string") {
    title3 = <h3>{props.title3}</h3>
  }
  else {
    title3 = props.title3
  }


  let icon = props.icon || props.image


  return <f-csb class={props.bgtransparent ? styles.ic3t : styles.ic3} onClick={() => { props.on?.() }}
    style={{ marginBottom: props.mb, width: "100%", ...props.style }} >

    <f-c >

      <ic-3>
        {props.image2 ? <f-c style={{ position: "absolute", bottom: 0, left: 32, backgroundColor: "#D7DCC6", borderRadius: 3, padding: "2px 2px" }}>
          <img src={global.cdn(props.image2)} style={{ width: 18, height: 18 }} />
        </f-c> : null}
        {typeof icon == "string" ? <img src={global.cdn(icon)} alt={alt} style={{
          borderRadius: props.roundicon ? "50%" : 4,
          width: 50, height: 50
        }} /> : icon}
        {props.special ? <ic3-sp style={{ backgroundColor: props.specialcolor, color: props.specialtextcolor }}>
          <Bold>{props.special}</Bold></ic3-sp> : null}
      </ic-3>
      <sp-3 />

      <c-xsb style={{ margin: props.unit1 ? "2px 0" : null, minHeight: 55 }}>
        {!props.unit1 && props.title1 ? title1 : null}

        {props.unit1 != undefined ? <h1><Bold>
          <span style={{ fontSize: 13, lineHeight: props.lineHeight || 0, }}>
            <span>{props.title1 == "0" ? "0.00" : props.title1}</span>
            &nbsp;{props.unit1}</span></Bold></h1> : null}

        {props.unit1 ? <f-10>{props.title2}</f-10> : null}
        {!props.unit1 && props.title2 ? title2 : null}
        {props.title3 ? title3 : null}
      </c-xsb>

    </f-c>
    {props.righticons || props.onclose ? <f-cse style={{
      borderTopRightRadius: 5, borderBottomRightRadius: 5,
      paddingLeft: lang.dir == "rtl" ? 20 : null,
      paddingRight: lang.dir == "ltr" ? 20 : null,
      height: 40
    }} >
      {props.righticons}

      {props.onclose ? <img className={styles.menubtn} src={global.cdn("/files/close.svg")} style={{ width: 20, height: 20 }}
        onClick={() => { props.onclose?.() }} /> : null}
    </f-cse> : null}

  </f-csb>
}