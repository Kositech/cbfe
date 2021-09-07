import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import SideMenu from '../menu/side-menu';
import ViewWrapper from '../components/view-wrapper'

function ProjectSelect(props) {
    const { t } = useTranslation();

    return (
        <ViewWrapper id="outer-container">
            <SideMenu >
            </SideMenu>
            <div id="page-wrap">
                <Row>
                    <Col>

                    </Col>
                    <Col>
                        This is project select
                    </Col>
                </Row>
            </div>
        </ViewWrapper>
    )
}

export default ProjectSelect