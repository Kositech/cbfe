import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import moment from 'moment'
import Chart from "react-apexcharts";
import { _gqlQuery } from '../../gql/apolloClient';
import { ptwTypesCountDaily, ptwDetailByTypes } from '../../gql/ptwGql'
import { PTWPermitChart } from '../../helpers/charts/ptwChart'
// import { fetchPTWDetailByType } from '../../helpers/fetch/fetch-ptw'
import { PTWColumns } from '../../helpers/dataTableColumns'
import { permitDataFilter } from '../../helpers/common'
import variable from '../../helpers/variable'
import NavTop from '../../components/nav-top';
import ResponsiveFooterMenu from '../../components/responsive-footer-menu'
import ViewWrapper from '../../components/view-wrapper'
import ViewContent from '../../components/view-content'
import DateClock from '../../components/date-clock'
import ViewShadowBox from '../../components/view-shadowbox'
import PermitTable from '../../components/permit-table'
import HealthSafetyMenu from '../../menu/health-safety-menu'
import SideMenu from '../../menu/side-menu'
import ViewTabs from '../../components/view-tabs';

function PTW(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();

    const [tabs, setTabs] = useState([
        { name: t("Hot_Work_Permit"), value: 1, key: "THERMAL" },
        { name: t("Exterior_wall_Permit"), value: 2, key: "SIDEWALK" },
        { name: t("Ladder_Work_Permit"), value: 3, key: "LADDER" },
        { name: t("False_Ceiling_Permit"), value: 4, key: "FALSECEILING" },
    ])

    // 未批核，不批核，已註銷，未註銷
    // ["#5B8FF9", "#CD7B7B", "#61DDAA", "#65789B"] blue , red, green, grey
    const [ptwPermitChart, setPTWPermitChart] = useState(PTWPermitChart(
        [],
        []
    ))

    const [permitData, setPermitData] = useState({})

    const [updatePTWData, setUpdatePTWData] = useState({
        startDate: moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"),
        endDate: moment().endOf('day').format("YYYY-MM-DD HH:mm:ss"),
        total: 0,
        skip: 0,
        page: 1,
        take: variable.DATA_TABLE_PER_PAGE,
        currentValue: 0,
        process: false
    })

    const [ptwData, setPTWData] = useState()

    async function fetchPTWDetailByType() {
        let items = await _gqlQuery(ptwDetailByTypes, {
            project: -1, type: tabs[updatePTWData.currentValue]["key"],
            startDate: updatePTWData.startDate, endDate: updatePTWData.endDate,
            skip: updatePTWData.skip, take: updatePTWData.take
        })

        if (typeof (items.errors) !== "undefined") {

        } else {
            console.log("items ", items)
            setPTWData(items.data.ptwDetailByTypes[0].data)
            setUpdatePTWData({
                ...updatePTWData,
                total: items.data.ptwDetailByTypes[0].total,
                process: false
            })
        }
    }

    async function fetchDailyPermit() {
        let startDate = moment().startOf('day').format("YYYY-MM-DD HH:mm:ss")
        let endDate = moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")
        let newPermitData = {}

        for (let i = 0; i < variable.PERMIT_TYPE.length; i++) {
            let items = await _gqlQuery(ptwTypesCountDaily, { project: -1, type: variable.PERMIT_TYPE[i], startDate: startDate, endDate: endDate })
            if (typeof (items.errors) !== "undefined") {

            } else {
                newPermitData[variable.PERMIT_TYPE[i]] = items.data.ptwTypesCountDaily[0].data
            }

            // Is last type
            if (i == variable.PERMIT_TYPE.length - 1) {
                console.log("newPermitData", newPermitData)
                setPermitData(newPermitData)
            }
        }
    }

    useEffect(() => {
        if (updatePTWData.process) {
            fetchPTWDetailByType()
        }
    }, [updatePTWData])

    useEffect(() => {
        console.log("permitData: ", permitData)
        if (Object.keys(permitData).length > 0) {
            let totalWaitingApperoval = 0, totalNotCancelled = 0,
                totalNotApproved = 0, totalCancelled = 0, totalCancelConfirmed = 0, totalWithdrawn = 0, total = 0;
            Object.keys(permitData).map(function (d, i) {
                var waiting_approval = (typeof (permitData[d]) !== "undefined" && permitData[d].length > 0) ? permitData[d][0].waiting_approval : 0
                var not_cancelled = (typeof (permitData[d]) !== "undefined" && permitData[d].length > 0) ? permitData[d][0].not_cancelled : 0
                var not_approved = (typeof (permitData[d]) !== "undefined" && permitData[d].length > 0) ? permitData[d][0].not_approved : 0
                var cancelled = (typeof (permitData[d]) !== "undefined" && permitData[d].length > 0) ? permitData[d][0].cancelled : 0
                var cancel_confirmed = (typeof (permitData[d]) !== "undefined" && permitData[d].length > 0) ? permitData[d][0].cancel_confirmed : 0
                var withdrawn = (typeof (permitData[d]) !== "undefined" && permitData[d].length > 0) ? permitData[d][0].withdrawn : 0
                totalWaitingApperoval += waiting_approval
                totalNotCancelled += not_cancelled
                totalNotApproved += not_approved
                totalCancelled += cancelled
                totalCancelConfirmed += cancel_confirmed
                totalWithdrawn += withdrawn
                var dtotal = (waiting_approval + not_cancelled + not_approved
                    + cancelled + cancel_confirmed + withdrawn)
                total += dtotal
            })

            setPTWPermitChart(PTWPermitChart(
                [totalWaitingApperoval, totalNotCancelled, totalNotApproved,
                    totalCancelled, totalCancelConfirmed, totalWithdrawn],
                [t('waiting_approved'), t('not_cancelled'), t('not_approved'), t('cancelled'), t('cancel_confirmed'), t('withdrawn')]
            ))
        }
    }, [permitData])

    useEffect(() => {
        fetchDailyPermit()
        fetchPTWDetailByType()
    }, [])

    const handleOnViewTabChange = (v, i) => {
        // console.log("handleOnViewTabChange ")
        // setUpdatePTWData(i)
        setUpdatePTWData({
            ...updatePTWData,
            total: 0,
            page: 1,
            skip: 0,
            currentValue: i,
            process: true
        })
    }


    return (
        <ViewWrapper id="outer-container" className="font-roboto">
            <SideMenu
                burgerButtonClassName="cb-menu-bth-sm"
            ></SideMenu>
            <div id="page-wrap" className="cb-page-wrap cb-health-safety pt-4 pl-5 pr-5 pb-4 mt-1">
                <NavTop showIcon={true} {...props} />
                <Row>
                    <Col className="d-flex justify-content-start align-items-center mb-5">
                        <div className="ml-6 pl-5 bold font-xl">{t('Crystal_Ball')}</div>
                        <div className="crystal-ball-logo logo-sm ml-2"></div>
                    </Col>
                </Row>
                <div className="font-28 bold deep-dark mb-3">{t('Health_Safety')}</div>
                <HealthSafetyMenu {...props} />
                <Row>
                    <Col md={12} className="mb-4">
                        <DateClock />
                    </Col>
                </Row>
                <ViewShadowBox className="p-3 mb-5">
                    <Row className="mb-4 pb-2">
                        <Col>
                            <div className="bold font-l">{t('Work_permit_status_distribution')}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12} md={5} lg={4}>
                            {
                                (ptwPermitChart.options.labels.length > 0) ?
                                    (<Chart
                                        options={ptwPermitChart.options}
                                        series={ptwPermitChart.series}
                                        height={(ptwPermitChart.options.labels.length * 72 > 285) ? ptwPermitChart.options.labels.length * 72 : 285}
                                        type={"donut"}
                                    />) :
                                    (null)
                            }
                        </Col>
                        <Col sm={12} md={{ span: 7 }} lg={{ span: 6, offset: 1 }}>
                            {
                                (Object.keys(permitData).length > 0) ?
                                    <PermitTable
                                        data={permitData}
                                    /> :
                                    (null)
                            }
                        </Col>
                    </Row>
                </ViewShadowBox>
                <Row>
                    <Col>
                        <ViewTabs tabs={tabs} onChange={handleOnViewTabChange} />
                        <div className="cb-data-table">
                            <DataTable
                                data={ptwData}
                                columns={PTWColumns}
                                pagination
                                paginationPerPage={updatePTWData.take}
                                paginationTotalRows={updatePTWData.total}
                                paginationServer
                                onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
                                    setUpdatePTWData({
                                        ...updatePTWData,
                                        take: currentRowsPerPage,
                                        process: true
                                    })
                                }}
                                onChangePage={async (page, totalRows) => {
                                    setUpdatePTWData({
                                        ...updatePTWData,
                                        skip: (page - 1),
                                        page: page,
                                        process: true
                                    })
                                }}
                                paginationDefaultPage={updatePTWData.page}
                                striped={true}
                                noHeader={true}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
            <ResponsiveFooterMenu />
        </ViewWrapper>
    )
}

export default PTW