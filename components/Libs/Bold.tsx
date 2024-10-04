export default (props)=>{
    return <span style={{fontFamily:lang.ffb || lang.ffb,
        fontWeight:!lang.ffb?600:"normal",
        ...props.style}} onClick={()=>{props.on?.()}}>{props.children}</span>
}