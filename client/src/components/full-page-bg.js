function FullPageBg(props){
    var url = (props.url) ? props.url : ""
    return (
        <div className="position-fixed bg-cover" style={
            {
                top:"0px",left:"0px", width:"100%", height: "100%",
                background:`url(${url}) no-repeat center center fixed`,
                zIndex: "-1"
            }            
        }>
            {props.children}
        </div>
    )
}

export default FullPageBg