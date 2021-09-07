function ViewContent(props){
    var css = (typeof(props.css) !== "undefined") ? props.css : "d-flex flex-column justify-content-start"

    return (
        <div className={css}>
            {props.children}
        </div> 
    )
}

export default ViewContent