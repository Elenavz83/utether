import { useEffect, createRef, CSSProperties } from 'react';

export default (props:{
  value?:string,
  defaultValue?:string,
  type?:string,
  id?:string,
  title?:string,
  direction?:string,
  style?:CSSProperties,
  sup?:string,
  lefticon?:any,
  ilm?:number |string,
  nolefticonrotate?:boolean,
  onlefticon?:()=>void,
  deltxt?:string,
  on?:(string)=>void,
  padding?:number | string,
  margin?:number |string,
  fontSize?:number | string,
  txtdir?:string,
  textAlign?:string,
  dir?:string,
  readOnly?:boolean,
  placeholder?:string,
  onenter?:()=>void,
  onclick?:()=>void,
  onrighticon?:()=>void,
  righticon?:any,
  righttext?:string,
  norighticonrotate?:boolean,
  sr?:number
}) => {
  var defaultValue = null;
  var inp = createRef<HTMLInputElement>();
  if (typeof props.value != "undefined") {
    defaultValue = props.value
  }
  if (typeof props.defaultValue != "undefined") {
    defaultValue = props.defaultValue
  }

  let selected = false;

  if (props.type == "currency" && defaultValue && (defaultValue.length > 0 || defaultValue > 0)) {
    var num = parseFloat(defaultValue.toString().split(",").join(""));
    if (isNaN(num)) {
      defaultValue = "0";
    }
    else {
      defaultValue = num.toLocaleString("en-US")
    }
  }

  useEffect(() => {
    if (typeof window != "undefined") {
      setTimeout(() => {
        let inp = document.getElementById(props.id ? props.id : props.title) as HTMLTextAreaElement
        if (inp)
          inp.defaultValue = defaultValue || ""
      }, 300);
    }
  });

  return <div style={{ width: "100%", marginTop: 5, fontSize: 12, direction: props.direction as any, ...props.style }}>
    {props.title}<sup style={{ fontSize: 8 }}>{props.sup}</sup>
    <div style={{ display: "flex", alignItems: "center", marginTop: 3 }}>
      {typeof props.lefticon == "string" ? <><img style={{
        cursor: "pointer", width: 28, height: 28,
        display: "inline-block", verticalAlign: "middle", transform: (props.dir || lang.dir) == "rtl" && !props.nolefticonrotate ? "scaleX(-1)" : null,
        marginLeft: props.ilm, marginRight: props.ilm
      }} src={global.cdn(props.lefticon)}
        alt="" onClick={() => { props.onlefticon?.() }} />&nbsp;</> : props.lefticon}
      {props.deltxt ? <img className={styles.hover} src={global.cdn("/files/close.svg")} style={{
        width: 18, height: 18,
        position: "absolute", left: lang.dir == "rtl" ? 18 : null, right: lang.dir == "ltr" ? 18 : null
      }} onClick={() => {
        let inp = document.getElementById(props.id ? props.id : props.title)
        inp.value = "";
        props.on?.("");
      }} /> : null}
      <textarea rows={1}
        inputMode={(props.type == "currency" ? "numeric" : (props.type))as any}
        autoComplete={"off"}
        style={{
          ["-webkit-text" + "-security"]: props.type == "password" ? "circle" : null,
          fontFamily: "inherit", width: "calc(100% - 0px)", padding: props.padding || "0 5px",
          margin: props.margin || "0 0px", direction: (props.txtdir || props.dir || "inherit") as any, borderRadius: props.style?.borderRadius || 5
          , fontSize: props.fontSize, textAlign: props.textAlign as any, height: props.style?.height || 35,
          resize: "none", paddingTop: 8, overflow: "hidden", whiteSpace: "nowrap",
          overflowX: "scroll"
        }}
        id={props.id ? props.id : props.title} key={defaultValue + "key"}
        defaultValue={props.readOnly ? undefined : (defaultValue || "")}
        readOnly={props.readOnly}
        value={props.readOnly ? defaultValue : undefined}
        disabled={props.readOnly}
        className={styles.txt3} spellCheck={false}
        placeholder={props.placeholder}
        onKeyDown={(e) => {
          if (e.code == "Enter" || e.code == "NumpadEnter" || e.key == "Enter") {
            props.onenter?.()
          }
        }}
        onChange={(e) => {
          if (props.type == "currency") {
            if (e.target.value.length > 0) {
              var num = parseFloat(e.target.value.split(",").join(""));
              if (isNaN(num)) {
                e.target.value = "";
                return;
              }
              if (e.target.value.endsWith(".")) {
                return
              }
              e.target.value = num.toLocaleString("en-US")
            }
          }
          props.on ? props.on(e.target.value) : null;
        }}
        onBlur={() => { selected = false }}
        onClick={(e) => {
          props.onclick?.();
          if (!selected)
            e.target.select();
          selected = true;
          setTimeout(() => { e.target.scrollIntoView({ behavior: 'smooth', block: "center" }); }, 300)
        }}
      />
      {typeof props.righticon == "string" ? <>&nbsp;<img style={{
        cursor: "pointer", width: (props.sr + 5) || 35, height: props.sr || 30,
        transform: (props.dir || lang.dir) == 'rtl' && !props.norighticonrotate ? "scaleX(-1)" : null
      }} src={global.cdn(props.righticon)} alt="" onClick={() => props.onrighticon?.()} /></> :
        props.righticon}
      {props.righttext ? <span>{props.righttext}</span> : null}
    </div>
  </div>
}