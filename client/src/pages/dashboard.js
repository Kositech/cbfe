import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import SideMenu from '../menu/side-menu';
import variable from '../helpers/variable';
import ViewWrapper from '../components/view-wrapper'
import ViewContent from '../components/view-content';
import NavTop from '../components/nav-top';
import DateClock from '../components/date-clock'
import ViewShadowBox from '../components/view-shadowbox';
import ResponsiveFooterMenu from '../components/responsive-footer-menu';

import skycityImg from '../assets/Skycity1a.png'

function Dashboard(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();

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
                            <ViewContent
                                css="d-flex justify-content-start align-items-center mb-2 px-2"
                            >
                                <div className="info-icon"></div>
                                <div className="ml-2 font-xl bold">{t('Project_summary')}</div>
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
            <ResponsiveFooterMenu />
        </ViewWrapper >
    )
}

export default Dashboard