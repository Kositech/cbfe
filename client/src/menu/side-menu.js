import { useState } from 'react'
import { slide as Menu } from 'react-burger-menu'
import variable from '../helpers/variable'

function SideMenu(props) {
    var burgerButtonClassName = (typeof(burgerButtonClassName) !== "undefined") ? props.burgerButtonClassName : ""

    const [isOpen, setIsOpen] = useState(false)

    const renderSubMenu = (submenu) => {
        let submenulayout = [];
        submenu.map(function (sm, i) {
            let sub = []
            if (typeof (sm.sub) !== "undefined") {
                sub.push(renderSubMenu(sm.sub))
            }

            submenulayout.push(
                <li>
                    <a>{sm.name}</a>
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
                <li>
                    <a>{v.name}</a>
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

    return (
        <Menu
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            noOverlay
            burgerButtonClassName={"cb-menu-bth " + burgerButtonClassName}
            burgerBarClassName={"cb-menu-bar"}
            crossButtonClassName={"cb-menu-cross-btn"}
            crossClassName={"cb-menu-cross"}
            menuClassName={"cb-menu"}
            morphShapeClassName={"cb-menu-morph-shape"}
            itemListClassName={"cb-menu-item-list"}
            overlayClassName={"cb-menu-overlay"}
        >
            {renderMenu()}
            {props.children}
        </Menu>
    )
}

export default SideMenu