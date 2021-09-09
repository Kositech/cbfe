function ViewShadowBox(props){
    return (
        <div className="view-shadow-box" {...props}>
            {...props.children}
        </div>
    )
}

export default ViewShadowBox