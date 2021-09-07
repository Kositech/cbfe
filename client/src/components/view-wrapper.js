function ViewWrapper(props){
    return (
        <div className="container-xxl main-container">
            <div className="mainWrapper">
                <div className="main">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default ViewWrapper