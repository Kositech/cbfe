// import React, { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import variable from '../helpers/variable';
import { Dropdown } from 'semantic-ui-react'
import NavTopItem from '../components/nav-top-item'
import ViewContent from '../components/view-content';

import dummy from '../helpers/dummy'
import DateClock from './date-clock';

function NavTop(props) {
    // let history = useHistory()
    // const { t } = useTranslation();

    // const [notificationBoxEnable, setNotificationBoxEnable] = useState(false)

    // useEffect(() => {
    //     //Fetch notification
    // }, [])

    // useEffect(() => {
    //     // Socket?
    //     if(notificationBoxEnable){

    //     }
    // }, [notificationBoxEnable])

    return (
        <ViewContent
            css="position-absolute d-flex justify-content-end align-items-start nav-top"
        >
            <div className="logo logo-md mt-3 mr-2"></div>
            <div className="slogan slogan-sm mt-3 mr-2"></div>
            <div className="nav-top-menu container-fluid">
                <Row>
                    <Col className="d-flex justify-content-end align-items-end p-0">
                        <div className="w-100 border-deep-dark">
                            {/* <div className="font-n px-3 py-2">{t('Project')}</div> */}
                            <DateClock 
                                fontSize={16}
                            />
                            <Dropdown
                                fluid
                                search
                                selection
                                options={dummy.projects}
                                value="17104 CSS"
                                className={"nav-top-dropdown"}
                            />
                        </div>
                        <div className="cb-notifications-icon mx-3 my-2 pointer">
                            <span>8</span>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {
                        variable.NAV_TAB.map(function (v, i) {
                            return (<NavTopItem value={v} {...props} key={i}/>)
                        })
                    }
                </Row>
            </div>
        </ViewContent>
    )
}

export default NavTop