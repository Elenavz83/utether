export default ()=>{
  if (!global.QSON) {
    global.QSON = {
      stringify: (obj) => JSON.stringify(obj),
      parse: (str) => JSON.parse(str)
    }
  }
}