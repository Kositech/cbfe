function ViewShadowBox(props){
    return (
        <div className="view-shadow-box p-2 " {...props}>
            {props.children}
        </div>
    )
}

export default ViewShadowBox