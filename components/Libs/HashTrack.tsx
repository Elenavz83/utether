import Link from 'next/link'
import Copy from './Copy'
import Bold from './Bold'

import Component, { PageEl } from './Component';
export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps):JSX.Element => {
return <div className={styles.itemalign}>
<Bold style={{width:lang.textw}}>{props.title}</Bold>
<div style={{width:"65%", display:"flex", alignItems:"flex-end"}}><Link href={props.href}><a-s>{props.body}</a-s></Link>
  &nbsp;<img src ={"/files/"+"extlink"+".svg"} alt="payment type" style={{width:9, height:11}}/>
  &nbsp;&nbsp;&nbsp;<img src ={global.cdn("/files/copy.svg")} alt="payment type" style={{width:15, height:15}} onClick={()=>{
    Copy(props.copyval||props.body)
    alerter("Hash link copied to clipboard.")
  }}/>
</div>
</div>
}