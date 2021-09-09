import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap'
import moment from 'moment';
import SideMenu from '../menu/side-menu';
import variable from '../helpers/variable';
import ViewWrapper from '../components/view-wrapper'
import ViewContent from '../components/view-content';
import NavTop from '../components/nav-top';
import NavTopItem from '../components/nav-top-item'
import DateClock from '../components/date-clock'
import ViewShadowBox from '../components/view-shadowbox';

import skycityImg from '../assets/Skycity1a.png'

function Dashboard(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();

    return (
        <ViewWrapper id="outer-container" className="font-roboto">
            <SideMenu
                burgerButtonClassName="cb-menu-bth-sm"
            >
            </SideMenu>
            <div id="page-wrap" className="cb-dashboard pt-4 pl-5 pr-5 pb-4 mt-1">
                <NavTop showIcon={true} />
                <Row>
                    <Col className="d-flex justify-content-start align-items-center mb-5">
                        <div className="ml-6 pl-5 bold font-xl">{t('Crystal_Ball')}</div>
                        <div className="crystal-ball-logo logo-sm ml-2"></div>
                    </Col>
                </Row>
                <Row>
                    <Col md={7} className="mt-2 mb-4">
                        <DateClock />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={4} >
                        <ViewShadowBox >
                            <ViewContent>
                                <div className="info-icon"></div>
                                <div className="ml-1">{t('Project_summary')}</div>
                            </ViewContent>
                            <ViewContent
                                css="d-flex justify-content-between align-items-center"
                            >
                                <img src={skycityImg} />
                                <div>Skycity</div>
                                <div className=""></div>
                            </ViewContent>
                        </ViewShadowBox>
                        <Row>
                            <Col sm={12} md={6}>

                            </Col>
                            <Col sm={12} md={6}>

                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12} md={8} >

                    </Col>
                </Row>
            </div>
            <div className="footer-menu-wrap"></div>
            <div className="footer-menu bg-sky-green white container-fluid nav-top-menu">
                <Row style={{ height: "100%" }}>
                    {
                        variable.NAV_TAB.map(function (v, i) {
                            return (<NavTopItem value={v} />)
                        })
                    }
                </Row>
            </div>
        </ViewWrapper >
    )
}

export default Dashboard