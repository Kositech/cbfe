import { Row } from 'react-bootstrap'
import NavTopItem from './nav-top-item'
import variable from '../helpers/variable';

function ResponsiveFooterMenu(props) {
    return (
        <>
            <div className="footer-menu-wrap"></div>
            <div className="footer-menu bg-sky-green white container-fluid nav-top-menu">
                <Row style={{ height: "100%" }}>
                    {
                        variable.NAV_TAB.map(function (v, i) {
                            return (<NavTopItem value={v} key={i}/>)
                        })
                    }
                </Row>
            </div>
        </>
    )
}

export default ResponsiveFooterMenu