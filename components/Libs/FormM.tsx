
import Component, { PageEl } from './Component';
import Icon2Titles from './Icon2Titles';
import TextEndAbbreviation from './TextEndAbbreviation'
import Window from './Window'
import WindowFloat from './WindowFloat';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

    getProps(async () => { })
    let empty = true;

    return <div><Window title={props.title} style={{}}>
        <div className={styles.gridcontainer}>

            {!props.single || props.selected.length == 0 ? <div className={styles.griditem} style={{
                backgroundColor: "#5c8e5855", borderRadius: 3,
                cursor: "pointer", transition: "all linear 0.1s"
            }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#95b587aa"}
                onMouseDown={(e) => e.currentTarget.style.backgroundColor = "#5c8e58aa"}
                onMouseUp={(e) => e.currentTarget.style.backgroundColor = "#95b587aa"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#5c8e5855"}
            >
                <f-cc onClick={() => { refresh({ form: "selected" }) }}>
                    <img src={global.cdn("/files/plus.svg")} style={{ width: 20, height: 20 }} /><sp-3 />
                    <f-11>{props.addtext}</f-11>
                </f-cc>
            </div> : null}
            {props.selected?.map(s => {
                return <div className={styles.griditem + " " + styles.hover} key={s.name}
                    style={{ backgroundColor: "#b5c9b0aa", borderRadius: 3, position: "relative", transition: "all linear 0.1s" }}
                    onClick={() => {
                        props.onitemclick?.(s)
                    }}>
                    <img className={styles.hover} src={global.cdn("/files/close.svg")} style={{
                        width: 17, height: 17, position: "absolute",
                        left: -3, top: -3
                    }} onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        props.onremoveclick?.(s)
                    }} />
                    <f-cc onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        props.onitemclick?.(s)
                    }}>
                        <img src={global.cdn(s.icon)} style={{
                            width: 20, height: 20, borderRadius: 2,
                            marginLeft: lang.dir == "rtl" ? 5 : 0,
                            marginRight: lang.dir == "ltr" ? 5 : 0
                        }} />
                        <f-11>{TextEndAbbreviation(s.name || lang.loading, 30)}</f-11><sp-2 />
                    </f-cc>
                </div>
            })}





        </div>
    </Window>



        {state.form == "selected" ? <WindowFloat title={props.title}
            style={{ maxHeight: 400, maxWidth: 400 }} onclose={() => { state.form = null; refresh() }}>
            <div style={{ maxHeight: 300, overflow: "scroll" }}>
                {props.list?.map?.(src => {
                    if(props.selected?.find(s=> s.name == src.name))
                    {
                        return null
                    }
                    empty = false;
                    return <div key={src.name}>
                        <Icon2Titles title1={src.name} style={{ backgroundColor: "#a8b77e" }}
                            image={src.icon || global.cdn("/files/app/plug.webp")}
                            on={() => {
                                if (!props.selected?.find(s => s.name == src.name)) {
                                    props.onadd?.(src)
                                    refresh({ form: null })
                                }
                            }}
                        />
                        <br-xxx />
                    </div>
                })}
                {empty?<f-cc><f-10>{"No item found"}</f-10></f-cc>:null}
            </div>

        </WindowFloat> : null}





    </div>
}