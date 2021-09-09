function ViewWrapper(props){
    // container-xxl
    return (
        <div {...props}>
            <div className="container-fluid main-container">
                <div className="main">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default ViewWrapper