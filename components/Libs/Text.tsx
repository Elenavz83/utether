import Copy from './Copy'
import Link from 'next/link'
import AbbreviateEnd from './TextEndAbbreviation'
import Bold from './Bold'

export default (props: {
    value?: any,
    body?: any,
    text?: any,
    copy?: string,
    abbreviatemid?: number,
    abbreviatend?: number,
    bold?: boolean,
    href?: string,
    target?: string,
    nexthref?: string,
    islink?: boolean,
    vfontSize?: number,
    fontSize?: number | string,
    fontWeight?: number | string,
    on?: () => void,
    wlink?: string,
    wbold?: boolean,
    whighlight?: boolean,
    whref?: string,
    wtarget?: string,
    wnexthref?: string,
    onwlink?: () => void,
    title?: string,
    nospace?: boolean,
    image?: string,
    icon?: string,
    titlemb?: number,
    s?: number | string,
    extlink?: string,
    vmarginTop?: number | string,
    onimage?: () => void,
    imb?: number | string,
    bgcolor?:string,
    highlight?:boolean,
    vdir?:string,
    tmb?:number | string,
    valuecolor?:string,
    journal?:boolean,
    onhelp?:()=>void,
}) => {

    var value = null;
    let textstring = true
    if (typeof props.value != "undefined") {
        value = props.value
    }
    if (typeof props.body != "undefined") {
        value = props.body
    }
    if (typeof props.text != "undefined") {
        value = props.text
    }

    if (typeof value != "string") {
        textstring = false
    }

    var copy = props.copy
    if (props.abbreviatemid) {
        if (value.length > props.abbreviatemid) {
            var up = value.substr(0, (props.abbreviatemid / 2 - 3))
            var down = value.substr(value.length - (props.abbreviatemid / 2 - 3))
            value = up + "..." + down
        }
    }

    if (props.abbreviatend) {
        value = AbbreviateEnd(value, props.abbreviatend)
    }
    var text = value;

    if (props.bold) {
        text = <Bold>{text}</Bold>
    }

    if (props.href) {
        if (props.target) {
            text = <a target={props.target} href={props.href} style={{ marginBottom: 2 }}>{text}</a>
        }
        else {
            text = <a href={props.href} style={{ marginBottom: 2 }}>{text}</a>
        }
    }
    else if (props.nexthref) {
        text = <a><Link href={props.nexthref} style={{ marginBottom: 2 }}>{text}</Link></a>
    }
    else if (props.islink) {
        text = <a style={{ marginBottom: 2 }}>{text}</a>
    }

    if (textstring) {
        text = <h5 style={{ fontSize: props.vfontSize || props.fontSize, fontWeight: props.fontWeight }}
            onClick={() => { props.on ? props.on() : null }}>{text}</h5>
    }

    var wmb = 0
    var wlink = props.wlink ? <span style={{ backgroundColor: props.whighlight ? "#D0D6C6" : null, padding: "0 5px", borderRadius: 2 }}> {props.wlink} </span> : ""

    if (props.wbold) {
        wlink = <Bold>{wlink}</Bold>
    }

    if (props.whref) {
        if (props.wtarget) {
            wlink = <a target={props.wtarget} href={props.whref} style={{ marginBottom: wmb }}>{wlink}</a>
        }
        else {
            wlink = <a href={props.whref} style={{ marginBottom: wmb }}>{wlink}</a>
        }
    }
    else if (props.wnexthref) {
        wlink = <a><Link href={props.wnexthref} style={{ marginBottom: wmb }}>{wlink}</Link></a>
    }
    else {
        wlink = <a style={{ marginBottom: wmb }}>{wlink}</a>
    }

    wlink = <h5 onClick={() => { props.onwlink ? props.onwlink() : null }}>{wlink}</h5>

    return <f-c class={styles.itemalign} style={{ fontSize: props.fontSize, margin: "2px 0" }}>
        {props.title ? <span style={{ width: props.nospace ? null : lang.textw, marginBottom: props.titlemb != undefined ? props.titlemb : 0 }}>
            {props.title}</span> : null}
        {props.nospace ? <sp-3 /> : null}

        {props.image && typeof props.image == "string" ? <img style={{
            display: "inline-block", verticalAlign: "middle",
            marginLeft: lang.dir == "rtl" ? 3 : -1, marginRight: lang.dir == "rtl" ? -2 : 3,
            width: props.s || 18, height: props.s || 18, borderRadius: 4, marginBottom: props.imb, cursor: props.onimage ? "pointer" : "auto"
        }}
            src={props.image || props.icon} alt={props.title + "'s icon"}
            onClick={() => { props.onimage?.() }} /> : null}


        {props.image && typeof props.image != "string" ? props.image : null}
        <sp-4 />

        {textstring ? <span style={{
            backgroundColor: props.bgcolor ? props.bgcolor : (props.highlight ? "#d8b372" : null),
            marginTop: props.vmarginTop, direction: props.vdir as any || "inherit",
            borderRadius: 2, marginBottom: props.tmb, color: props.valuecolor,
            marginLeft: (props.image && props.bgcolor) ? 5 : 0
        }}><sp-4 />{text}<sp-4 /></span> : text}

        {props.extlink ? <><sp-4 /><img src={global.cdn("/files/extlink.svg")} alt="ext link" style={{
            display: "inline-block",
            verticalAlign: "middle", width: 9, height: 9, marginBottom: -3
        }} /></> : null}

        {copy ? <><sp-2 /><img className={styles.menubtn} style={{ width: 15, height: 15, cursor: "pointer" }} src={global.cdn("/files/copy.svg")} alt="copy"
            onClick={() => { Copy(copy); alerter(lang.copied) }} /></> : null}
        <sp-3 />{wlink}

        {props.journal ? <><sp-3 /><img src={global.cdn("/files/helpg.svg")} alt="help"
            style={{ display: "inline-block", verticalAlign: "middle", width: 14, height: 14, opacity: 0.5, cursor: "pointer" }}
            onClick={() => { props.onhelp?.() }} /></> : null}

    </f-c>
}

