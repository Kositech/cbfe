function ViewShadowBox(props){

    var className = (typeof(props.className) !== "undefined") ? props.className : "p-3"

    return (
        <div className={"view-shadow-box " + className}>
            {props.children}
        </div>
    )
}

export default ViewShadowBox