import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap'
import moment from 'moment'
import DataTable from 'react-data-table-component';
import Tabs from "react-responsive-tabs";
import { Dropdown } from 'semantic-ui-react';
import Chart from "react-apexcharts";
import { _gqlQuery } from '../../gql/apolloClient';
import { ncrByCompanyAndStatusRecentMonthsGQL, ncrDetailByStatusGQL, ncrAverageResponseDayGQL } from '../../gql/ncrGql'
import SideMenu from '../../menu/side-menu';
import variable from '../../helpers/variable';
import { NCRColumns } from '../../helpers/dataTableColumns';
import { NCRChart, NCRPeriodChartDataReassign, NCRAverageResponseDayDataReassign, NCRAvgResponseDaySorting } from '../../helpers/charts/ncr-chart'
import useNCRStatus from '../../hook/use-ncr-status';
import ViewWrapper from '../../components/view-wrapper'
import ViewContent from '../../components/view-content';
import NavTop from '../../components/nav-top';
import ResponsiveFooterMenu from '../../components/responsive-footer-menu'
import DateClock from '../../components/date-clock'
import ViewShadowBox from '../../components/view-shadowbox';
import ViewTabs from '../../components/view-tabs';
import HealthSafetyMenu from '../../menu/health-safety-menu';

import "react-responsive-tabs/styles.css";

function NCR(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();
    const [tabs, setTabs] = useNCRStatus()

    const [updateNCRData, setUpdateNCRData] = useState({
        total: 0,
        skip: 0,
        page: 1,
        take: variable.DATA_TABLE_PER_PAGE,
        currentValue: 0,
        process: false
    })
    // const [tabs, setTabs] = useState([
    // ])
    const [uiControl, setUIControl] = useState({
        ncrChartCurrentStatus: 0,
        ncrChartStatusProgress: false,
        ncrChartCurrentSort: 0,
        ncrChartSort: variable.NCR_CHART_SORT
    })

    const [ncrData, setNCRData] = useState([
    ])

    const [ncrChart, setNCRChart] = useState(NCRChart(
        [], [], 0
    ))

    async function fetchNCRData() {
        let items = await _gqlQuery(ncrDetailByStatusGQL,
            {
                project: -1, status: tabs[updateNCRData.currentValue]["key"],
                skip: updateNCRData.skip, take: updateNCRData.take
            })
        // console.log("fetchNCRData ", items)
        if (typeof (items.errors) !== "undefined") {

        } else {
            setNCRData(items.data.ncrDetailByStatus[0].ncrData)
            setUpdateNCRData({
                ...updateNCRData,
                total: items.data.ncrDetailByStatus[0].total,
                process: false
            })
        }
    }

    async function fetchNCRChart() {
        let items = await _gqlQuery(ncrByCompanyAndStatusRecentMonthsGQL, {
            status: tabs[uiControl.ncrChartCurrentStatus]["key"],
            sort: uiControl.ncrChartSort[uiControl.ncrChartCurrentSort].value,
            project: -1, dateTime: moment().format('YYYY-MM-DD HH:mm:ss')
        })

        let avgResponseDay = await _gqlQuery(ncrAverageResponseDayGQL, {
            status: tabs[uiControl.ncrChartCurrentStatus]["key"],
            project: -1, dateTime: moment().format('YYYY-MM-DD HH:mm:ss')
        })


        if (typeof (items.errors) !== "undefined") {

        } else {
            let newResult = NCRPeriodChartDataReassign(items.data.ncrByCompanyAndStatusRecentMonths[0], "company_name")
            let newAvgResponseDay = NCRAverageResponseDayDataReassign(avgResponseDay.data.ncrAverageResponseDay[0], "company_name")

            // console.log("NCRPeriodChartDataReassign newResult ", newResult, newAvgResponseDay)
            newAvgResponseDay = NCRAvgResponseDaySorting(newAvgResponseDay, newResult)
            let max = (newResult.max > newAvgResponseDay.max) ? newResult.max : newAvgResponseDay.max

            setNCRChart(NCRChart(
                [
                    { data: newResult.thisMonthData, name: "本月份", type: "column" },
                    { data: newResult.previousMonthData, name: "上月份", type: 'column' },
                    { data: newAvgResponseDay.avgdata, name: "平均行動回應時間(日)", type: 'line' }
                ],
                newResult.xcategoires,
                max
            ))
        }
    }

    useEffect(() => {
        if (tabs.length > 0) {
            // console.log("tabs", tabs, tabs[updateNCRData.currentValue]["key"])
            fetchNCRChart()
            fetchNCRData()
        }
    }, [tabs])

    useEffect(() => {
        // console.log("updateNCRData fire")
        if (updateNCRData.process) {
            fetchNCRData()
        }
    }, [updateNCRData])

    useEffect(() => {

        if (uiControl.ncrChartStatusProgress) {
            console.log("uiControl.ncrChartCurrentStatus update")
            fetchNCRChart()
            setUIControl({
                ...uiControl,
                ncrChartStatusProgress: false
            })
        }
    }, [uiControl.ncrChartCurrentStatus, uiControl.ncrChartStatusProgress])

    const handleOnViewTabChange = (v, i) => {
        // console.log("handleOnViewTabChange ", updateNCRData)

        setUpdateNCRData({
            ...updateNCRData,
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
            <div id="page-wrap" className="cb-page-wrap cb-ncr pt-4 pl-5 pr-5 pb-4 mt-1">
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
                    <Col className="d-flex jusitify-content-start align-items-center mb-3">
                        <div className="font-l bold mr-3">{t("Number_of_NC_Contractor")}</div>
                        <Dropdown
                            selection
                            options={tabs}
                            className={"cb-tabs-dropdown mr-3"}
                            value={(tabs.length > 0) ? tabs[uiControl.ncrChartCurrentStatus].value : ""}
                            onChange={(e, data) => {
                                const { value } = data
                                const index = tabs.findIndex(o => o.value === value);
                                setUIControl({
                                    ...uiControl,
                                    ncrChartCurrentStatus: index,
                                    ncrChartStatusProgress: true
                                })
                            }}
                        />
                        <Dropdown
                            selection
                            options={uiControl.ncrChartSort}
                            className={"cb-tabs-dropdown"}
                            value={uiControl.ncrChartSort[uiControl.ncrChartCurrentSort].value}
                            onChange={(e, data) => {
                                const { value } = data
                                const index = uiControl.ncrChartSort.findIndex(o => o.value === value);
                                setUIControl({
                                    ...uiControl,
                                    ncrChartCurrentSort: index,
                                    ncrChartStatusProgress: true
                                })
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {/* {
                            (ncrChart.options.xaxis.categories.length == 0) ?
                                (
                                    <div className="position-absolute cb-overlay w-100 h-100 d-flex justify-content-center align-items-center">
                                        <div className="font-l bold">{t('no-data')}</div>
                                    </div>
                                ) :
                                (null)
                        } */}
                        <Chart
                            options={ncrChart.options}
                            series={ncrChart.series}
                            height={487}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ViewTabs tabs={tabs} onChange={handleOnViewTabChange} />
                        <div className="cb-data-table">
                            <DataTable
                                data={ncrData}
                                columns={NCRColumns}
                                pagination
                                paginationPerPage={updateNCRData.take}
                                paginationTotalRows={updateNCRData.total}
                                paginationServer
                                onChangeRowsPerPage={(currentRowsPerPage, currentPage) => {
                                    setUpdateNCRData({
                                        ...updateNCRData,
                                        take: currentRowsPerPage,
                                        process: true
                                    })
                                }}
                                onChangePage={async (page, totalRows) => {
                                    console.log("page ", page, updateNCRData.take)
                                    setUpdateNCRData({
                                        ...updateNCRData,
                                        skip: (page - 1),
                                        page: page,
                                        process: true
                                    })
                                }}
                                paginationDefaultPage={updateNCRData.page}
                                striped={true}
                                noHeader={true}
                                sortServer
                                onSort={async (column, sortDirection, event) => {
                                    console.log("onSort column", column, sortDirection)

                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
            <ResponsiveFooterMenu />
        </ViewWrapper>
    )
}

export default NCR