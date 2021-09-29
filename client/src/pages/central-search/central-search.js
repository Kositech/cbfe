import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { Icon, Input, Dropdown, Button, Loader, Menu } from 'semantic-ui-react'
import { Row, Col } from 'react-bootstrap'
import DatePicker from 'react-date-picker'
import NavTop from "../../components/nav-top";
import variable from "../../helpers/variable";
import SideMenu from "../../menu/side-menu";
import ViewWrapper from '../../components/view-wrapper'
import ViewContent from "../../components/view-content";

function CentralSearch(props) {
    let history = useHistory();
    const { t, i18n } = useTranslation()

    const [condition, setCondition] = useState({
        type: new URLSearchParams(props.location.search).get("type") || "All",
        filter: new URLSearchParams(props.location.search).get("filter") || "",
        content: "",
        docSetDateStart: null,
        docSetDateEnd: null,
        docSetNo: null,
        contentType: "Subject",
        from: null,
        to: null,
        documentType: null,
        zone: null,
        sort: null,
        sortby: "asc"
    })
    const [uiControl, setUIControl] = useState({
        docSetDateStartOpen: false,
        docSetDateEndOpen: false 
    })
    const [searchProgress, setSearchProgress] = useState(false)

    useEffect(() => {
        if (searchProgress) {
            setSearchProgress(false)
        }
    }, [searchProgress])

    return (
        <ViewWrapper id="outer-container" classNAme="font-roboto">
            <SideMenu
                burgerButtonClassName="cb-menu-bth-sm"
            >
            </SideMenu>
            <div id="page-wrap" className="cb-page-wrap cb-cebtral-search pt-4 pl-5 pr-5 pb-4 mt-1">
                <NavTop showIcon={true} {...props} />
                <Row>
                    <Col className="d-flex justify-content-start align-items-center mb-5">
                        <div className="ml-6 pl-5 bold font-xl">{t('Information_Library')} - CIA, KP, VVMU & GIA</div>
                        {/* <div className="crystal-ball-logo logo-sm ml-2"></div> */}
                    </Col>
                </Row>
                <Row style={{ marginTop: "50px" }}>
                    <Col sm={12} md={10} lg={9} className="d-flex justify-content-start align-items-center">
                        <Dropdown placeholder={t("All")} selection options={variable.CS_TYPE} className="float-left mr-3" />
                        <Input fluid icon placeholder={t('form.search_placeholder')} className="w-100 cb-central-search-bar">
                            <Icon name="search" className="cb-central-search-left" />
                            <input
                                value={condition.content}
                                onChange={(event, data) => {
                                    // console.log("event ", event, data)
                                    setCondition({
                                        ...condition,
                                        content: event.target.value
                                    })
                                }}
                            />
                            {
                                (condition.content !== "") ?
                                    (
                                        <Icon name="close" link className="cb-central-search-right"
                                            onClick={() => {
                                                setCondition({
                                                    ...condition,
                                                    content: ""
                                                })
                                            }}
                                        />
                                    ) :
                                    (null)
                            }
                        </Input>
                        <Button
                            disabled={searchProgress}
                            className="cb-central-search-btn ml-3"
                            onClick={(event, data) => {
                                setSearchProgress(true)
                            }}
                        >
                            {t('Search')}
                            {
                                (searchProgress) ?
                                    (<Loader size='tiny' />) :
                                    (null)
                            }
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-between align-items-center">
                        <ViewContent
                            css="d-flex justify-content-start align-items-center"
                        >
                            {
                                variable.CS_TYPE.map(function (v, i) {
                                    let active = (condition.type == v.value) ? "active" : ""
                                    return (
                                        <div className={`px-5 py-3 gray pointer ${active}`}>{t(v.value)}</div>
                                    )
                                })
                            }
                        </ViewContent>
                        <ViewContent
                            css="d-flex justify-content-end align-items-end"
                        >
                            1000
                        </ViewContent>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex flex-wrap justify-content-start align-items-center">
                        <Menu attched="top" className="cb-menu-wrap">
                            <Menu.Item
                                name={"DocSetDate"}
                                className="cb-menu-label"
                            >
                                {t('filter.DocSet_Date')}
                            </Menu.Item>
                            <DatePicker
                                onChange={(value) => {
                                    setCondition({
                                        ...condition,
                                        docSetDateStart: value
                                    })
                                }}
                                value={condition.docSetDateStart}
                                locale={"en-US"}
                                name=""
                                calendarIcon={null}
                                className={"cb-date-picker"}
                            />
                            <Menu.Item
                                name={"to"}
                                className="cb-menu-label"
                            >
                                {t('filter.to')}
                            </Menu.Item>
                            <div className="d-flex">
                                <DatePicker
                                    onChange={(value) => {
                                        setCondition({
                                            ...condition,
                                            docSetDateEnd: value
                                        })
                                    }}
                                    value={condition.docSetDateEnd}
                                    locale={"en-US"}
                                    name=""
                                    calendarIcon={null}
                                    className={"cb-date-picker"}
                                />
                            </div>
                        </Menu>
                    </Col>
                </Row>
            </div>
        </ViewWrapper>
    )
}

export default CentralSearch