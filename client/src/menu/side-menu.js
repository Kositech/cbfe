import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import variable from '../helpers/variable'

function SideMenu(props) {
    let history = useHistory()
    const { t, i18n } = useTranslation();
    var burgerButtonClassName = (typeof (burgerButtonClassName) !== "undefined") ? props.burgerButtonClassName : ""

    // console.log("burgerButtonClassName ", burgerButtonClassName)

    const [isOpen, setIsOpen] = useState(false)

    const renderSubMenu = (submenu) => {
        let submenulayout = [];
        submenu.map(function (sm, i) {
            let sub = []
            if (typeof (sm.sub) !== "undefined") {
                sub.push(renderSubMenu(sm.sub))
            }

            submenulayout.push(
                <li className="pl-4 mb-3">
                    <a className="d-flex" href={sm.link}>{t(sm.name)}</a>
                    {sub}
                </li>
            )
        })

        return (
            <ul>
                {submenulayout}
            </ul>
        )
    }

    const renderMenu = () => {
        let layout = []

        variable.SIDE_MENU.map(function (v, i) {
            let sub = []
            if (typeof (v.sub) !== "undefined") {
                sub = renderSubMenu(v.sub)
            }

            layout.push(
                <li className="lv-1">
                    <a className="font-n d-flex align-items-center" href={v.link}>{t(v.name)}</a>
                    {
                        (typeof (v.description) !== "undefined") ?
                            (<div className="font-xs pl-3 mb-3">{t(v.description)}</div>) :
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
                <div className="font-s bold gray">{'CIA, KP, VVMU & GIA'}</div>
            </div>
        )
    }

    const renderFooter = () => {
        return (
            <div className="cb-menu-footer">
                <div className="crystal-ball-logo logo-sm "></div>
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