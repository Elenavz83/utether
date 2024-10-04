
export default (props)=>{
    function getProgressCircleValues(percentage, radius = 45) {
        if (percentage < 0 || percentage > 100) {
            throw new Error('Percentage must be between 0 and 100');
        }
    
        // Calculate the circumference of the circle
        const circumference = 2 * Math.PI * radius;
    
        // Calculate stroke-dasharray and stroke-dashoffset
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (percentage / 100 * circumference);
    
        return {
            strokeDasharray: strokeDasharray.toFixed(2),
            strokeDashoffset: strokeDashoffset.toFixed(2)
        };
    }

    let v = getProgressCircleValues(props.percent)

    return <svg width={props.width} height={props.width} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" stroke="#e6e6e6" stroke-width="10" fill="none"/>
    
    <circle cx="50" cy="50" r="45" stroke="#105609" stroke-width="10" fill="none"
            stroke-dasharray={v.strokeDasharray} stroke-dashoffset={v.strokeDashoffset} transform="rotate(-90 50 50)"/>
    <text x="50" y="50" font-size="20" text-anchor="middle" fill="#105609" dy=".3em">{props.percent+"%"}</text>
  </svg>
  
}