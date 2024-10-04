import Router from 'next/router'
import VItem from './VItem'
import Text from './Text'
import { useState } from 'react'
import Cap from './Cap'

export default (props:{
  id:string, placeholder?:string,
  query:{cat:any, sort:any}, onsearch?:(string)=>void
  title:string,defaultValue?:string, squery:string,
}) => {
  var isopen = props.query.cat || props.query.sort
  var [cat, setCat] = useState(props.query.cat)
  var [sort, setSort] = useState(props.query.sort);
  var prevtext = ""
  var iso = false;
  if (typeof window != "undefined") {
    var body = document.getElementById("search_options_" + props.id);
    if (body?.style?.maxHeight && body?.style?.maxHeight != "0px") {
      iso = true;
    }
  }

  var toggle = () => {
    var e = document.getElementById('smenu');
    var body = document.getElementById("search_options_" + props.id);
    if (body.style.maxHeight == "0px") {
      body.style.transition = "max-height 0.5s ease";
      body.style.maxHeight = "2000px";
      body.style.marginTop = "4px";
      e.style.opacity = "1"
    }
    else {
      e.style.opacity = isopen ? "1" : "0.3"
      body.style.marginTop = "0px";
      body.style.transition = "all 0.2s cubic-bezier(0, 1, 0, 1)";
      body.style.maxHeight = "0px";
    }
  }



  return <>
    <div className={styles.searchbox}>

      <div style={{ width: "100%", marginTop: 5, padding: "0.5rem 0.5rem 0.5rem 0.5rem", fontSize: 12, fontWeight: 600 }}>
        {props.title}
        <div style={{ display: "flex", alignItems: "center", marginTop: 3 }}>
          <div style={{ display: "flex", marginTop: -0.5, cursor: "pointer", height: 28, width: 40, position: "relative" }}>
            <div id="smenu" style={{ position: "absolute", width: 50, height: 80, top: -30, paddingTop: 30, opacity: isopen || iso ? 1 : 0.3, }}
              onClick={(e) => { toggle() }}>
              &nbsp;<img src={global.cdn("/files/menucat.svg")} alt={lang.addopts} style={{ width: 28, height: 28 }}
              />&nbsp;</div></div>
          <input id="search_input" style={{ textAlign: "left", paddingLeft: 5, marginTop: 0, }} className={styles.txt3} placeholder={props.placeholder}
            onClick={(e) => { e.target.select(); e.preventDefault() }}
            type='text' defaultValue={props.defaultValue} spellCheck={false} onKeyDown={(event) => {
              var el = event.target
              if (prevtext.length > 1) {
                if (el.value.length == 1) {
                  delete Router.query.s; Router.push({ href: Router.asPath, query: Router.query });
                }
              }
              prevtext = el.value
              if (event.key == "Enter") {

                if (props.squery) {
                  if (el.value == "") {
                    delete Router.query.s; Router.push({ href: Router.asPath, query: Router.query });
                  }
                  else {
                    Router.query.s = el.value; Router.push({ href: Router.asPath, query: Router.query });
                  }
                  return;
                }

                var { explore, ...q } = JSON.parse(JSON.stringify(Router.query))
                Router.push({
                  pathname: global.root + "/" + el.value,
                  query: q
                })
                props.onsearch?.(el.value)
              }
            }
            } />
          &nbsp;<img style={{ cursor: "pointer", width: 28, height: 28 }} src={global.cdn("/files/go.svg")} alt="go for search" onClick={() => {
            var el = document.getElementById("search_input") as HTMLInputElement

            if (props.squery) {
              if (el.value == "") {
                delete Router.query.cat; Router.push({ href: Router.asPath, query: Router.query });
              }
              else {
                Router.query.s = el.value; Router.push({ href: Router.asPath, query: Router.query });
              }
              return;
            }

            var { explore, ...q } = JSON.parse(JSON.stringify(Router.query))
            Router.push({
              pathname: global.root + "/" + el.value,
              query: q
            })
            props.onsearch?.(el.value)
          }} />
        </div>
        {(cat || sort) ? <div style={{ height: 8, display: "flex", marginTop: -4 }}>
          {cat ? <><Text value={lang.category + " " + Cap(cat)} islink fontSize={10} on={() => { toggle() }} />&nbsp;&nbsp;</> : null}
          {sort ? <Text value={lang.sort + " " + Cap(sort)} islink fontSize={10} on={() => { toggle() }} /> : null}
        </div> : null}

      </div>


      <div id={"search_options_" + props.id} style={{ overflow: "hidden", maxHeight: "0px", paddingTop: 3 }}>
        <div className={styles.ft}>
          <span style={{ color: "#452700",fontSize: 12, fontWeight: 600 }}>{lang.catfilter}</span>
        </div>
        <div>
          <div className={styles.dbar} style={{ paddingTop: 5, paddingRight: 5, paddingLeft: 5, }}>
            <VItem title="Everything" icon={global.cdn("/files/all.svg")} selected={!cat} on={() => { if (!cat) { toggle(); return } delete Router.query.cat; Router.push({ href: Router.asPath, query: Router.query }); setCat(null) }} />
            <VItem title="Softwares" icon={global.cdn("/files/code.svg")} selected={cat == 'software'} on={() => { if (cat == 'software') { toggle(); return } Router.query.cat = 'software'; Router.push({ href: Router.asPath, query: Router.query }); setCat('software') }} />
            <VItem title='Data &amp; APIs' icon={global.cdn("/files/data.svg")} selected={cat == 'data'} on={() => { if (cat == 'data') { toggle(); return } Router.query.cat = 'data'; Router.push({ href: Router.asPath, query: Router.query }); setCat('data') }} />
            <VItem title="Learnings" icon={global.cdn("/files/book.svg")} selected={cat == 'learn'} s={45} on={() => { if (cat == 'learn') { toggle(); return } Router.query.cat = 'learn'; Router.push({ href: Router.asPath, query: Router.query }); setCat('learn') }} />
          </div>
          <div className={styles.dbar} style={{ paddingTop: 5, paddingRight: 5, paddingLeft: 5, }}>
            <VItem title="Device" icon={global.cdn("/files/device.svg")} s={46} selected={cat == 'device'} on={() => { if (cat == 'device') { toggle(); return } Router.query.cat = 'device'; Router.push({ href: Router.asPath, query: Router.query }); setCat('device') }} />
            <VItem title="News" icon={global.cdn("/files/news.svg")} selected={cat == 'news'} on={() => { if (cat == 'news') { toggle(); return } Router.query.cat = 'news'; Router.push({ href: Router.asPath, query: Router.query }); setCat('news') }} />
            <VItem title='Q/A' icon={global.cdn("/files/qa.svg")} s={45} selected={cat == 'qa'} on={() => { if (cat == 'qa') { toggle(); return } Router.query.cat = 'qa'; Router.push({ href: Router.asPath, query: Router.query }); setCat('qa') }} />
            <VItem title="Others" icon={global.cdn("/files/more.svg")} selected={cat == 'other'} s={45} on={() => { if (cat == 'other') { toggle(); return } Router.query.cat = 'other'; Router.push({ href: Router.asPath, query: Router.query }); setCat('other') }} />
          </div>
        </div>
        <br-x />
        <div className={styles.ft}>
          <span style={{ color: "#452700", fontSize: 12, fontWeight: 600 }}>{lang.howtosort}</span>
        </div>
        <div className={styles.dbar} style={{ paddingTop: 5, paddingRight: 5, paddingLeft: 5, }}>
          <VItem title="Latest" icon={global.cdn("/files/clock.svg")} s={45} selected={!sort} on={() => { if (!sort) { toggle(); return } delete Router.query.sort; Router.push({ href: Router.asPath, query: Router.query }); setSort(null) }} />
          <VItem title="Cheapest" icon={global.cdn("/files/cheapest.svg")} s={45} selected={sort == 'cheapest'} on={() => { if (sort == 'cheapest') { toggle(); return } Router.query.sort = 'cheapest'; Router.push({ href: Router.asPath, query: Router.query }); setSort('cheapest') }} />
          <VItem title='Populars' icon={global.cdn("/files/stars.svg")} s={45} selected={sort == 'populars'} on={() => { if (sort == 'populars') { toggle(); return } Router.query.sort = 'populars'; Router.push({ href: Router.asPath, query: Router.query }); setSort('populars') }} />
        </div>
        <br-xx />

      </div>

    </div>
  </>

}