import {Row, Col} from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import ViewShadowBox from './view-shadowbox'

function ViewLabelBox(props) {
    const { t, i18n } = useTranslation();
    var data = (typeof (props.data) !== "undefined") ? props.data : []

    return (
        <ViewShadowBox {...props}>
            <Row>
                {
                    data.map(function (d, i) {
                        return (
                            <Col className="d-flex flex-column justify-content-center align-items-center">
                                <div className="font-xm bold deep-dark mb-1">
                                    {t(d.label)}
                                </div>
                                <div className="font-xxl bold deep-dark lh-1-1">
                                    {d.value}
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </ViewShadowBox>
    )
}

export default ViewLabelBox