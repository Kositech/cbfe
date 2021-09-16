import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import Chart from "react-apexcharts";
import variable from '../../helpers/variable'
import { getRandomInt } from '../../helpers/common'
import { NCRPermitChart } from '../../helpers/charts/ncr-chart'
import SideMenu from '../../menu/side-menu';
import ViewWrapper from '../../components/view-wrapper'
import ViewContent from '../../components/view-content';
import NavTop from '../../components/nav-top';
import DateClock from '../../components/date-clock'
import ResponsiveFooterMenu from '../../components/responsive-footer-menu'
import ViewShadowBox from '../../components/view-shadowbox';
import ViewBarContent from '../../components/view-bar-content';
import ViewLabelBox from '../../components/view-label-box';
import HealthSafetyMenu from '../../menu/health-safety-menu';
import ViewContentLabel from '../../components/view-content-label';

function HealthSafety(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();

    let dateCateg = []
    let hotData = [], wallData = [], stairData = [], ceilingData = []

    for (let i = 9; i >= 0; i--) {
        dateCateg.push(moment().subtract(i, 'd').format("DD/MM"))
        hotData.push(getRandomInt(50))
        wallData.push(getRandomInt(50))
        stairData.push(getRandomInt(50))
        ceilingData.push(getRandomInt(50))
    }

    console.log("dateCateg ", dateCateg)

    const [monthlyNCR, setMonthlyNCR] = useState({
        data: [
            { name: "01. 下墜防護", value: 20 },
            { name: "05. 電力", value: 15 },
            { name: "07. 物料堆放", value: 8 },
            { name: "E-08. 蚊蟲及積水控制", value: 6 },
            { name: "06. 機器設備", value: 6 },
            { name: "04. 廢料處理", value: 5 },
            { name: "E-01. 空氣質素監控", value: 4 },
            { name: "E-04. 廢物管理", value: 3 },
            { name: "21. 吊具", value: 3 },
            { name: "14. 出入口", value: 1 },
            { name: "09. 防火", value: 0 },
        ],
        max: 20
    })

    const [topTenWorkType, setTopTenWorkType] = useState({
        data: [
            { name: "強制性安全訓練", value: 154 },
            { name: "金屬工", value: 120 },
            { name: "鋼筋屈紮工", value: 60 },
            { name: "混凝土工", value: 50 },
            { name: "木模板工(樓宇工程...", value: 50 },
            { name: "建造工地測量員", value: 43 },
            { name: "砌磚工", value: 30 },
            { name: "鋪瓦工", value: 30 },
            { name: "批盪工", value: 30 },
            { name: "雲石工(打磨)", value: 2 },
        ],
        max: 154
    })

    const [ncrPermitChart, setNCRPermitChart] = useState(NCRPermitChart(
        [
            { data: hotData, name: t('熱工序') },
            { data: wallData, name: t('外牆/牆邊') },
            { data: stairData, name: t('梯具工作') },
            { data: ceilingData, name: t('假天花工作') },
        ],
        dateCateg
    ))

    console.log("ncrPermitChart ", ncrPermitChart)

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
                <Row className="mb-4">
                    <Col sm={12} md={5} lg={4}>
                        <ViewBarContent
                            data={monthlyNCR}
                            label={t('Monthly_NCR')}
                            className="p-3 mb-4"
                        />
                        <ViewBarContent
                            data={topTenWorkType}
                            color={"bg-dartmouth-green"}
                            label={t('Top_Ten_Work_Type')}
                            className="p-3 mb-4"
                        />
                    </Col>
                    <Col sm={12} md={7} lg={8}>
                        <DateClock />
                        <Row className="mt-4 mb-4">
                            <Col sm={6} md={3}>
                                <div className="d-flex flex-column justify-content-start align-items-start">
                                    <div className="bold font-xm gray mb-2 pb-1">{t('熱工序')}</div>
                                    <ViewLabelBox
                                        data={variable.LABEL_BOX_2}
                                        className="w-100 p-2 box-bg box-fire-bg"
                                    >
                                    </ViewLabelBox>
                                </div>
                            </Col>
                            <Col sm={6} md={3}>
                                <div className="d-flex flex-column justify-content-start align-items-start">
                                    <div className="bold font-xm gray mb-2 pb-1">{t('外牆/樓邊')}</div>
                                    <ViewLabelBox
                                        data={variable.LABEL_BOX_3}
                                        className="w-100 p-2 box-bg box-wall-bg"
                                    >
                                    </ViewLabelBox>
                                </div>
                            </Col>
                            <Col sm={6} md={3}>
                                <div className="d-flex flex-column justify-content-start align-items-start">
                                    <div className="bold font-xm gray mb-2 pb-1">{t('梯具工作')}</div>
                                    <ViewLabelBox
                                        data={variable.LABEL_BOX_2}
                                        className="w-100 p-2 box-bg box-stair-bg"
                                    >
                                    </ViewLabelBox>
                                </div>
                            </Col>
                            <Col sm={6} md={3}>
                                <div className="d-flex flex-column justify-content-start align-items-start">
                                    <div className="bold font-xm gray mb-2 pb-1">{t('假天花工作')}</div>
                                    <ViewLabelBox
                                        data={variable.LABEL_BOX_3}
                                        className="w-100 p-2 box-bg box-ceiling-bg"
                                    >
                                    </ViewLabelBox>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ViewShadowBox>
                                    <ViewContent
                                        css="d-flex justify-content-start align-items-center mb-3"
                                    >
                                        <ViewContentLabel
                                            label={t('Permit_Submission_Status') + "(" + moment().subtract(10, 'd').format("DD/MM/YYYY") + " ~ " + moment().format("DD/MM/YYYY")}
                                        >
                                        </ViewContentLabel>
                                    </ViewContent>
                                    {
                                        (ncrPermitChart.options.xaxis.categories.length > 0) ?
                                            (
                                                <Chart
                                                    options={ncrPermitChart.options}
                                                    series={ncrPermitChart.series}
                                                    height={(ncrPermitChart.options.xaxis.categories.length * 25 > 487) ? ncrPermitChart.options.xaxis.categories.length * 25 : 487}
                                                    type="line"
                                                />
                                            ) :
                                            (null)
                                    }
                                </ViewShadowBox>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={5}>
                        <ViewShadowBox
                            className="p-3 h-100"
                        >
                            <Row className="mb-3">
                                <Col className="font-xl bold text-center p-0">{t('即日出入閘狀況')}</Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center align-items-center">
                                    <div className="gateway-in-icon"></div>
                                    <div className="bold font-48 text-center gateway-box-content">128</div>
                                </Col>
                                <Col className="d-flex justify-content-center align-items-center">
                                    <div className="gateway-out-icon"></div>
                                    <div className="bold font-48 text-center gateway-box-content">26</div>
                                </Col>
                            </Row>
                        </ViewShadowBox>
                    </Col>
                    <Col sm={12} md={7}>
                        <ViewShadowBox 
                            className="p-3 h-100"
                        >
                            <Row className="mb-3">
                                <Col className="font-xl bold px-4">{t('Enviro')}</Col>
                            </Row>
                            <Row>
                                <Col sm={12} md={4} className="d-flex justify-content-center align-items-center flex-column px-4">
                                    <ViewContent
                                        css="d-flex w-100 justify-content-center align-items-center mb-2 pb-1"
                                    >
                                        <div className="temperature-icon mr-2"></div>
                                        <div className="bold font-l text-center min-width-content">28 &deg;C</div>
                                    </ViewContent>
                                    <div className="index-border-lv index-border-lv-1 mb-4 w-100"></div>
                                </Col>
                                <Col sm={12} md={4} className="d-flex justify-content-center align-items-center flex-column px-4">
                                    <ViewContent
                                        css="d-flex w-100 justify-content-center align-items-center mb-2 pb-1"
                                    >
                                        <div className="ear-icon mr-2"></div>
                                        <div className="bold font-l text-center min-width-content">45dB</div>
                                    </ViewContent>
                                    <div className="index-border-lv index-border-lv-2 mb-4 w-100"></div>
                                </Col>
                                <Col sm={12} md={4} className="d-flex justify-content-center align-items-center flex-column px-4">
                                    <ViewContent
                                        css="d-flex w-100 justify-content-center align-items-center mb-2 pb-1"
                                    >
                                        <div className="face-mask-icon mr-2"></div>
                                        <div className="bold font-l text-center min-width-content">5(偏差)</div>
                                    </ViewContent>
                                    <div className="index-border-lv index-border-lv-3 mb-4 w-100"></div>
                                </Col>
                            </Row>
                        </ViewShadowBox>
                    </Col>
                </Row>
            </div>
            <ResponsiveFooterMenu />
        </ViewWrapper >
    )
}

export default HealthSafety