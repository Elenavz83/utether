import Image from 'next/image'
import { CSSProperties } from 'react'

export default (props: {
  image: string,
  imageprop: { zoom?: number, x?: number, y?: number, portion?: number, refw?: any },
  width?: number, w?: number, style?: CSSProperties, on?:()=>void,
}) => {

  let image = props.image || global.cdn("/files/user.svg")
  let imageprop = props.imageprop
  let wi = parseFloat(props.width.toString() || props.w.toString() || "100")

  if (props.image) {
    if (!props.imageprop) {
      return <f-cc style={{
        position: "relative", overflow: 'hidden',
        ...props.style,
        width: wi, height: wi, borderRadius: 0.5 * wi,
      }}>
        <Image alt="avatar" src={global.cdn(image)} fill sizes="200px" style={{ objectFit: "cover" }}
          onClick={() => props.on?.()} />
      </f-cc>
    }
  }
  else {
    imageprop = {}
  }



  let zoom = imageprop?.zoom;
  let x = imageprop?.x
  let y = imageprop?.y
  let portion = imageprop?.portion
  let refw = imageprop?.refw


  if (typeof imageprop == "undefined") {
    return <img onClick={() => props.on?.()} src={image} style={{ width: wi, height: wi, borderRadius: wi / 2 }} />
  }

  if (!zoom || (image == global.cdn("/files/user.svg"))) {
    return <img onClick={() => props.on?.()} src={image} style={{ width: wi, height: wi, borderRadius: wi / 2 }} />
  }



  if (portion > 1) {
    wi *= portion
    return <>
      <f-cc style={{
        position: "relative", overflow: 'hidden',
        ...props.style,
        width: wi / portion, height: wi / portion, borderRadius: 0.5 * wi / portion,
        //  border: "solid 1px black", backgroundColor: "pink"
      }}
        onClick={() => props.on?.()}>
        <c-x style={{
          position: "absolute", left: -1 * (wi - wi / portion) / 2 + x * (wi) / refw,
          top: y * (wi / portion) / (refw / portion),
          transform: "scale(" + zoom + ")",
        }}>
          <c-x style={{ position: "relative", width: wi, height: wi / portion, }}>
            <Image alt="avatar" src={global.cdn(image)} fill style={{ objectFit: "cover" }} />
          </c-x>
        </c-x>

      </f-cc>
    </>
  }

  return <>
    <f-cc style={{
      position: "relative", overflow: 'hidden',
      ...props.style,
      width: wi, height: wi, borderRadius: 0.5 * wi,
      //  border: "solid 1px black", backgroundColor: "pink"
    }}
      onClick={() => props.on?.()}>
      <c-x style={{
        position: "absolute", left: x * (wi / portion) / (refw / portion),
        top: -1 * (wi / portion - wi) / 2 + y * (wi) / refw,
        transform: "scale(" + zoom + ")",
      }}>
        <c-x style={{ position: "relative", width: wi, height: wi / portion, }}>
          <Image alt="avatar" src={global.cdn(image)} style={{ objectFit: "cover" }} fill sizes="200px" />
        </c-x>
      </c-x>
    </f-cc>
  </>
}