export default (props)=>
{
return  <div id={props.name+"_detail_"+props.id} className={props.open?styles.openheight:styles.closeheight}>
{props.open?props.children:null}
</div>
}