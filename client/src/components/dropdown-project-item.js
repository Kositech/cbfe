import ViewContent from '../components/view-content';

function DropdownProjectItem(props) {
    let fav = (typeof(props.fav) !== "undefined") ? props.fav : false
    console.log("DropdownProjectItem props ", props)

    return (
        <ViewContent
            css="d-flex justify-content-between align-items-center"
        >
            <div className="">{props.value}</div>
            {
                (fav) ?
                (
                    <div className="cb-favorite-icon"></div>
                ) :
                (null)
            }
        </ViewContent>
    )
}

export default DropdownProjectItem