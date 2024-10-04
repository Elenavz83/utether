import WindowFloat from './WindowFloat';
import Icon2Titles from './Icon2Titles';

export default (props)=>{
    return <WindowFloat title={lang.selectwallet} onclose={() => {props.onclose?.()}}>
    {Object.keys(global.user.wallets).map(k => {
      if(!global.user.wallets[k].donations || global.user.wallets[k].donations.length == 0)
      {
        return null;
      }
      let wallet = global.user.wallets[k];
      let unit = wallet.unit;
      let amount = unit.tolocalstr(wallet?.balance);
      return <Icon2Titles
        style={{backgroundColor:props.current == k?"#d6deb3":"#e9d8b9", marginBottom:3}}
        title1={wallet.name}
        title2={lang.balance +": "+ amount +" "+ unit.name}
        image={wallet?.image} 
        on={()=>{props.on?.(k)}}
        />
    })}

  </WindowFloat>
}