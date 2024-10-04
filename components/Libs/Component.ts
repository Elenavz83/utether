import { useState } from 'react'

export type PageEl = (props: { [key in any]: any }, state: { [key in any]: any }, refresh: (object?: { [key in any]: any }) => void, getProps: (callback: () => Promise<void>) => void) => JSX.Element

const convertor = (props: any, Page: PageEl) => {
  let [state, setState] = useState({ loaded: false, })
  let [r, setR] = useState(0)
  const setst = (obj) => {

    if (obj) {
      Object.keys(obj).forEach(k => {
        state[k] = obj[k]
      })
    }
    state["kdt"] = new Date().getTime()
    setState(state)
    setR(new Date().getTime())
    // setState({ ...state, ...obj })
  }
  return Page(props, state, setst, async (func) => {
    if (!state.loaded) {
      await func();
      state["loaded"] = true
      state["kdt"] = new Date().getTime()
      setState(state)
      setR(new Date().getTime())
      // setState({ ...state, loaded: true })
    }
  })
}


export default (props: any, Page: PageEl) => {
  return convertor(props, Page)
}
