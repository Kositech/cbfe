import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Collapse } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import variable from '../helpers/variable'

function SideMenu(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();
    var burgerButtonClassName = (typeof (burgerButtonClassName) !== "undefined") ? props.burgerButtonClassName : ""

    // console.log("burgerButtonClassName ", burgerButtonClassName)

    const [isOpen, setIsOpen] = useState({})

    const renderSubMenu = (submenu, id) => {
        let submenulayout = [];
        submenu.map(function (sm, i) {
            let sub = []
            if (typeof (sm.sub) !== "undefined") {
                sub.push(renderSubMenu(sm.sub, sm.id))
            }

            submenulayout.push(
                <li className="pl-4 mb-3" key={sm.name+i}>
                    {
                        (typeof (sm.id) !== "undefined") ?
                            (
                                <a className="d-flex dark-06 pointer"
                                    onClick={() => {
                                        setIsOpen({
                                            ...isOpen,
                                            [sm.id]: (typeof (isOpen[sm.id]) !== "undefined") ? !isOpen[sm.id] : true
                                        })
                                    }}
                                    aria-controls={sm.id}
                                    aria-expanded={false}
                                >{t(sm.name)}</a>) :
                            (<a className="d-flex dark-06" href={sm.link} >{t(sm.name)}</a>)
                    }
                    {sub}
                </li>
            )
        })

        return (
            <>
                {
                    (typeof (id) !== "undefined") ?
                        (<Collapse in={(typeof (isOpen[id]) !== "undefined") ? isOpen[id] : false}>
                            <ul id={id} className="mt-3">
                                {submenulayout}
                            </ul>
                        </Collapse>) :
                        (<ul id={(typeof (id) !== "undefined") ? id : null}>
                            {submenulayout}
                        </ul>)
                }
            </>
        )
    }

    const renderMenu = () => {
        let layout = []

        variable.SIDE_MENU.map(function (v, i) {
            let sub = []
            if (typeof (v.sub) !== "undefined") {
                sub = renderSubMenu(v.sub, v.id)
            }

            layout.push(
                <li className="lv-1" key={v.name+i}>
                    <a className="font-n d-flex align-items-center white" href={v.link}>{t(v.name)}</a>
                    {
                        (typeof (v.description) !== "undefined") ?
                            (<div className="font-xs pl-3 mt-2 mb-3 dark-06">{t(v.description)}</div>) :
                            (null)
                    }
                    {sub}
                </li>
            )
        })

        return (
            <ul>
                {layout}
            </ul>
        )
    }

    const renderHeader = () => {
        return (
            <div className="cb-menu-header">
                <div className="user-icon mb-3"></div>
                <div className="font-xm bold deep-dark">{t('side_menu.Central_Search')}</div>
                <div className="font-s bold dark-06">{'CIA, KP, VVMU & GIA'}</div>
            </div>
        )
    }

    const renderFooter = () => {
        return (
            <div style={{ width: "60px", height: "60px" }} className="position-relative">
                <a className="cb-menu-footer" href="/">
                    <div className="crystal-ball-logo logo-sm "></div>
                </a>
            </div>
        )
    }

    return (
        <Menu
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            // noOverlay
            burgerButtonClassName={"cb-menu-bth " + burgerButtonClassName}
            burgerBarClassName={"cb-menu-bar"}
            crossButtonClassName={"cb-menu-cross-btn"}
            crossClassName={"cb-menu-cross"}
            menuClassName={"cb-menu"}
            morphShapeClassName={"cb-menu-morph-shape"}
            itemListClassName={"cb-menu-item-list"}
            overlayClassName={"cb-menu-overlay"}
        >
            {renderHeader()}
            {renderMenu()}
            {props.children}
            {renderFooter()}
        </Menu>
    )
}

export default SideMenu