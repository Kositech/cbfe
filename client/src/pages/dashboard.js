import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import { Carousel } from 'react-responsive-carousel';
import Cookies from 'js-cookie';
import moment from 'moment';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NCRBarChart, NCRPeriodChartDataReassign } from '../helpers/charts/ncr-chart'
import Chart from "react-apexcharts";
import SideMenu from '../menu/side-menu';
import { _gqlQuery } from '../gql/apolloClient';
import { ncrTypesCountRecentMonthsGQL } from '../gql/ncrGql';
import { ptwTypesCountDaily } from '../gql/ptwGql'
import { permitDataFilter } from '../helpers/common'
import variable from '../helpers/variable';
import ViewWrapper from '../components/view-wrapper'
import ViewContent from '../components/view-content';
import NavTop from '../components/nav-top';
import DateClock from '../components/date-clock'
import ViewShadowBox from '../components/view-shadowbox';
import ResponsiveFooterMenu from '../components/responsive-footer-menu';
import ViewLabelBox from '../components/view-label-box';
import skycityImg from '../assets/Skycity1a.png'
import ViewContentLabel from '../components/view-content-label';

import dummy from '../helpers/dummy';

function Dashboard(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();

    const [ncrPeriodChart, setNCRPeriodChart] = useState(NCRBarChart(
        [{
            data: [], name: "本月份"
        }, {
            data: [], name: "上月份"
        }],
        []
    ))

    const [permitData, setPermitData] = useState({})

    useEffect(() => {
        async function fetchData() {
            let items = await _gqlQuery(ncrTypesCountRecentMonthsGQL, { site: -1, dateTime: moment().format('YYYY-MM-DD HH:mm:ss') })

            if (typeof (items.errors) !== "undefined") {

            } else {
                console.log("fetchData ", items)
                let newResult = NCRPeriodChartDataReassign(items.data.ncrTypesCountRecentMonths[0])

                setNCRPeriodChart(NCRBarChart(
                    [{
                        data: newResult.thisMonthData, name: "本月份"
                    }
                    , {
                        data: newResult.previousMonthData, name: "上月份"
                    }],
                    newResult.xcategoires
                ))
            }
        }
        async function fetchDailyPermit() {
            let startDate = moment().startOf('day').format("YYYY-MM-DD HH:mm:ss")
            let endDate = moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")
            let newPermitData = {}

            for (let i = 0; i < variable.PERMIT_TYPE.length; i++) {
                let items = await _gqlQuery(ptwTypesCountDaily, { site: -1, type: variable.PERMIT_TYPE[i], startDate: startDate, endDate: endDate })
                if (typeof (items.errors) !== "undefined") {

                } else {
                    newPermitData[variable.PERMIT_TYPE[i]] = items.data.ptwTypesCountDaily[0].data
                }

                // Is last type
                if (i == variable.PERMIT_TYPE.length - 1) {
                    setPermitData(newPermitData)
                }
            }
        }

        fetchData()
        fetchDailyPermit()
    }, [])

    const dailyPermitCount = () => {
        var submitted = 0
        var approved = 0
        for (let i = 0; i < variable.PERMIT_TYPE.length; i++) {
            approved += permitDataFilter(permitData, variable.PERMIT_TYPE[i], t)[1].value
            submitted += permitDataFilter(permitData, variable.PERMIT_TYPE[i], t)[0].value
        }

        return [
            {
                label: t("Submitted"),
                value: submitted
            },
            {
                label: t("Approved"),
                value: approved
            }
        ]
    }

    const renderSummary = (label, value) => {
        return (
            <Row className="w-100 dark-gray">
                <Col md={5} className="d-flex align-items-center">
                    <div className="check-icon"></div>
                    <div className="ml-2">{label}:</div>
                </Col>
                <Col md={7}>
                    <div className="">
                        {value}
                    </div>
                </Col>
            </Row>
        )
    }

    console.log("ncrPeriodChart", Cookies.get("cookies"))

    return (
        <ViewWrapper id="outer-container" className="font-roboto">
            <SideMenu
                burgerButtonClassName="cb-menu-bth-sm"
            >
            </SideMenu>
            <div id="page-wrap" className="cb-page-wrap cb-dashboard pt-4 pl-5 pr-5 pb-4 mt-1">
                <NavTop showIcon={true} {...props} />
                <Row>
                    <Col className="d-flex justify-content-start align-items-center mb-5">
                        <div className="ml-6 pl-5 bold font-xl">{t('Crystal_Ball')}</div>
                        <div className="crystal-ball-logo logo-sm ml-2"></div>
                    </Col>
                </Row>
                <Row>
                    <Col md={7} className="mt-2 mb-4">
                        {/* <DateClock /> */}
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={5} >
                        <ViewShadowBox
                            className="p-3 mb-3"
                        >
                            <ViewContent
                                css="d-flex justify-content-start align-items-center mb-2 px-2"
                            >
                                <ViewContentLabel
                                    icon="info-icon"
                                    label={t('Project_summary')}
                                >
                                </ViewContentLabel>
                            </ViewContent>
                            <div className="align-items-center w-100">
                                <img src={skycityImg} className="img-shadow w-100" />
                            </div>
                            <ViewContent
                                css="d-flex justify-content-start align-items-start flex-column px-2"
                            >
                                <div className="font-n deep-dark mb-1 bold">Skycity</div>
                                {renderSummary(t('Site_Area'), "48,412.00 m2 / 521,102.00 ft2")}
                                {renderSummary(t('GFA'), "267,480.00 m2 / 2,879,131.00 ft2")}
                                {renderSummary(t('CFA'), "400,161.00 m2 / 4,301,131.00 ft2")}
                                {renderSummary(t('PD/PIC Name + Contact'), "ABCD, Mr. Poon Wan Kong")}
                                {renderSummary(t('GFA'), "+852 2222 2222")}
                            </ViewContent>
                        </ViewShadowBox>
                        <Row>
                            <Col md={12} lg={6} className="mb-3">
                                <ViewShadowBox >
                                    <ViewContent
                                        css="d-flex justify-content-start align-items-center flex-column mb-2 px-2"
                                    >
                                        <ViewContent
                                            css="d-flex justify-content-start align-items-center w-100 mb-4"
                                        >
                                            <ViewContentLabel
                                                icon="tree-icon"
                                                label={t('Enviro')}
                                            >
                                            </ViewContentLabel>
                                        </ViewContent>
                                        <ViewContent
                                            css="d-flex justify-content-center align-items-center w-100 mb-3 pb-1"
                                        >
                                            <div className="temperature-icon"></div>
                                            <div className="bold font-l text-center min-width-content">28 &deg;C</div>
                                        </ViewContent>
                                        <div className="index-border-lv index-border-lv-1 mb-4 w-100"></div>
                                        <ViewContent
                                            css="d-flex justify-content-center align-items-center w-100 mb-3 pb-1"
                                        >
                                            <div className="ear-icon"></div>
                                            <div className="bold font-l text-center min-width-content">45dB</div>
                                        </ViewContent>
                                        <div className="index-border-lv index-border-lv-2 mb-4 w-100"></div>
                                        <ViewContent
                                            css="d-flex justify-content-center align-items-center w-100 mb-3 pb-1"
                                        >
                                            <div className="face-mask-icon"></div>
                                            <div className="bold font-l text-center min-width-content">5(偏差)</div>
                                        </ViewContent>
                                        <div className="index-border-lv index-border-lv-3 mb-4 w-100"></div>
                                    </ViewContent>
                                </ViewShadowBox>
                            </Col>
                            <Col md={12} lg={6} className="mb-3">
                                <ViewShadowBox className="h-100 p-3">
                                    <ViewContent
                                        css="d-flex justify-content-start align-items-start flex-column mb-2 px-2"
                                    >
                                        <ViewContent
                                            css="d-flex justify-content-start align-items-center w-100"
                                        >
                                            <ViewContentLabel
                                                icon="door-left-icon"
                                                label={t('即日出入閘')}
                                            >
                                            </ViewContentLabel>
                                        </ViewContent>
                                    </ViewContent>
                                    <ViewContent
                                        css="d-flex justify-content-center align-items-center flex-column mb-2 px-2 gateway-box"
                                    >
                                        <ViewContent
                                            css="d-flex justify-content-center align-items-center w-100"
                                        >
                                            <div className="gateway-in-icon"></div>
                                            <div className="bold font-48 text-center gateway-box-content">128</div>
                                        </ViewContent>
                                        <ViewContent
                                            css="d-flex justify-content-center align-items-center w-100"
                                        >
                                            <div className="gateway-out-icon"></div>
                                            <div className="bold font-48 text-center gateway-box-content">26</div>
                                        </ViewContent>
                                    </ViewContent>
                                </ViewShadowBox>
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12} md={7} >
                        <ViewShadowBox
                            className="p-3 mb-3"
                        >
                            <ViewContent
                                css="d-flex flex-column justify-content-start align-items-start"
                            >
                                <div className="font-xm bold deep-dark mb-2">{t('Announcement')}:</div>
                                <Carousel
                                    autoPlay={true}
                                    showArrows={true}
                                    infiniteLoop={true}
                                    showStatus={false}
                                    showThumbs={false}
                                    showIndicators={false}
                                    dynamicHeight={true}
                                    className="announcement-carousel"
                                    axis="vertical"
                                >
                                    {
                                        dummy.announcement.map(function (a, i) {
                                            return (
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div className="bold font-xm deep-dark text-left">
                                                        {a.announcement}
                                                    </div>
                                                    <div className="font-s gray announcement-carousel-date">{a.date}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </Carousel>
                            </ViewContent>
                        </ViewShadowBox>
                        <ViewShadowBox>
                            <ViewContent
                                css="d-flex justify-content-start align-items-center mb-3"
                            >
                                <ViewContentLabel
                                    icon="worker-icon"
                                    label={t('PTW_and_NCR')}
                                >
                                </ViewContentLabel>
                            </ViewContent>
                            <Row>
                                <Col md={12} lg={12} className="mb-3">
                                    <div className="d-flex flex-column justify-content-start align-items-start px-2">
                                        <div className="bold font-xm gray mb-2 pb-1">{t('即日工作')}</div>
                                        <ViewLabelBox
                                            data={dailyPermitCount()}
                                            className="w-100 p-2 box-bg box-vector-bg"
                                        >
                                        </ViewLabelBox>
                                    </div>
                                </Col>
                                {/* <Col md={12} lg={8} className="mb-3">
                                    <div className="pr-2">
                                        <div className="border-gray p-3 mb-3">
                                            <Carousel
                                                autoPlay={false}
                                                showArrows={true}
                                                infiniteLoop={true}
                                                showStatus={false}
                                                showThumbs={false}
                                                showIndicators={false}
                                                className="cb-carousel"
                                            >
                                                <div className="pb-2">
                                                    <Row>
                                                        <Col>
                                                            <div className="d-flex flex-column justify-content-start align-items-start px-2">
                                                                <div className="bold font-xm gray mb-2 pb-1">{t('熱工序')}</div>
                                                                <ViewLabelBox
                                                                    data={permitDataFilter(permitData, "THERMAL", t)}
                                                                    className="w-100 p-2 box-bg box-fire-bg"
                                                                >
                                                                </ViewLabelBox>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="d-flex flex-column justify-content-start align-items-start px-2">
                                                                <div className="bold font-xm gray mb-2 pb-1">{t('外牆/樓邊')}</div>
                                                                <ViewLabelBox
                                                                    data={permitDataFilter(permitData, "SIDEWALK", t)}
                                                                    className="w-100 p-2 box-bg box-wall-bg"
                                                                >
                                                                </ViewLabelBox>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="pb-2">
                                                    <Row>
                                                        <Col>
                                                            <div className="d-flex flex-column justify-content-start align-items-start px-2">
                                                                <div className="bold font-xm gray mb-2 pb-1">{t('梯具工作')}</div>
                                                                <ViewLabelBox
                                                                    data={permitDataFilter(permitData, "LADDER", t)}
                                                                    className="w-100 p-2 box-bg box-stair-bg"
                                                                >
                                                                </ViewLabelBox>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="d-flex flex-column justify-content-start align-items-start px-2">
                                                                <div className="bold font-xm gray mb-2 pb-1">{t('假天花工作')}</div>
                                                                <ViewLabelBox
                                                                    data={permitDataFilter(permitData, "FALSECEILING", t)}
                                                                    className="w-100 p-2 box-bg box-ceiling-bg"
                                                                >
                                                                </ViewLabelBox>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Carousel>
                                        </div>
                                    </div>
                                </Col> */}
                            </Row>
                            <div className="px-2">
                                <div className="border-gray p-3 mb-3">
                                    <div className="bold deep-dark font-xm">{t('Accumulated_NCR_current_month', {month: moment().format("M")})}</div>
                                    <Row>
                                        <Col>
                                            {
                                                (ncrPeriodChart.options.xaxis.categories.length > 0) ?
                                                    (
                                                        <Chart
                                                            options={ncrPeriodChart.options}
                                                            series={ncrPeriodChart.series}
                                                            height={(ncrPeriodChart.options.xaxis.categories.length * 25 > 487) ? ncrPeriodChart.options.xaxis.categories.length * 25 : 487}
                                                            type="bar"
                                                        />
                                                    ) :
                                                    (null)
                                            }
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </ViewShadowBox>
                    </Col>
                </Row>
            </div>
            <ResponsiveFooterMenu />
        </ViewWrapper >
    )
}

export default Dashboard