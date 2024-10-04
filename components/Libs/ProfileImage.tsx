import Cropper from 'react-easy-crop'
import Upload from './Upload'
import { useState } from 'react';
import WindowFloat from './WindowFloat';
import Circle from './Circle';

export default (props) => {
  // var pimage = null

  var [crp, setCrp] = useState({
    imageSrc: global.user.image || global.cdn("/files/user.svg"),
    // imageSrc:global.cdn("/files/user.svg"),
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1,
    portion: 1,
    refw: 1,
  })
  // var functions: any = {}
  var refreshcrp = () => {
    setCrp(JSON.parse(JSON.stringify(crp)))
  }
  var onCropChange = (crop) => {
    crp.crop = crop;
    refreshcrp();
  }

  var onCropComplete = (croppedArea, croppedAreaPixels) => {
    // console.log(croppedAreaPixels.width / croppedAreaPixels.height)
  }

  var onZoomChange = (zoom) => {
    crp.zoom = zoom;
    refreshcrp();
  }

  return <>
    <WindowFloat title={lang.profilepic} onclose={() => props.onclose?.()}>

      <div style={{ position: "relative", height: 300, width: "100%" }}>
        <Cropper
          image={crp.imageSrc}
          crop={crp.crop}
          zoom={crp.zoom}
          aspect={crp.aspect}
          cropShape="round"
          showGrid={true}
          onMediaLoaded={(media) => {
            crp.portion = media.naturalWidth / media.naturalHeight
            crp.refw = media.width,
              refreshcrp();
          }}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
      </div>


      <Upload
        id={"profile-image"}
        extensionfilter={[".jpg", ".png", '.jpeg', '.svg', '.webp']}
        // state={[pimage]}
        singlefile={true}
        maxsize={150000}
        on={(st) => {
          if (st.length == 0) return
          if (st[0].percent < 100) {
            crp.imageSrc = global.cdn("/files/picload.svg");
            refreshcrp();
          }
          else {
            crp.imageSrc = st[0].url;
            refreshcrp()
          }

          // global.uploaders["profile-image"].clear()
        }}
      />


      <br-x />
      <f-cc class={styles.btncancel} style={{ flex: 1, backgroundColor: "#67b2d5" }} onClick={() => {
        global.uploaders["profile-image"].open()
      }}>
        {lang.uploadnewpic}
      </f-cc>
      <br-xx />
      <f-cc class={styles.btnaccept} style={{ flex: 1 }} onClick={async () => {
        if (!crp.imageSrc) {
          alerter("there is no image to send.");
          return;
        }
        let json = await (await fetch('/api/user/profilepic', {
          method: "POST",
          body: JSON.stringify({
            url: crp.imageSrc,
            zoom: crp.zoom,
            x: crp.crop.x,
            y: crp.crop.y,
            portion: crp.portion,
            refw: crp.refw,
          })
        })).json()

        if (json.code == 0) {
          window.location.reload();
          props.onclose?.()
        }
        else {
          alerter(JSON.stringify(json))
        }
      }}>
        {lang.confirm}
      </f-cc>

      {/* <f-cc class={styles.btncancel}  style={{width:"100%"}} onClick={()=>{
      functions.open();
    }}>
      <f-cc>
        <img src ={global.cdn("/files/upload.svg")} alt="received transaction count" style={{width:20, height:20}}/> 
      &nbsp;&nbsp;<span style={{color:"#452700"}}>{lang.upload}</span></f-cc>
    </f-cc> */}

      <br-x />
    </WindowFloat>
  </>
}