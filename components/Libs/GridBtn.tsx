import { Grid } from "@mui/material";
import Component, { PageEl } from '../Libs/Component';
export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps):JSX.Element => {
    return <Grid item xs={1} sm={1} md={1} style={{ padding: 2, ...props.style }}>
    <f-ce class={styles.hover} style={{ backgroundColor: props.active ? "#d8b372" : "#e9d8b9", borderRadius: 3, padding: 3 }}
      onClick={()=>props.on?.()}>
      <img src={global.cdn(props.image)} style={{ width: 25, height: 20, borderRadius:10 }} />
      <sp-3 /><span style={{ verticalAlign: "middle", width: 120, fontWeight: props.bold?600:null }}>{props.title}</span><sp-4 />
    </f-ce>
  </Grid>
}