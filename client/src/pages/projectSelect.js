import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap'
import SideMenu from '../menu/side-menu';
import { Dropdown } from 'semantic-ui-react'
import ViewWrapper from '../components/view-wrapper'
import ViewContent from '../components/view-content';

import dummy from '../helpers/dummy'

function ProjectSelect(props) {
    let history = useHistory()
    const { t } = useTranslation();

    const [nextDisable, setNextDisable] = useState(true)
    const [project, setProject] = useState(null)
    const [process, setProcess] = useState(false)

    useEffect(() => {
        if (project !== null) {
            setNextDisable(false)
        }
    }, [project])

    useEffect(() => {
        // console.log("process ", process)
        if(process){
            setProcess(false)
            handleNextOnClick()
        }
    }, [process])

    const handleNextOnClick = () => {
        history.push('/')
    }

    return (
        <ViewWrapper id="outer-container">
            <SideMenu >
            </SideMenu>
            <div id="page-wrap" className="project-select">
                <Row>
                    <Col>
                        <div className="cb-user-profile-wrap">
                            <div className="cb-user-profile">
                                <a href="#"></a>
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <ViewContent
                            css="d-flex justify-content-end align-items-end pt-1 pr-1 mt-3 mr-3"
                        >
                            <div className="crystal-ball-logo"></div>
                        </ViewContent>
                    </Col>
                </Row>
                <div className="project-select-header"></div>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <div className="project-select-box pl-6 pr-6 pt-6 pb-6">
                            <ViewContent
                                css="d-flex justify-content-start align-items-start mt-1 ml-2 pl-1 mb-1 mr-2 pr-1 flex-column"
                            >
                                <div className="bold fst-italic font-36 dark pb-6">{t('Hello') + ", Max!"}</div>
                                <div className="bold fst-italic font-s light-blue mb-5">{t('project_select_description')}</div>
                                <Dropdown
                                    placeholder={t('Select_Project')}
                                    fluid
                                    search
                                    selection
                                    options={dummy.projects}
                                    onChange={(e, { value }) => {
                                        // console.log("onChange ", value)
                                        setProject(value)
                                    }}
                                    className="project-select-dropdown"
                                />
                            </ViewContent>
                            <ViewContent
                                css="d-flex justify-content-end align-itmes-center"
                            >
                                <Button size="lg" className="font-l style-btn white bg-green bold fst-italic align-items-center d-flex justify-content-center" disabled={nextDisable}
                                    onClick={() => {
                                        console.log("onClick")
                                        setProcess(true)
                                    }}
                                >
                                    {
                                        (process) ?
                                            (<span className="spinner-border mr-2" role="status" aria-hidden="true"></span>) : (null)
                                    }
                                    {t('Next')}
                                </Button>
                            </ViewContent>
                        </div>
                    </Col>
                </Row>
            </div>
        </ViewWrapper>
    )
}

export default ProjectSelect