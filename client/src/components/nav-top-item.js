import { Col } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

function NavTopItem(props) {
    let { t } = useTranslation()

    // console.log("navTopItem props", props)
    let active = ""
    if (typeof (props.match) !== "undefined") {
        if (props.match.path !== "/" && props.value.link !== "/"){
            active = (props.match.path.indexOf(props.value.link) === 0) ? "active" : ""
        } else {
            active = (props.match.path === "/" && props.value.link === "/") ? "active" : ""
        }
    }

    return (
        <>
            {
                (typeof (props.value) !== "undefined") ?
                    (
                        <Col className={"d-flex justify-content-center align-items-center p-0 bg-sky-green white nav-top-menu-item " + active}>
                            <a href={props.value.link} className="py-1 w-100">
                                <div className={props.value.className}></div>
                                <div className="white font-xs lh-1-5 text-center">{t(props.value.name)}</div>
                            </a>
                        </Col>
                    ) :
                    (null)
            }
        </>
    )
}

export default NavTopItem