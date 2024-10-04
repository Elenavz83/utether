import { useState } from "react";
import axios from 'axios'
import Circle from './Circle'
export type UploadStatuses = Array<{ name: string, size: number, percent: number, url: string }>
export default (props: {
  on?: (st: UploadStatuses) => void,
  id: string,
  extensionfilter?: any,
  singlefile?: boolean,
  hidefileicons?: boolean,
  maxsize?: number,
  marginLeft?: number | string,
  alt?: string,
}) => {

  let statuses = [] as UploadStatuses
  let localstorage_key = "uploader-" + props.id;
  var fname = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',]

  if (typeof window != "undefined") {


    let statuses_ = localStorage.getItem(localstorage_key)

    if (statuses_) statuses = JSON.parse(statuses_)

    removeCropted();
    if (!global.uploaders) {
      global.uploaders = {}
    }
    if (!global.uploaders[props.id]) {
      global.uploaders[props.id] = {} as any
    }
    global.uploaders[props.id].clear = () => {
      statuses = []
      props.on?.(statuses)
      localStorage.setItem(localstorage_key, JSON.stringify(statuses))
    }

    global.uploaders[props.id].statuses = statuses

    global.uploaders[props.id].open = () => {

      setTimeout(() => { global.isDown = false; }, 300);// stop page scrolling...
      if (!!statuses.find(st => st.percent < 100)) {
        alerter(lang.uploadwaiterr)
        return
      }
      if (statuses.length >= 5) {
        alerter(lang.uploadmaxerr)
        return
      }
      statuses = []
      props.on?.(statuses)
      document.getElementById("file" + props.id).click()
    }
  }

  function removeCropted() {
    const input = document.getElementById("file" + props.id) as HTMLInputElement;
    const names = [] as string[]
    if (input) {
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        names.push(files[i].name.toLocaleLowerCase())
      }
    }
    statuses = statuses.filter(st => (names.includes(st.name) || st.percent == 100))
  }
  function renameFiles() {
    const input = document.getElementById("file" + props.id) as HTMLInputElement;
    const files = input.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split('.').pop();
      const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const newFileName = hash + '.' + extension;

      // Using a DataTransfer object to manipulate the files
      const dataTransfer = new DataTransfer();
      for (let j = 0; j < files.length; j++) {
        if (i === j) {
          const newFile = new File([file], newFileName, { type: file.type });
          dataTransfer.items.add(newFile);
        } else {
          dataTransfer.items.add(files[j]);
        }
      }
      input.files = dataTransfer.files;
    }
  }
  const uploadToServer = async () => {
    renameFiles();
    var fileinput = document.getElementById("file" + props.id) as HTMLInputElement;
    if (fileinput.files && fileinput.files[0]) {
      for (var f of Array.from(fileinput.files)) {
        statuses.push({
          name: f.name.toLowerCase(),
          size: f.size,
          percent: 0,
          url: `https://irmapserver.ir/qeupload/${global.user.uid}/${f.name.toLowerCase()}`
        })
      }
    }
    if (fileinput.files && fileinput.files[0]) {
      for (var f of Array.from(fileinput.files)) {

        if (props.extensionfilter && props.extensionfilter.length > 0) {
          if (!props.extensionfilter.find(ext => f.name.toLowerCase().endsWith(ext.toLowerCase()))) {
            alerter(lang.uploadexterr + "\n" + props.extensionfilter.join(", "))
            return false;
          }
        }

        const body = new FormData();
        body.append("filesToUpload[]", f);
        body.append("uid", global.user.uid);
        body.append("submit", "TRUE");

        axios.request({
          method: "post",
          url: "https://irmapserver.ir/qeupload/upload.php",
          headers: {
            // token: ans.token
          },
          data: body,
          onUploadProgress: (p) => {
            let status = statuses.find(st => st.name == f.name.toLowerCase())
            status.percent = Math.ceil(100 * p.loaded / p.total);
            props?.on(statuses)
            localStorage.setItem(localstorage_key, JSON.stringify(statuses))
          }
        }).then(resp => {
          let status = statuses.find(st => st.name == f.name.toLowerCase())
          status.percent = 100;
          props?.on(statuses)
          localStorage.setItem(localstorage_key, JSON.stringify(statuses))

          console.log(resp.data)
        })
      }
    }
    props?.on(statuses)
    localStorage.setItem(localstorage_key, JSON.stringify(statuses))
  };


  if (props.hidefileicons) {
    return <input style={{ display: "none" }} multiple type="file" name={"file" + props.id} id={"file" + props.id} onChange={(e) => {
      for (let f of e.target.files) {
        if (f.size > (props.maxsize || 12 * 1024 * 1024)) {
          alerter(lang.uploaderrsize.replace("XX",
            (Math.ceil((props.maxsize || 12 * 1024 * 1024) / (1024 * 1024))) + " MB"))
          e.target.value = null
          return
        }
      }
      uploadToServer()
    }} />
  }

  return (
    <div style={{ display: "flex", marginTop: 5, marginLeft: props.marginLeft }}>
      {/* <a>{JSON.stringify(flist,0,4)}</a> */}


      {statuses.map((st, i) => {
        let key = null

        const extension = st.name.split('.').pop().toLowerCase();

        if (st.percent == 100) {

          if (extension == ("jpg") || extension == ("jpeg") || extension == ("png") || extension == ("gif") || extension == ("svg")
            || extension == ("webp")) {
            return <div key={key} style={{ position: "relative", lineHeight: 0.7, marginTop: -5 }}>
              <a style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", paddingRight: 5 }}
                target="_blank" href={st.url}>
                <img id={props.id+"_img"} style={{ borderRadius: 5, width: 40, height: 40 }} src={st.url} alt={props.alt}
                  onError={async (e) => {
                    e.currentTarget.src = ""
                    e.currentTarget.src = st.url
                  }} />
                <h5>{fname[i] + "." + extension}</h5></a>

              <div className={styles.imgremove} onClick={() => {
                statuses = statuses.filter(it => !(it.name.toLowerCase() == st.name.toLowerCase()));
                props.on?.(statuses)
                localStorage.setItem(localstorage_key, JSON.stringify(statuses))
              }}>
                <img style={{ borderRadius: 5, width: 20, height: 20 }} src={global.cdn("/files/close.svg")} alt={props.alt} />
              </div>
            </div>
          }
          else if (extension == ("zip") || extension == ("rar") || extension == ("dll") || extension == ("mp4")
            || extension == ("mp3") || extension == ("txt") || extension == ("pdf") || extension == ("cs")
            || extension == ("py") || extension == ("js") || extension == ("apk") || extension == ("doc") || extension == ("docx")
            || extension == ("ppt") || extension == ("pptx") || extension == ("psd") || extension == ("exe") || extension == ("vtt")) {
            return <div key={key} style={{ position: "relative", lineHeight: 0.7, marginTop: -5 }}>
              <a style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", paddingRight: 5 }} target="_blank" href={st.url}>
                <img style={{ borderRadius: 5, width: 40, height: 40 }} src={cdn("/files/" + extension + ".svg")}
                  alt={props.alt} />
                <h5>{fname[i] + "." + extension}</h5></a>

              <div className={styles.imgremove} onClick={() => {
                statuses = statuses.filter(it => !(it.name.toLowerCase() == st.name.toLowerCase()));
                props.on?.(statuses)
                localStorage.setItem(localstorage_key, JSON.stringify(statuses))
              }}>
                <img style={{ borderRadius: 5, width: 20, height: 20 }} src={global.cdn("/files/close.svg")} alt={props.alt} />
              </div>
            </div>
          }
          return <div key={key} style={{ position: "relative", lineHeight: 0.7, marginTop: -5 }}>
            <a style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", paddingRight: 5 }} target="_blank" href={st.url}>
              <img style={{ borderRadius: 5, width: 40, height: 40 }} src={global.cdn("/files/file.svg")} alt={props.alt} />
              <h5>{fname[i] + "." + extension}</h5></a>

            <div className={styles.imgremove} onClick={() => {
              statuses = statuses.filter(it => !(it.name.toLowerCase() == st.name.toLowerCase()));
              props.on?.(statuses)
              localStorage.setItem(localstorage_key, JSON.stringify(statuses))
            }}>
              <img style={{ borderRadius: 5, width: 20, height: 20 }} src={global.cdn("/files/close.svg")} alt={props.alt} />
            </div>
          </div>
        }
        else {
          return <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingRight: 5 }}>
            <Circle {...{ percent: st.percent, width: 40 }} />
            <h5><a>{fname[i] + "." + extension}</a></h5>
          </div>
        }
      })}


      <input style={{ display: "none" }} multiple type="file" name={"file" + props.id} id={"file" + props.id} onChange={(e) => {
        for (let i in e.target.files) {
          let f = e.target.files[i]
          if (f.size > (props.maxsize || 12 * 1024 * 1024)) {
            alerter(lang.uploaderrsize.replace("XX",
              (Math.ceil((props.maxsize || 12 * 1024 * 1024) / (1024))).toLocaleString(global.lang.region) + " kb"))
            e.target.value = null
            return
          }
        }
        uploadToServer()
      }} />
    </div>
  );
}
