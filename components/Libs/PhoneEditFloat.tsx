import Bold from './Bold';
import PhoneBox from './PhoneBox';
import WindowFloat from './WindowFloat'

export default (props: {
  defaultCCode?: string, defaultCChar?: string, defaultPhone?: string,
  pattern?: string, errorstr?: string, title: string, title2: string, placeholder?: string, clist?: { title: string, title2: string, },
  on?: (v: { ccode: string, phone: string, cchar: string }) => void, onclose?: () => void, explain?: string

}) => {

  var ccode = props.defaultCCode || "+1";
  var cchar = props.defaultCChar || "US";
  var phone = props.defaultPhone || "";

  var onok = () => {
    if (props.pattern) {
      var rx = new RegExp(props.pattern)
      if (!rx.test(phone)) {
        alerter(props.errorstr)
        return;
      }
    }
    if (phone.length > 6) {
      if (phone.startsWith('0')) {
        phone = phone.slice(1);
      }
      props.on?.({ ccode: ccode, phone: phone, cchar: cchar })
    }
    else {
      alerter(props.errorstr)
    }
  }

  return <WindowFloat title={props.title} onclose={() => { props.onclose?.() }}>

    <PhoneBox
    id={"myphonebox"}
      title={props.title2}
      sup={(1).toLocaleString(lang.region)}
      defaultPhone={props.defaultPhone}
      defaultCChar={props.defaultCChar}
      placeholder={props.placeholder}
      clist={props.clist}
      onccode={(cc) => { ccode = cc }}
      oncchar={(char) => { cchar = char }}
      onok={() => onok()}
      on={(p) => {
        if (p.startsWith("0")) {
          p = p.substr(1)
        }
        phone = p
      }}

    />
    <br-x />
    <span style={{ fontSize: 11 }}>
      {props.explain}
    </span>
    <br-x />
    <div style={{ textAlign: "center", marginTop: 5, display: "flex", justifyContent: "center" }}>
      <f-cc class={styles.btnaccept} onClick={() => { onok() }} ><Bold>{lang.confirm}</Bold></f-cc> &nbsp;
    </div>
    <br-x />
  </WindowFloat>
}