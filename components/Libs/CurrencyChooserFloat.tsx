import WindowFloat from './WindowFloat'
import PayConfig from '../PayConfig';
import Flag from './Flag'
export default (props) => {
  const P = PayConfig();

  var changecur = async (unitkey) => {
    let json = await (await fetch("/api/user/changecur", {
      method: "POST",
      body: JSON.stringify({
        newunit: unitkey,
        email: props.email
      })
    })).json()

    if (json.code == 0) {
      props.onchange?.(unitkey)
      props.onclose?.();
      global.reloadsession();
    }
  }

  return <WindowFloat title={lang.selcurrency} onclose={() => { props.onclose?.() }} maxWidth={310}>

    {Object.values(P.units).map(u => {
      if (!P.userallowedunits.includes(u.key)) {
        return null
      }
      return <div key={u.name}>
        <f-c class={styles.curselitem} style={{ height: 35, borderRadius: 3, cursor: "pointer", }} onClick={() => { changecur(u.key) }}>
          <sp-2 />
          <Flag ccode={u.ccode} style={{ height: 25, width: 25, margin: "0 10px" }} />
          <sp-2 />
          <span style={{ marginTop: -1, fontSize: 12 }}>{u.name + " (" + u.fullname + ")"}</span>
        </f-c>
        <br-xxx /></div>
    })}
  </WindowFloat>
}