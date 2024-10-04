const styles = require('../../styles/Home.module.css')
export default () => {
  return <div className={styles.op0} id="grayer" style={{ display: "none"
  , transition: "ease-out 0.4s", zIndex: 10001 }}>
    {/* <div className={styles.blackblurybg} style={{ zIndex: 250, opacity: 1 }}></div> */}
    <div className={styles.dialog}
      style={{
        width: "92vw", maxWidth: "15rem", zIndex: 10000,
        top: "50%",
        backgroundColor: "#000000EE",
      }}>
      <c-cc style={{ height: "100%", width: "100%", borderRadius: 5, padding: "10px 0 20px 0", color: "yellowgreen" }}>
        <br-x />
        <br-x />
        <br-x />
        <br-x />

        <img src={global.cdn("/files/qeraw.webp")} style={{ width: 130 }} />
        <img src={global.cdn("/files/loading3dots.svg")} style={{ position: "absolute", width: 70, height: 70, top: 80 }} />
        <br-x />
        <br-x />
        <br-x />
      </c-cc>
    </div>
  </div>
}