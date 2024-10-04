import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  


  return (
    <div style={{ direction: "ltr", minHeight: "11vh"}}>
      <br-x />
      <Window title={"tether"} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre> */}
        <br-xxx/>
        <div style={{width:"100%", height:45, backgroundColor:"#A3C9B7", textAlign:"center"}}>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
          
          <span>

            Price : {props.price} T
            
          </span>
        </div>

        <br-xxx/>
        <div style={{width:"100%", height:45, backgroundColor:"#A3C9B7", textAlign:"center"}}>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
          
          <span>

          Diff24h : {props.diff24h} %
            
            
          </span>
        </div>


        <br-xxx/>
        <div style={{width:"100%", height:45, backgroundColor:"#A3C9B7", textAlign:"center"}}>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
          
          <span>

            Diff7d : {props.diff7d} %
            
          </span>
        </div>
        <br-xxx/>

        <div style={{width:"100%", height:45, backgroundColor:"#A3C9B7", textAlign:"center"}}>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
        <br-xxx/>
          
          <span>

            Diff30d : {props.diff30d} %
            
          </span>
        </div>
      </Window>
    </div>
  )
}



export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

    let elena =await (await fetch("https://api.tetherland.com/currencies")).json()

    let price = elena.data.currencies.USDT.price
    let diff24h = elena.data.currencies.USDT.diff24d
    let diff7d = elena.data.currencies.USDT.diff7d
    let diff30d = elena.data.currencies.USDT.diff30d





  return {
    props: {
      data: global.QSON.stringify({
        session,
        price,
        diff24h,
        diff7d,
        diff30d,
        // nlangs,
      })
    },
  }
}