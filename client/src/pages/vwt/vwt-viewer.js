import React, { useState, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import ViewWrapper from '../../components/view-wrapper'
import SideMenu from '../../menu/side-menu';
import NavTop from '../../components/nav-top'

function VWTViewer(props) {

    return (
        <ViewWrapper id="outer-container" className="font-roboto">
            <SideMenu
                burgerButtonClassName="cb-menu-bth-sm"
            >
            </SideMenu>
            <div id="page-wrap" className="cb-page-wrap cb-dashboard pt-4 pl-5 pr-5 pb-4 mt-1">
                <NavTop showIcon={true} {...props}/>
                <div className="vwt-iframe-wrap">
                    <iframe name="vwt-iframe" src={"/VWT/VWT Sample/wrap.html"} height="100%" width="100%"/>
                </div>
            </div>
        </ViewWrapper>
    )
}

export default VWTViewer