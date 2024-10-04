import Link from 'next/link';
import FindEmojies from './FindEmojies';

function findHashTags(sentence) {
  if(!sentence)
    {
      return  { single: [], double: [] }
    }
  const regex = /(?:^|\s)(#[\p{L}\p{Mn}\p{Pc}\p{Nd}_]+)|(?:^|\s)(##[\p{L}\p{Mn}\p{Pc}\p{Nd}_]+)/gu;
  const matches = sentence.match(regex);
  const hashTags = { single: [], double: [] };
  if (matches) {
    matches.forEach(match => {
      const trimmedMatch = match.trim();
      if (trimmedMatch.startsWith("##")) {
        hashTags.double.push(trimmedMatch);
      } else {
        hashTags.single.push(trimmedMatch);
      }
    });
  }
  return hashTags;
}

export default (sentence, style?, unqid?) => {
  let tags = findHashTags(sentence)
  let emojies = FindEmojies(sentence)
  let uniquekey = new Date().getTime() + Math.random() * 1000;
  let retobj = sentence

  tags.single.sort((a,b)=> b.length - a.length)
  tags.double.sort((a,b)=> b.length - a.length)

  for (let emoji of emojies) {
    let array = retobj
    let text: string = emoji as string
    var arr = array;
    if (typeof arr == "string") {
      arr = [array]
    }

    var temparr = [];
    for (let a = 0; a < arr.length; a++) {
      var x = arr[a];
      if (typeof x == "string" && x.includes(text)) {
        var p = x.split(text)
        for (let i = 0; i < p.length; i++) {
          temparr.push(p[i])
          if (p.length - 1 != i) {
            temparr.push(<img key={unqid + "_" + uniquekey++} src={global.cdn("/files/emoji/") + emoji + ".png"}  alt={emoji as any}
              style={{ width: 17, height: 17, display: "inline-block", verticalAlign: "middle", margin: "0 2px" }} />)
          }
        }
      }
      else {
        temparr.push(x)
      }
    }
    retobj = temparr
  }


  for (let tag of tags.double) {
    let array = retobj
    let text = tag
    let onlytag = text.replace(/#/g, "").replace(/_+/g, "-").replace(/\s+/, "-")
    var arr = array;
    if (typeof arr == "string") {
      arr = [array]
    }

    var temparr = [];
    for (let a = 0; a < arr.length; a++) {
      var x = arr[a];
      if (typeof x == "string" && x.includes(text)) {
        var p = x.split(text)
        for (let i = 0; i < p.length; i++) {
          temparr.push(p[i])
          if (p.length - 1 != i) {
            temparr.push(<a key={unqid + "_" + uniquekey++} href={global.root + "/e/t/" + onlytag}
              style={{ color: "#4E256F", ...style }} onClick={() => {
                document.getElementById("wind").scrollTo({
                  top: 0,
                  behavior: 'smooth' // This creates a smooth scrolling effect, omit for instant scroll
                });
              }}>{text}</a>)
          }
        }
      }
      else {
        temparr.push(x)
      }
    }
    retobj = temparr
  }




  for (let tag of tags.single) {
    let array = retobj
    let text = tag
    let onlytag = text.replace(/#/g, "").replace(/_+/g, "-").replace(/\s+/, "-")
    var arr = array;
    if (typeof arr == "string") {
      arr = [array]
    }

    var temparr = [];
    for (let a = 0; a < arr.length; a++) {
      var x = arr[a];
      if (typeof x == "string" && x.includes(text)) {
        var p = x.split(text)
        for (let i = 0; i < p.length; i++) {
          temparr.push(p[i])
          if (p.length - 1 != i) {
            let isexplore = false;
            if (typeof window != "undefined")
              isexplore = window.location.pathname.includes("/e/") || window.location.pathname.includes("/explore");
            else
              isexplore = global.user.path.includes("/e/") || global.user.path.includes("/explore");

            temparr.push(<a key={unqid + "_" + uniquekey++} href={global.root + (isexplore ? "/e/t/" : "/") + onlytag} style={{ ...style }}>{text}</a>)
          }
        }
      }
      else {
        temparr.push(x)
      }
    }
    retobj = temparr
  }

  return retobj

}