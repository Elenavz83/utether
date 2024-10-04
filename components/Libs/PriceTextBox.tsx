
export default (props:{
  on?:(number)=>void,
  fractions:number,
  readOnly?:boolean,
  title?:string,
  explain:number,
  explainstr?:string,
  unit?:string,
  onlefticon?:()=>void
  lefticon?:string,
  defaultValue?:string,
  righttext?:any
}) => {
  var region = lang.region || "en-US"
  var rand = Math.random();
  var update = (el) => {
    var amount = parseFloat(el.value.split(",").join(""));
    props.on ? props.on(amount) : null;
    document.getElementById("pricebox").innerText = amount.toLocaleString(region,
      { maximumFractionDigits: props.fractions, minimumFractionDigits: props.fractions })
  }
  return <> <div style={{ width: "100%", fontSize: 12 }}>
    {props.title} {props.explain != undefined && !props.readOnly ? <>(<span style={{ fontSize: 11 }} className={styles.smalllink}
      onClick={() => {
        var el = document.getElementById("price" + rand) as HTMLInputElement;
        el.value = props.explain.toString()
        update(el)
      }}>{props.explainstr}: {props.explain.toLocaleString(region,
        { maximumFractionDigits: props.fractions, minimumFractionDigits: props.fractions })} {props.unit}</span> )</> : null}
    <div style={{ display: "flex", alignItems: "center", marginTop: 3, }}>

      {props.lefticon ? <><img style={{ cursor: "pointer", width: 28, height: 28 }} src={global.cdn(props.lefticon)} alt=""
        onClick={() => { props.onlefticon ? props.onlefticon() : null }} /><sp-3/></> : null}


      <input id={"price" + rand} style={{
        fontFamily:"inherit",
        padding: "0 5px 0 5px",
        backgroundColor: props.readOnly ? "lightgray" : null
      }}
        className={styles.txt3}
        placeholder={props.explain ? (lang.example+ props.explain.toLocaleString(region,
          { maximumFractionDigits: props.fractions, minimumFractionDigits: props.fractions })) : null}
        readOnly={props.readOnly} defaultValue={props.defaultValue}
        disabled={props.readOnly}
        type='number'
        onKeyPress={(event) => {
          if ((!/[0-9]/.test(event.key)) && (!/\./.test(event.key))) {
            event.preventDefault();
          }
        }}

        onKeyUp={(event) => {
          if (event.currentTarget.value.length > 0) {
            setTimeout(() => {
              update(event.target);
            }, 20);
          }
        }}
      />

      <span>&nbsp;&nbsp;{props.righttext}&nbsp;</span>
    </div>
  </div>
      <br-x/>
      <br-xx/>
    <f-c>
      {lang.amount}: <f-cc style={{ color: "green", margin:"0 8px" }} id="pricebox">
         {!props.defaultValue ? (0).toLocaleString(lang.region) : parseFloat(props.defaultValue).toLocaleString(lang.region)}</f-cc>
      {props.unit}
    </f-c>

  </>

}