import { slide as Menu } from 'react-burger-menu'
import variable from '../helpers/variable'

function SideMenu(props) {

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
        <Menu pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            style={{ padding: 0 }}>
            {renderMenu()}
            {props.children}
        </Menu>
    )
}

export default SideMenu