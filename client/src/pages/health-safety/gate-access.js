import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import Chart from "react-apexcharts";
import { GateAccessStatusChart } from '../../helpers/charts/gaStatusChart'
import variable from '../../helpers/variable'
import NavTop from '../../components/nav-top';
import ResponsiveFooterMenu from '../../components/responsive-footer-menu'
import ViewWrapper from '../../components/view-wrapper'
import ViewContent from '../../components/view-content'
import DateClock from '../../components/date-clock'
import HealthSafetyMenu from '../../menu/health-safety-menu'
import SideMenu from '../../menu/side-menu'
import ViewBarContent from '../../components/view-bar-content';
import ViewShadowBox from '../../components/view-shadowbox';

function GateAccess(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();

    const [monthlyWorker, setMonthlyWorker] = useState({
        data: [
            { name: "1月", value: 576 },
            { name: "2月", value: 537 },
            { name: "3月", value: 486 },
            { name: "4月", value: 471 },
            { name: "5月", value: 498 },
            { name: "6月", value: 512 },
            { name: "7月", value: 491 },
            { name: "8月", value: 200 },
            { name: "9月", value: 576 },
        ],
        max: 576
    })

    const [topTenWorkType, setTopTenWorkType] = useState({
        data: [
            { name: "泥水工(全科)", value: 154 },
            { name: "金屬工", value: 128 },
            { name: "鋼筋屈紮工", value: 67 },
            { name: "混凝土工", value: 60 },
            { name: "木模板工(樓宇工程...", value: 50 },
            { name: "建造工地測量員", value: 50 },
            { name: "砌磚工", value: 43 },
            { name: "鋪瓦工", value: 30 },
            { name: "批盪工", value: 30 },
            { name: "雲石工(打磨)", value: 5 },
        ],
        max: 154
    })

    const [gateAccessStatusChart, setGateAccessStatusChart] = useState(GateAccessStatusChart(
        [58, 31],
        ["大牌", "細牌"]
    ))

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
                <Row>
                    <Col sm={12} md={4}>
                        <ViewBarContent
                            data={monthlyWorker}
                            label={"2021" + t('year') + t('Monthly_Worker')}
                            className="p-3 mb-4 h-100"
                        />
                    </Col>
                    <Col sm={12} md={4}>
                        <ViewBarContent
                            data={topTenWorkType}
                            color={"bg-dartmouth-green"}
                            label={t('Top_Ten_Work_Type')}
                            className="p-3 mb-4 h-100"
                        />
                    </Col>
                    <Col sm={12} md={4}>
                        <ViewShadowBox
                            className="p-3 h-100"
                        >
                            {
                                (gateAccessStatusChart.options.labels.length > 0) ?
                                    (<Chart
                                        options={gateAccessStatusChart.options}
                                        series={gateAccessStatusChart.series}
                                        height={(gateAccessStatusChart.options.labels.length * 72 > 285) ? gateAccessStatusChart.options.labels.length * 72 : 285}
                                        type={"donut"}
                                    />) :
                                    (null)
                            }
                        </ViewShadowBox>
                    </Col>
                </Row>
            </div>
            <ResponsiveFooterMenu />
        </ViewWrapper>
    )
}

export default GateAccess