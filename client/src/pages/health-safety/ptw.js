import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import moment from 'moment'
import Chart from "react-apexcharts";
import { PTWPermitChart } from '../../helpers/charts/ptwChart'
import { PTWColumns } from '../../helpers/dataTableColumns'
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
        { name: t("Hot_Work_Permit"), value: 1 },
        { name: t("Exterior_wall_Permit"), value: 2 },
        { name: t("Ladder_Work_Permit"), value: 3 },
        { name: t("Above_Ceiling_Permit"), value: 4 },
    ])

    // 未批核，不批核，已註銷，未註銷
    // ["#5B8FF9", "#CD7B7B", "#61DDAA", "#65789B"] blue , red, green, grey
    const [ptwPermitChart, setPTWPermitChart] = useState(PTWPermitChart(
        [200, 20, 701, 42],
        ["未批核", "不批核", "已註銷", "未註銷"]
    ))

    const [ptwPermit, setPTWPermit] = useState([
        { permit: "熱工序", nonApproved: 120, rejceted: 5, cancelled: 400, nonCancelled: 10, total: 535 },
        { permit: "外牆/樓邊", nonApproved: 30, rejceted: 5, cancelled: 140, nonCancelled: 12, total: 187 },
        { permit: "梯具工作", nonApproved: 15, rejceted: 6, cancelled: 160, nonCancelled: 10, total: 191 },
        { permit: "假天花工作", nonApproved: 35, rejceted: 4, cancelled: 1, nonCancelled: 10, total: 50 },
    ])

    const [updatePTWData, setUpdatePTWData] = useState(0)

    const [ptwData, setPTWData] = useState([
        { applicant: "CS Pai (閉仲誠)", pcCompany: "WT 榮達 (電機)", type: "04. 廢料處理", "Sub-Type": "臨時移除圍欄 (包括樓層邊緣、井口、斜坡、棚架及其他可能導致下墮的位置)", status: "已確認註銷", location: "3/F", time: "12/05/2021 18:00" },
        { applicant: "CS Pai (閉仲誠)", pcCompany: "WT 榮達 (電機)", type: "04. 廢料處理", "Sub-Type": "臨時移除圍欄 (包括樓層邊緣、井口、斜坡、棚架及其他可能導致下墮的位置)", status: "已確認註銷", location: "3/F", time: "12/05/2021 18:00" },
        { applicant: "CS Pai (閉仲誠)", pcCompany: "WT 榮達 (電機)", type: "04. 廢料處理", "Sub-Type": "臨時移除圍欄 (包括樓層邊緣、井口、斜坡、棚架及其他可能導致下墮的位置)", status: "已確認註銷", location: "3/F", time: "12/05/2021 18:00" },
        { applicant: "CS Pai (閉仲誠)", pcCompany: "WT 榮達 (電機)", type: "04. 廢料處理", "Sub-Type": "臨時移除圍欄 (包括樓層邊緣、井口、斜坡、棚架及其他可能導致下墮的位置)", status: "已確認註銷", location: "3/F", time: "12/05/2021 18:00" },
        { applicant: "CS Pai (閉仲誠)", pcCompany: "WT 榮達 (電機)", type: "04. 廢料處理", "Sub-Type": "臨時移除圍欄 (包括樓層邊緣、井口、斜坡、棚架及其他可能導致下墮的位置)", status: "已確認註銷", location: "3/F", time: "12/05/2021 18:00" },
        { applicant: "CS Pai (閉仲誠)", pcCompany: "WT 榮達 (電機)", type: "04. 廢料處理", "Sub-Type": "臨時移除圍欄 (包括樓層邊緣、井口、斜坡、棚架及其他可能導致下墮的位置)", status: "已確認註銷", location: "3/F", time: "12/05/2021 18:00" },
    ])

    useEffect(() => {
        if (typeof (updatePTWData) == "number") {
            // fetch get data
            setUpdatePTWData(null)
        }
    }, [updatePTWData])

    const handleOnViewTabChange = (v, i) => {
        // console.log("handleOnViewTabChange ")
        setUpdatePTWData(i)
    }


    return (
        <ViewWrapper id="outer-container" className="font-roboto">
            <SideMenu
                burgerButtonClassName="cb-menu-bth-sm"
            ></SideMenu>
            <div id="page-wrap" className="cb-page-wrap cb-health-safety pt-4 pl-5 pr-5 pb-4 mt-1">
                <NavTop showIcon={true} {...props}/>
                <Row>
                    <Col className="d-flex justify-content-start align-items-center mb-5">
                        <div className="ml-6 pl-5 bold font-xl">{t('Crystal_Ball')}</div>
                        <div className="crystal-ball-logo logo-sm ml-2"></div>
                    </Col>
                </Row>
                <div className="font-28 bold deep-dark mb-3">{t('Health_Safety')}</div>
                <HealthSafetyMenu {...props} />
                <Row>
                    <Col md={12} className="mt-2 mb-4">
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
                            <PermitTable
                                data={ptwPermit}
                            />
                        </Col>
                    </Row>
                </ViewShadowBox>
                <Row>
                    <Col>
                        <ViewTabs tabs={tabs} onChange={handleOnViewTabChange} />
                        <DataTable
                            data={ptwData}
                            columns={PTWColumns}
                            pagination
                        />
                    </Col>
                </Row>
            </div>
            <ResponsiveFooterMenu />
        </ViewWrapper>
    )
}

export default PTW