function ViewWrapper(props){
    // container-xxl
    return (
        <div className="container-fluid main-container" {...props}>
            <div className="mainWrapper">
                <div className="main">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default ViewWrapper