import { Row, Col } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { permitKeyI18nKey } from '../helpers/common'

function PermitTable(props) {
    const { t, i18n } = useTranslation();

    var data = (typeof (props.data) !== "undefined") ? props.data : {}
    let totalWaitingApperoval = 0, totalNotCancelled = 0,
        totalNotApproved = 0, totalCancelled = 0, totalCancelConfirmed = 0, totalWithdrawn = 0, total = 0;

    return (
        <div className="permit-table text-center d-flex h-100 justify-content-center aligin-items-center flex-column px-2" {...props.className}>
            <Row className="permit-table-header">
                <Col className="align-items-center d-flex justify-content-center">{t('Permit')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('waiting_approved')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('not_cancelled')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('not_approved')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('cancelled')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('cancel_confirmed')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('withdrawn')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{t('Total')}</Col>
            </Row>
            {
                Object.keys(data).map(function (d, i) {
                    var waiting_approval = (typeof(data[d]) !== "undefined" && data[d].length > 0) ? data[d][0].waiting_approval : 0
                    var not_cancelled = (typeof(data[d]) !== "undefined" && data[d].length > 0) ? data[d][0].not_cancelled : 0
                    var not_approved = (typeof(data[d]) !== "undefined" && data[d].length > 0) ? data[d][0].not_approved : 0
                    var cancelled = (typeof(data[d]) !== "undefined" && data[d].length > 0) ? data[d][0].cancelled : 0
                    var cancel_confirmed = (typeof(data[d]) !== "undefined" && data[d].length > 0) ? data[d][0].cancel_confirmed : 0
                    var withdrawn = (typeof(data[d]) !== "undefined" && data[d].length > 0) ? data[d][0].withdrawn : 0
                    totalWaitingApperoval += waiting_approval
                    totalNotCancelled += not_cancelled
                    totalNotApproved += not_approved
                    totalCancelled += cancelled
                    totalCancelConfirmed += cancel_confirmed
                    totalWithdrawn += withdrawn
                    var dtotal = (waiting_approval + not_cancelled + not_approved 
                        + cancelled + cancel_confirmed + withdrawn)
                    total += dtotal
                    var i18nkey = permitKeyI18nKey(d)

                    return (
                        <Row className="permit-table-content">
                            <Col className="align-items-center d-flex justify-content-center">{t(i18nkey)}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{waiting_approval}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{not_cancelled}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{not_approved}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{cancelled}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{cancel_confirmed}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{withdrawn}</Col>
                            <Col className="align-items-center d-flex justify-content-center">{dtotal}</Col>
                        </Row>
                    )
                })
            }
            <Row className="permit-table-footer">
                <Col className="align-items-center d-flex justify-content-center">{t('Total')}</Col>
                <Col className="align-items-center d-flex justify-content-center">{totalWaitingApperoval}</Col>
                <Col className="align-items-center d-flex justify-content-center">{totalNotCancelled}</Col>
                <Col className="align-items-center d-flex justify-content-center">{totalNotApproved}</Col>
                <Col className="align-items-center d-flex justify-content-center">{totalCancelled}</Col>
                <Col className="align-items-center d-flex justify-content-center">{totalCancelConfirmed}</Col>
                <Col className="align-items-center d-flex justify-content-center">{totalWithdrawn}</Col>
                <Col className="align-items-center d-flex justify-content-center">{total}</Col>
            </Row>
        </div>
    )
}

export default PermitTable