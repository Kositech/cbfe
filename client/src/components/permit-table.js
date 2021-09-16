import { Row, Col } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'

function PermitTable(props) {
    const { t, i18n } = useTranslation();

    var data = (typeof (props.data) !== "undefined") ? props.data : []
    let totalNonApproved = 0, totalNonCancelled = 0,
        totalRejceted = 0, totalCancelled = 0, total = 0;

    return (
        <div className="permit-table text-center d-flex h-100 justify-content-center aligin-items-center flex-column px-2" {...props.className}>
            <Row className="permit-table-header">
                <Col className="align-items-center d-flex justify-content-center">{t('Permit')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('non-Approved')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('non-Cancelled')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('Rejected')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('Cancelled')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('Total')}</Col>
            </Row>
            {
                data.map(function (d, i) {
                    totalNonApproved += d.nonApproved
                    totalNonCancelled += d.nonCancelled
                    totalRejceted += d.rejceted
                    totalCancelled += d.cancelled
                    total += d.total

                    return (
                        <Row className="permit-table-content">
                            <Col className="align-items-center d-flex justify-content-center">{d.permit}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{d.nonApproved}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{d.nonCancelled}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{d.rejceted}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{d.cancelled}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{d.total}</Col>
                        </Row>
                    )
                })
            }
            <Row className="permit-table-footer">
                <Col className="align-items-center d-flex justify-content-center">{t('Total')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{totalNonApproved}</Col>
                <Col className="align-items-center d-flex justify-content-center">{totalNonCancelled}</Col>
                <Col className="align-items-center d-flex justify-content-center">{totalRejceted}</Col>
                <Col className="align-items-center d-flex justify-content-center">{totalCancelled}</Col>
                <Col className="align-items-center d-flex justify-content-center">{total}</Col>
            </Row>
        </div>
    )
}

export default PermitTable