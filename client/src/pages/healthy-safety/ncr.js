import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import Tabs from "react-responsive-tabs";
import Chart from "react-apexcharts";
import SideMenu from '../../menu/side-menu';
import variable from '../../helpers/variable';
import { NCRColumns } from '../../helpers/dataTableColumns';
import { NCRChart } from '../../helpers/charts/ncr-chart'
import ViewWrapper from '../../components/view-wrapper'
import ViewContent from '../../components/view-content';
import NavTop from '../../components/nav-top';
import ResponsiveFooterMenu from '../../components/responsive-footer-menu'
import DateClock from '../../components/date-clock'
import ViewShadowBox from '../../components/view-shadowbox';
import ViewTabs from '../../components/view-tabs';

import "react-responsive-tabs/styles.css";

function NCR(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();

    const [updateNCRData, setUpdateNCRData] = useState(0)
    const [tabs, setTabs] = useState([
        { name: "All", value: -1 },
        { name: 'NEW', value: 1 },
        { name: 'WIP', value: 2 },
        { name: 'COMPLETED', value: 5 },
        { name: 'CLOSED', value: 7 },
        { name: 'REJECTED', value: 8 },
        { name: 'OVERDUE', value: 99 },
        { name: 'LATE', value: 100 },
    ])
    const [ncrData, setNCRData] = useState([
        { applicant: "Ray KS Ho (何敬誠)", pcCompany: "CS 震昇 (地基)", type: "04. 廢料處理", description: "058. 欠清理", status: "NEW", location: "Mid Zone - Mid Zone", time: "12/05/2021 18:00" },
        { applicant: "CK Tsang (曾志強) (震昇地基)", pcCompany: "CS 震昇 (地基)", type: "13. 焊接/氣體火焰切割", description: "270. 風煤壓力錶損毀", status: "NEW", location: "Mid Zone - Mid Zone", time: "07/04/2021 17:30" },
    ])

    const [ncrChart, setNCRChart] = useState(NCRChart(
        [{
            name: '本週期',
            type: 'column',
            data: [1, 4, 5, 1, 1, 7, 2, 1, 1, 3, 3, 1, 4, 1, 2]
        }, {
            name: '上週期',
            type: 'column',
            data: [0, 0, 4, 1, 0, 5, 5, 0, 0, 1, 0, 0, 0, 0, 0]
        }, {
            name: '平均行動回應時間',
            type: 'line',
            data: [2, 1.3, 18, 23, 16, 8, 1.5, 0, 2, 2, 0.7, 23, 11, 1, 3.5]
        }], ["EC宜利(打拆/地盤平...", "GS 創昇(什項)", "Hop Fat 合發(釘板)", "TW 天和(扎鐵)", "WY 宏業(臨時鐵器/圍街板)", "YH 有合(棚)", "明泰(釘板)", "港利(外欄-圍街)", "Alpha Idea星滿(煤氣)", "ATAL 安樂(ELE)", "Lixil Suzuki鈴木 (火閘)", "Majestic定安(水喉)", "Majestic定安(消防)", "Or Sui Ying(柯穗瑛)", "ST 順通 (冷氣)"]
    ))

    useEffect(() => {
        if (typeof (updateNCRData) == "number") {
            // fetch get data
            setUpdateNCRData(null)
        }
    }, [updateNCRData])

    const handleOnViewTabChange = (v, i) => {
        // console.log("handleOnViewTabChange ")
        setUpdateNCRData(i)
    }

    return (
        <ViewWrapper id="outer-container" className="font-roboto">
            <SideMenu
                burgerButtonClassName="cb-menu-bth-sm"
            ></SideMenu>
            <div id="page-wrap" className="cb-ncr pt-4 pl-5 pr-5 pb-4 mt-1">
                <NavTop showIcon={true} />
                <Row>
                    <Col className="d-flex justify-content-start align-items-center mb-5">
                        <div className="ml-6 pl-5 bold font-xl">{t('Crystal_Ball')}</div>
                        <div className="crystal-ball-logo logo-sm ml-2"></div>
                    </Col>
                </Row>
                <div className="font-28 bold deep-dark mb-3">{t('nav_tab.Safety')}</div>
                <Row>
                    <Col className="d-flex justify-content-start align-items-center mt-1 mb-4">
                        {
                            variable.NCR_MENU.map(function (v, i) {
                                let isActive = (v.link == props.match.url) ? "active" : ""
                                return (
                                    <a href={v.link} className="mr-3">
                                        <ViewShadowBox
                                            className={"ncr-menu-wrap px-2 " + isActive}
                                        >
                                            <ViewContent
                                                css="d-flex justify-content-center align-items-center"
                                            >
                                                <div className={v.className}></div>
                                                <div className="font-m bold deep-dark pl-2 ncr-menu-name">{t(v.name)}</div>
                                            </ViewContent>
                                        </ViewShadowBox>
                                    </a>
                                )
                            })
                        }
                    </Col>
                </Row>
                <Row>
                    <Col md={7} className="mt-2 mb-4">
                        <DateClock />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Chart 
                            options={ncrChart.options}
                            series={ncrChart.series}
                            height='487'
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ViewTabs tabs={tabs} onChange={handleOnViewTabChange} />
                        <DataTable
                            data={ncrData}
                            columns={NCRColumns}
                            pagination
                        />
                    </Col>
                </Row>
            </div>
            <ResponsiveFooterMenu />
        </ViewWrapper>
    )
}

export default NCR