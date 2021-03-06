// import { useTranslation } from 'react-i18next'
import { Row, Col } from 'react-bootstrap'
import ViewShadowBox from './view-shadowbox'
import ViewContent from './view-content'

function ViewBarContent(props) {
    // const { t, i18n } = useTranslation();
    let label = (typeof (props.label) !== "undefined") ? props.label : ""
    let data = (typeof (props.data) !== "undefined") ? props.data : []
    let color = (typeof (props.color) !== "undefined") ? props.color : "bg-yellow"
    let md_l = (typeof (props.md_l) !== "undefined") ? props.md_l : 6
    let md_r = (typeof (props.md_r) !== "undefined") ? props.md_r : 6

    return (
        <ViewShadowBox
            className={"p-3 mb-3 " + (typeof (props.className) !== "undefined") ? props.className : ""}
        >
            <div className="font-n deep-dark mb-3">{label}</div>
            <ViewContent
                css="d-flex justify-content-start align-items-center flex-column">
                {
                    (data.data.map(function (n, i) {
                        return (
                            <Row className="w-100 mb-2" key={i}>
                                <Col md={md_l} className="d-flex justify-content-between pl-0">
                                    <div className="font-s deep-dark">{n.name}</div>
                                    <div className="font-s deep-dark">{n.value}</div>
                                </Col>
                                <Col md={md_r}>
                                    <div className="cb-bar-wrap">
                                        <div className={"cb-bar " + color} style={{ width: (n.value / data.max) * 100 + "%" }}></div>
                                    </div>
                                </Col>
                            </Row>
                        )
                    }))
                }
            </ViewContent>
        </ViewShadowBox>
    )
}

export default ViewBarContent