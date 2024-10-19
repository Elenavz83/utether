
import { useState } from 'react';

const vote = async (item, dislike = false)=>
{
    if(!dislike) //liked
    {
      if(item.liked) return
      item.likes ++;
      item.dislikes --
      if(item.likes < 0) item.likes = 0;
      if(item.dislikes < 0) item.dislikes = 0;
      item.liked = true;
      item.disliked = false;
    }
    else
    {
      if(item.disliked) return
      item.likes --;
      item.dislikes ++
      if(item.likes < 0) item.likes = 0;
      if(item.dislikes < 0) item.dislikes = 0
      item.liked = false;
      item.disliked = true;
    }
  
  fetch("/api/explore/vote",{
    method:"POST",
    body:JSON.stringify({
      like:!dislike,
      dislike:dislike,
      expid:item.expid,
    })
  }).then(async r=>{
    let json = await r.json();
    if(json.code == 0)
    {
    }
  })
}

import Component, { PageEl } from './Component';
export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps):JSX.Element => {
  var [item, setItem] = useState(props.item)
  props.item.likes = item.likes;
  props.item.dislikes = item.dislikes;
  props.item.liked = item.liked;
  props.item.disliked = item.disliked;
  
  
  var percent = 19;//props.item.likes
  var color = null
  if(percent >= 90)
  {
    color = "green"
  }
  else if(percent >= 70)
  {
    color = "#447d00"
  }
  else if(percent >= 50)
  {
    color = "#428c00"
  }


  return <f-c  style={{height:25, ...props.style}}>

  {props.notitle?null:<f-c class={styles.itemalign} style={{width:props.nospace?null:lang.textw}}><span>{lang.rank}</span></f-c>}

  <f-csb style={{fontSize:10, width:95 + ((item.dislikes+item.likes) > 1000 ? 20:0)}}>

          <f-cc style={{direction:"ltr"}}>
          <lkg-s class={item.liked?styles.nopale:null} id={item.expid+"_lg"} onClick={(e)=>
          {
            if(!global.user.loggedin)
            {
              props.loginrequired?.()
              return
            }
            e.target.className = styles.nopale
            document.getElementById(item.expid+"_lr").className = null;
            vote(item)
            setItem(JSON.parse(JSON.stringify(item)))
            props.onrefresh?.();
            props.onlike?.()
          }} /> <sp-3/><span>{(item.likes || 0).toLocaleString(lang.region)}</span>
          </f-cc>
          <f-cc style={{direction:"ltr"}}>
          <lkr-s class={item.disliked?styles.nopaler:null} id={item.expid+"_lr"} onClick={(e)=>
          {
            if(!global.user.loggedin)
            {
              props.loginrequired?.()
              return
            }
            e.target.className = styles.nopaler
            document.getElementById(item.expid+"_lg").className = null;
            vote(item, true)
            setItem(JSON.parse(JSON.stringify(item)))
            props.onrefresh?.();
            props.ondislike?.()
          }}/> <sp-3/><span>{(item.dislikes||0).toLocaleString(lang.region)}</span>
          </f-cc>
        </f-csb>


  </f-c>
}