
export default (props) => {
  var toggleThin1 = () => {
    var em = document.getElementById(props.name + '_detail_' + props.id);
    var temp = window.getComputedStyle(em).getPropertyValue("max-height");
    if (temp == "0px") {
      props.onflip(true)
      closeAllOtherThins(props.name + '_detail_' + props.id);
      document.getElementById(props.name + '_detail_' + props.id).className = styles.openheight;
    }
    else {

      document.getElementById(props.name + '_detail_' + props.id).className = styles.closeheight;
      setTimeout(() => {
        props.onflip(false)
      }, 300);
    }
  }

  var closeAllOtherThins = (except) => {
    var els = document.getElementsByTagName("div");
    Array.from(els).forEach(el => {
      var id = el.getAttribute("id");
      if (id) {
        if (id.includes(props.name + "_detail_")) {
          if (id != except) {
            el.className = styles.closeheight
          }
        }
      }
    });
  }

  let el = null
  return <div onClick={(e) => {
    props.onclick?.(); toggleThin1();

    // if (props.savescroll) {
    //   setTimeout(() => {
    //     document.getElementById(props.id + "_scroller").scrollIntoView({ behavior: "smooth", block: "start" })

    //     // var element = document.getElementById(props.id + "_scroller")
    //     //   var headerOffset = 10;
    //     //   var elementPosition = element.getBoundingClientRect().top;
    //     //   var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    //     //   global.parentdiv.scrollTo({
    //     //        top: offsetPosition,
    //     //        behavior: "smooth"
    //     //   });

    //   }, 400);
    // }

  }}  >
    <div id={props.id + "_scroller"}></div>
    {props.children}
  </div>
}