import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import variable from '../helpers/variable'
import ViewShadowBox from '../components/view-shadowbox'
import ViewContent from '../components/view-content'

function HealthSafetyMenu(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();

    return (
        <Row>
            <Col className="d-flex justify-content-start align-items-center mt-1 mb-4 ncr-menu">
                {
                    variable.NCR_MENU.map(function (v, i) {
                        let isActive = (v.link == props.match.url) ? "active" : ""
                        return (
                            <a href={v.link} className="mr-3" key={i}>
                                <ViewShadowBox
                                    className={"ncr-menu-wrap px-2 " + isActive}
                                >
                                    <ViewContent
                                        css="d-flex justify-content-center align-items-center"
                                    >
                                        <div className={v.className + " " + isActive}></div>
                                        <div className="font-m bold deep-dark pl-2 ncr-menu-name">{t(v.name)}</div>
                                    </ViewContent>
                                </ViewShadowBox>
                            </a>
                        )
                    })
                }
            </Col>
        </Row>
    )
}

export default HealthSafetyMenu