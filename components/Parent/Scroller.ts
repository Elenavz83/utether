export default ()=>{
  let startY;
  let scrollTop;
  let walked = false;
  global.isDown = false;
  let el = null;
  function mouseIsDown(e) {
    global.isDown = true;
    startY = e.pageY - global.parentdiv.offsetTop;
    scrollTop = global.parentdiv.scrollTop;
    walked = false;
  }
  function mouseUp(e) {
    global.isDown = false;
    if (global.stopscroll) {
      global.isDown = false;
      global.stopscroll = false;
      return;
    }
  }
  function mouseLeave(e) {
    global.isDown = false;
  }
  function mouseMove(e) {
    if (global.isDown) {
      try
      {
        let ttt = document.getElementById("")
        e.preventDefault();
        const y = e.pageY - global.parentdiv.offsetTop;
        const walkY = (y - startY) * 1;
        if (Math.abs(walkY) > 10) {
          walked = true;
        }
        // console.log("down:" + walkY)
        global.parentdiv.scrollTop = scrollTop - walkY
      } catch{}
    }
  }
  
  function clicked(e) {
    if (walked) {
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }
  
  global.setScroller = (elementid) => {
  
    if (typeof window != "undefined") {
      if (global.parentdiv) {
        global.parentdiv.removeEventListener("mousedown", mouseIsDown);
        global.parentdiv.removeEventListener("mouseup", mouseUp);
        global.parentdiv.removeEventListener("click", clicked, true);
        global.parentdiv.removeEventListener("mouseleave", mouseLeave);
        global.parentdiv.removeEventListener("mousemove", mouseMove);
      }
      global.parentdiv = document.getElementById(elementid);
      if (global.parentdiv) {
        global.parentdiv.addEventListener("mousedown", mouseIsDown);
        global.parentdiv.addEventListener("mouseup", mouseUp);
        global.parentdiv.addEventListener("click", clicked, true);
        global.parentdiv.addEventListener("mouseleave", mouseLeave);
        global.parentdiv.addEventListener("mousemove", mouseMove);
      }
    }
  }
  
  global.winscrollers = {}
  global.addonparentscroll = (func, key) => {
    global.winscrollers[key] = func
  }
  global.removeonparentscroll = (func, key) => {
    delete global.winscrollers[key]
  }
  global.clearonparentscroll = (func, key) => {
    delete global.winscrollers[key]
  }
}