import { useState } from "react";
import TextBox from "./TextBox";
import WindowFloat from "./WindowFloat";
import Icon2Titles from "./Icon2Titles";

export default (props) => {

    let items = props.items
    let selectedinit = {};
    for (let k of props.selectedvalues) {
        let its = items.find(it => it.name == k || it.value == k)
        if(!its)
        {
            its = items.find(it => JSON.stringify(it.value) == JSON.stringify(k))
        }
        if (its)
            selectedinit[its?.name] = its.value
    }
    let [state, setState]: [any, any] = useState({ selectedsyms: selectedinit })

    if (((!state.searchedsyms) || state.searchedsyms.length == 0)) {
        state.searchedsyms = [...items.filter(s => state.selectedsyms[s.name])]
        for (let ss of items.slice(0, Math.min(10, items.length))) {
            if (!state.searchedsyms.find(s => s.value == ss.value)) {
                state.searchedsyms.push(ss)
            }
        }
    }
    else {
        let selecteds = state.searchedsyms.filter(s => state.selectedsyms[s.name])
        let notselecteds = state.searchedsyms.filter(s => !state.selectedsyms[s.name])
        state.searchedsyms = [...selecteds, ...notselecteds]
    }


    return <WindowFloat title={lang.choose} style={{ maxHeight: 400, maxWidth: 400 }} onclose={() => { props.onclose?.() }}>
        <TextBox placeholder={lang.search} deltxt on={(txt) => {
            if (txt == "") {
                if (Object.keys(state.selectedsyms).length > 0) {
                    state.searchedsyms = items.filter((s, i) => state.selectedsyms[s.name])
                }
                else {
                    state.searchedsyms = items.filter((_, i) => i < 10)
                }

                let i = 0;
                while (i <= items.length - 1 && (state.searchedsyms.filter(s => !state.selectedsyms[s.name])).length < 15) {
                    if (!state.selectedsyms[items[i].name]) {
                        state.searchedsyms.push(items[i])
                    }
                    i++;
                }
            }
            else {
                state.searchedsyms = items.filter(s => (s.name.toLowerCase().startsWith(txt.toLowerCase()))).filter((_, i) => i < 30)
            }
            setState({ ...state })
        }} />
        <br-xx />
        <div style={{ maxHeight: 300, overflow: "scroll" }}>
            {state.searchedsyms?.map?.((sym, i) => {
                let s = sym;
                return <div key={s.name}>
                    <Icon2Titles title1={s.name} style={{ backgroundColor: state.selectedsyms[s.name] ? "#a8b77e" : "#d0d6bf" }}
                        image={state.selectedsyms[s.name] ? global.cdn("/files/ok.svg") : s.icon}
                        on={async () => {
                            if (state.selectedsyms[s.name]) {
                                if (props.asktoremove) {
                                    if (await confirmer(lang.delete, lang.delconf)) {
                                        props.onremoveitem?.(s.value)
                                        delete state.selectedsyms[s.name]
                                    }
                                    else {
                                        return;
                                    }
                                }
                                else {
                                    props.onremoveitem?.(s.value)
                                    delete state.selectedsyms[s.name]
                                }

                            }
                            else {
                                props.onadditem?.(s.value)
                                state.selectedsyms[s.name] = s.value
                            }
                            props.on?.(Object.values(state.selectedsyms))
                            setState({ ...state })
                        }}
                    />
                    <br-xxx />
                </div>
            })}
        </div>

    </WindowFloat>
}