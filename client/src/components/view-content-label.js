function ViewContentLabel(props) {
    var icon = (typeof(props.icon) !== "undefined") ? props.icon : ""
    var label = (typeof(props.label) !== "undefined") ? props.label : ""
    var lableClassName = (typeof(props.lableClassName) !== "undefined") ? props.lableClassName : "ml-2 font-xl bold"

    return (
        <>
            {
                (icon !== "") ?
                (<div className={icon}></div>) : 
                (null)
            }
            <div className={lableClassName}>{label}</div>
        </>
    )
}

export default ViewContentLabel