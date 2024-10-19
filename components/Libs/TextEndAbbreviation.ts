export default (text:string, maxlen:number)=> {
  if(text?.length > maxlen)
  {
    var up = text.substr(0 , maxlen - 3)
    return up+"..."
  }
  return text+" "
}