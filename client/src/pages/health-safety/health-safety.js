import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import Chart from "react-apexcharts";
import variable from '../../helpers/variable'
import { permitDataFilter, getDateArray, getDateHourlyArray } from '../../helpers/common'
import { NCRPermitChart, reassignPermitChartData, reassignPermitBarChartData, NCRPermitBarChart, NCRBarChart } from '../../helpers/charts/ncr-chart'
import { ptwTypesCountDaily, ptwTypesCountHourlyByDays } from '../../gql/ptwGql'
import SideMenu from '../../menu/side-menu';
import ViewWrapper from '../../components/view-wrapper'
import ViewContent from '../../components/view-content';
import NavTop from '../../components/nav-top';
// import DateClock from '../../components/date-clock'
import ResponsiveFooterMenu from '../../components/responsive-footer-menu'
import ViewShadowBox from '../../components/view-shadowbox';
import ViewBarContent from '../../components/view-bar-content';
import ViewLabelBox from '../../components/view-label-box';
import HealthSafetyMenu from '../../menu/health-safety-menu';
import ViewContentLabel from '../../components/view-content-label';
import ChartFilterBtn from '../../components/chart-filter-btn';
import { _gqlQuery } from '../../gql/apolloClient';


function HealthSafety(props) {
    // let history = useHistory()
    const { t } = useTranslation();
    var [chartFilterStatus, setChartFilterStatus] = useState(1)
    const [dateCateg, setDataCateg] = useState(getDateArray(variable.CHART_DATE_FILTER[chartFilterStatus].startDays))
    const [dateHourlyCateg, setDateHourlyCateg] = useState(getDateHourlyArray())
    const [permitData, setPermitData] = useState({})
    const [permitHourlyData, setPermitHourlyData] = useState({})
    const [rangePermitData, setRangePermitData] = useState([])
    // const [updateNCRPermitData, setUpdateNCRPermitData] = useState({
    //     progress: false
    // })

    const [monthlyNCR, setMonthlyNCR] = useState({
        data: [
            { name: "01. ????????????", value: 20 },
            { name: "05. ??????", value: 15 },
            { name: "07. ????????????", value: 8 },
            { name: "E-08. ?????????????????????", value: 6 },
            { name: "06. ????????????", value: 6 },
            { name: "04. ????????????", value: 5 },
            { name: "E-01. ??????????????????", value: 4 },
            { name: "E-04. ????????????", value: 3 },
            { name: "21. ??????", value: 3 },
            { name: "14. ?????????", value: 1 },
            { name: "09. ??????", value: 0 },
        ],
        max: 20
    })

    const [topTenWorkType, setTopTenWorkType] = useState({
        data: [
            { name: "?????????????????????", value: 154 },
            { name: "?????????", value: 120 },
            { name: "???????????????", value: 60 },
            { name: "????????????", value: 50 },
            { name: "????????????(????????????...", value: 50 },
            { name: "?????????????????????", value: 43 },
            { name: "?????????", value: 30 },
            { name: "?????????", value: 30 },
            { name: "?????????", value: 30 },
            { name: "?????????(??????)", value: 2 },
        ],
        max: 154
    })

    const [ncrPermitChart, setNCRPermitChart] = useState(NCRPermitChart(
        [
            { data: [], name: t('?????????') },
            { data: [], name: t('??????/??????') },
            { data: [], name: t('????????????') },
            { data: [], name: t('???????????????') },
        ],
        dateCateg
    ))

    const [ncrPermitTodayChart, setNCRPermitTodayChart] = useState(NCRBarChart(
        [],
        [],
        false
    ))

    const fetchTypesCountDaily = async (updatePermiData = false) => {
        let startDate = moment().subtract(variable.CHART_DATE_FILTER[chartFilterStatus].startDays, 'days').startOf('day').format("YYYY-MM-DD HH:mm:ss")
        let endDate = moment().subtract(variable.CHART_DATE_FILTER[chartFilterStatus].endDays, 'days').endOf('day').format("YYYY-MM-DD HH:mm:ss")
        let newPermitData = {}
        var reassignedPermitData = {}

        for (let i = 0; i < variable.PERMIT_TYPE.length; i++) {
            let items = await _gqlQuery(ptwTypesCountDaily, { site: -1, type: variable.PERMIT_TYPE[i], startDate: startDate, endDate: endDate })

            if (typeof (items.errors) !== "undefined") {

            } else {
                newPermitData[variable.PERMIT_TYPE[i]] = items.data.ptwTypesCountDaily[0].data
            }
            // Is last type
            if (i === variable.PERMIT_TYPE.length - 1) {
                if (updatePermiData) {
                    setPermitData(newPermitData)
                }

                reassignedPermitData = reassignPermitChartData(newPermitData)

                Object.keys(reassignedPermitData).forEach(function (key) {
                    reassignedPermitData[key].name = t(reassignedPermitData[key].name)
                })

                // console.log("reassignedPermitData ", reassignedPermitData, newPermitData)
                setRangePermitData(reassignedPermitData)

                setNCRPermitChart(NCRPermitChart(
                    reassignedPermitData,
                    dateCateg
                ))
            }
        }
    }

    const fetchTypesCountHourly = async () => {
        let date = moment().format("YYYY-MM-DD")
        let newPermitHourlyData = {}
        var reassignedPermitData = {}
        for (let i = 0; i < variable.PERMIT_TYPE.length; i++) {
            let items = await _gqlQuery(ptwTypesCountHourlyByDays, { site: -1, type: variable.PERMIT_TYPE[i], startDate: date, endDate: date })
            if (typeof (items.errors) !== "undefined") {

            } else {
                newPermitHourlyData[variable.PERMIT_TYPE[i]] = items.data.ptwTypesCountHourlyByDays
            }
            // Is last type
            if (i === variable.PERMIT_TYPE.length - 1) {
                setPermitHourlyData(newPermitHourlyData)

                reassignedPermitData = reassignPermitChartData(newPermitHourlyData)

                Object.keys(reassignedPermitData).forEach(function (key) {
                    reassignedPermitData[key].name = t(reassignedPermitData[key].name)
                })

                console.log("reassignedPermitData fetchTypesCountHourly", reassignedPermitData)
                setRangePermitData(reassignedPermitData)
                setNCRPermitTodayChart(NCRBarChart(
                    reassignedPermitData,
                    dateHourlyCateg,
                    false
                ))
            }
        }
    }

    useEffect(() => {
        fetchTypesCountDaily(true)
    }, [])

    useEffect(() => {
        fetchTypesCountDaily(false)
    }, [dateCateg])

    useEffect(() => {
        if(chartFilterStatus == 0){
            fetchTypesCountHourly()
        }else{
            setDataCateg(getDateArray(variable.CHART_DATE_FILTER[chartFilterStatus].startDays, variable.CHART_DATE_FILTER[chartFilterStatus].endDays))
        }
    }, [chartFilterStatus])

    const renderRangePermitDataCount = () => {
        let layout = []
        // console.log("rangePermitData ", rangePermitData)
        rangePermitData.map(function (v, i) {
            let total = v.data.reduce(function (d, j) {
                return d + j
            })

            // console.log("total ", total)

            layout.push(
                <Col xs={6} sm={6} md={6} lg={3} key={i} className="d-flex justify-content-around align-items-center">
                    <div className="d-flex justify-content-between align-items-center font-xm gray">
                        {t(v.name)}
                    </div>
                    <div className="font-xm deep-dark">{total}</div>
                </Col>
            )
        })

        return (
            <Row className="cb-range-permit-data-wrap mb-3">
                {layout}
            </Row>
        )
    }

    // console.log("ncrPermitTodayChart" ,ncrPermitTodayChart, ncrPermitTodayChart.options.xaxis.categories.length)

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
                        <Row className="mb-4">
                            <Col sm={6} md={3}>
                                <div className="d-flex flex-column justify-content-start align-items-start">
                                    <div className="bold font-xm gray mb-2 pb-1">{t('?????????')}</div>
                                    <ViewLabelBox
                                        data={permitDataFilter(permitData, "THERMAL", t)}
                                        className="w-100 p-2 box-bg box-fire-bg"
                                    >
                                    </ViewLabelBox>
                                </div>
                            </Col>
                            <Col sm={6} md={3}>
                                <div className="d-flex flex-column justify-content-start align-items-start">
                                    <div className="bold font-xm gray mb-2 pb-1">{t('??????/??????')}</div>
                                    <ViewLabelBox
                                        data={permitDataFilter(permitData, "SIDEWALK", t)}
                                        className="w-100 p-2 box-bg box-wall-bg"
                                    >
                                    </ViewLabelBox>
                                </div>
                            </Col>
                            <Col sm={6} md={3}>
                                <div className="d-flex flex-column justify-content-start align-items-start">
                                    <div className="bold font-xm gray mb-2 pb-1">{t('????????????')}</div>
                                    <ViewLabelBox
                                        data={permitDataFilter(permitData, "LADDER", t)}
                                        className="w-100 p-2 box-bg box-stair-bg"
                                    >
                                    </ViewLabelBox>
                                </div>
                            </Col>
                            <Col sm={6} md={3}>
                                <div className="d-flex flex-column justify-content-start align-items-start">
                                    <div className="bold font-xm gray mb-2 pb-1">{t('???????????????')}</div>
                                    <ViewLabelBox
                                        data={permitDataFilter(permitData, "FALSECEILING", t)}
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
                                            lableClassName={"ml-2 mt-6 font-xm bold"}
                                            label={t('Permit_Submission_Status') + "(" + moment().subtract(variable.CHART_DATE_FILTER[chartFilterStatus].startDays, 'd').format("DD/MM/YYYY") + " ~ " + moment().subtract(variable.CHART_DATE_FILTER[chartFilterStatus].endDays, 'd').format("DD/MM/YYYY") + ")"}
                                        >
                                        </ViewContentLabel>
                                        <div className="position-absolute cb-chart-date-filter d-flex justify-content-start align-items-center">
                                            {/* <Select placeholder={t('Date_Filter')} options={variable.CHART_DATE_FILTER}>
                                            </Select> */}
                                            <ChartFilterBtn
                                                data={variable.CHART_DATE_FILTER}
                                                chartFilterStatus={chartFilterStatus}
                                                setChartFilterStatus={setChartFilterStatus}
                                            />
                                        </div>
                                    </ViewContent>
                                    {
                                        (ncrPermitTodayChart.options.xaxis.categories.length > 0 && chartFilterStatus === 0) ?
                                            (
                                                <Chart
                                                    options={ncrPermitTodayChart.options}
                                                    series={ncrPermitTodayChart.series}
                                                    height={(ncrPermitTodayChart.options.xaxis.categories.length * 25 > 487) ? ncrPermitTodayChart.options.xaxis.categories.length * 25 : 487}
                                                    type="bar"
                                                />
                                            ) :
                                            (null)
                                    }
                                    {
                                        (ncrPermitChart.options.xaxis.categories.length > 0 && chartFilterStatus !== 0) ?
                                            (
                                                <>
                                                    {renderRangePermitDataCount()}
                                                    <Chart
                                                        options={ncrPermitChart.options}
                                                        series={ncrPermitChart.series}
                                                        height={478}
                                                        type={'line'}
                                                    />
                                                </>
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
                                <Col className="font-xl bold text-center p-0">{t('?????????????????????')}</Col>
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
                                        <div className="bold font-l text-center min-width-content">5(??????)</div>
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