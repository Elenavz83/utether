import { useState, useEffect } from 'react';
import Upload from './Upload';
import FirstTimeComponentLoad from './FirstTimeComponentLoad';


export default (props: {
    readOnly?: boolean,
    placeholder?: string,
    isMobile?: boolean,
    onfileadd?: (boolean) => void,
    on?: (v: {
        text: string,
        files: string[],
    }) => void,
    id?: string
}) => {
    var [state, setState] = useState({ text: '', uploadurls: [] })
    // var [txt, setTxt] = useState('');
    // var [urls, setURLs] = useState([]);

    var ctrl = false;
    var alt = false

    useEffect(() => {
        if (global.chatdontgodown) {
            setTimeout(() => {
                global.chatdontgodown = false
            }, 2000);
            return;
        }
        var t = document.getElementById("txt")
        var d = document.getElementById("div")
        var wind = document.getElementById("wind")
        t.scrollTop = t.scrollHeight;

        if (state.uploadurls.length == 0) {
            state.uploadurls = global.uploaders[props.id || "chat"].statuses
        }
        t.style.height = '1rem';
        t.style.height = (t.scrollHeight) + 'px';

        window.scrollTo({ left: 0, top: document.body.scrollHeight });
        wind.scrollTop = wind.scrollHeight;

        d.style.height = (t.scrollHeight + (state.uploadurls.length > 0 ? 80 : 0)) + "px";
        FirstTimeComponentLoad(() => {
            setTimeout(() => {
                window.scrollTo({ left: 0, top: document.body.scrollHeight });
                wind.scrollTop = wind.scrollHeight;
            }, 500);
            setTimeout(() => {
                window.scrollTo({ left: 0, top: document.body.scrollHeight });
                wind.scrollTop = wind.scrollHeight;
            }, 1500);
        })
    })







    return <div style={{
        position: "fixed", display: "flex", justifyContent: "center", marginTop: 5,
        bottom: 15, left: 0, width: "100%", zIndex: 4,
    }}>

        <div style={{
            position: "absolute", width: "100%", maxWidth: "59rem",
            height: state.uploadurls.length > 0 ? 120 : 40, bottom: -20, backgroundColor: "#dadada", zIndex: 0
        }}></div>

        <div id="div" className={styles.divsend} style={{
            position: "relative", maxWidth: "49rem",
            maxHeight: (state.uploadurls.length == 0 ? "8rem" : "calc(8rem + 80px)")
        }}>

            <textarea
                readOnly={props.readOnly}
                disabled={props.readOnly}
                placeholder={props.placeholder}
                style={{
                    width: "calc(100% - 6px)",
                    margin: "1px 3px 0px 3px",
                    textAlign: props.readOnly ? "center" : null,
                    direction: lang.dir,
                    fontFamily: "inherit",
                    padding: state.uploadurls.length == 0 ? (lang.dir == "ltr" ? "8px 40px 8px 8px" : "8px 8px 8px 40px") : null,

                }}
                className={styles.txtsend} id="txt" dir="auto" spellCheck={false} defaultValue={state.text}
                onClick={() => {
                    var gray = document.getElementById("gray")
                    setTimeout(() => {
                        gray.scrollTop = gray.scrollHeight;
                        window.scrollTo({ left: 0, top: document.body.scrollHeight });
                    }, 500);
                    setTimeout(() => {
                        gray.scrollTop = gray.scrollHeight;
                        window.scrollTo({ left: 0, top: document.body.scrollHeight });
                    }, 700);
                    setTimeout(() => {
                        gray.scrollTop = gray.scrollHeight;
                        window.scrollTo({ left: 0, top: document.body.scrollHeight });
                    }, 1000);
                    setTimeout(() => {
                        gray.scrollTop = gray.scrollHeight;
                        window.scrollTo({ left: 0, top: document.body.scrollHeight });
                    }, 2000);
                }}
                onKeyDown={(e) => {
                    if (e.ctrlKey) {
                        ctrl = true;
                    }
                    if (e.altKey) {
                        alt = true;
                    }
                    if (e.key == "Enter" && !alt && !ctrl && state.text.trim().length > 0) {
                        if (props.isMobile) {
                            return
                        }
                        document.getElementById("txt").value = "";
                        props.on?.({
                            text: state.text.trim(),
                            files: state.uploadurls
                        });
                        e.preventDefault();

                        setState({ uploadurls: [], text: "" })
                        global.uploaders["chat"]?.clear();
                        return;
                    }
                }}
                onKeyUp={(e) => {
                    if (e.ctrlKey) {
                        ctrl = false;
                    }
                    if (e.altKey) {
                        alt = false;
                    }
                    if (e.key == "Enter" && !alt && !ctrl && state.text.trim().length > 0)
                        return
                    setState({ ...state, text: e.target.value })
                }} />




            {props.readOnly ? null : <div style={{
                position: "absolute",
                right: lang.dir == "ltr" ? 0 : null,
                left: lang.dir == "rtl" ? 0 : null,
                bottom: 1,

            }}>
                {state.text.length == 0 ? <div style={{ opacity: 0.5, cursor: "pointer", padding: "8px 10px 0px 10px", }}
                    onMouseDown={() => { uploaders[props.id || "chat"].open() }}>

                    <img src={global.cdn("/files/attachment.svg")} style={{ width: 26, height: 28, marginBottom: -1 }} />
                </div> :

                    <c-cc style={{ cursor: "pointer", padding: "5px 10px" }}
                        onClick={(e) => {
                            if (state.text.trim().length > 0) {
                                document.getElementById("txt").value = "";
                                e.preventDefault();
                                uploaders[props.id || "chat"].clear()
                                setState({ uploadurls: [], text: "" })
                                props.on?.({
                                    text: state.text,
                                    files: state.uploadurls
                                });
                                document.getElementById("txt").focus()
                            }
                        }}>

                        <img src={global.cdn("/files/send.svg")} style={{ width: 28, height: 28, transform: "rotate(180deg)" }} />
                    </c-cc>}
            </div>}

            {true ? <>
                <br-x />
                <f-c style={{
                    border: "#c2c2c2 solid 0.5px",
                    padding: "10px 40px 3px 10px",
                    borderRadius: 0,
                }}>
                    <Upload
                        id={props.id || "chat"}
                        on={(st) => {
                            props.onfileadd?.(st.length > 0)
                            setState({ ...state, uploadurls: st.map(ss => ss.url) })
                        }}
                        marginLeft={5}
                    /></f-c>
            </> : null}
        </div>
    </div>
}