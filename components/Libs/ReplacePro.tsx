export default (array:any[] | string, text:string, obj:any):any[] =>
{
  let uniquekey = new Date().getTime();
  var arr = array;
  if(typeof arr == "string")
  {
    arr = [array as any]
  }

  var temparr = [];
  for(let a = 0; a < arr.length; a++)
  {
    var x = arr[a];
    if(typeof x == "string" && x.includes(text))
    {
     var p = x.split(text)
     for(let i = 0; i < p.length; i++) 
     {
      temparr.push(p[i])
      if(p.length - 1 != i)
      {
        temparr.push(obj)
      }
     }
    }
    else
    {
      temparr.push(x)
    }
  }
  return temparr
}