export default (text:string, maxlen:number)=> {
  if(text.length > maxlen)
  {
    var up = text.substr(0 , (maxlen/2 - 3))
    var down = text.substr(text.length - (maxlen/2 - 3))
    return up+"..."+down
  }
  return text
}