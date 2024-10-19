import Router from 'next/router';
const styles = require('@/styles/Home.module.css')

export const Runner = ()=>{
  
  Router.events.on('routeChangeStart', (e) => {

    console.log("loading starts...")
    if(global.noloading)
    {
      global.noloading = false;
      return;
    }
    global.onunloader?.()
    global.winscrollers = {}
    let el = document.getElementById("grayer")
    el.style.display = "flex"; el.className = styles.op1
  });
  Router.events.on('routeChangeComplete', () => {
    global.onunloader = null
    let el = document.getElementById("grayer")
    el.className = styles.op0
    setTimeout(() => el.style.display = "none", 400);
  });
  Router.events.on('routeChangeError', () => {
    let el = document.getElementById("grayer")
    el.className = styles.op0
    setTimeout(() => el.style.display = "none", 400);
  });
}
