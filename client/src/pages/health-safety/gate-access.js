import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import moment from 'moment'
import Chart from "react-apexcharts";
import variable from '../../helpers/variable'
import NavTop from '../../components/nav-top';
import ResponsiveFooterMenu from '../../components/responsive-footer-menu'
import ViewWrapper from '../../components/view-wrapper'
import ViewContent from '../../components/view-content'
import DateClock from '../../components/date-clock'
import HealthSafetyMenu from '../../menu/health-safety-menu'
import SideMenu from '../../menu/side-menu'
import ViewShadowBox from '../../components/view-shadowbox';

function GateAccess(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();

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
                
            </div>
            <ResponsiveFooterMenu />
        </ViewWrapper>
    )
}

export default GateAccess