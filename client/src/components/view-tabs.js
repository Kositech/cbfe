import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Row, Col } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { objArrayToDropdownObject } from '../helpers/common'
import variable from '../helpers/variable';

function ViewTabs(props) {
    const [current, setCurrent] = useState(0)
    const isResponsive = useMediaQuery({ query: '(max-width: ' + variable.RESPONSIVE_WIDTH + ')' })

    var tabs = (typeof (props.tabs) !== "undefined") ? props.tabs : []
    var onChange = (typeof (props.onChange) !== "undefined") ? props.onChange : function () { }

    var options = objArrayToDropdownObject(tabs, ['name', 'value', 'name'])

    // console.log("ViewTabs options ", options, tabs[current])

    return (
        <div className="px-2 mx-1">
            {
                (!isResponsive) ?
                    (
                        <Row>
                            {
                                tabs.map(function (tab, i) {
                                    let active = (current == i) ? "active" : ""
                                    return (
                                        <Col className="d-flex justify-content-center align-items-center p-0">
                                            <div onClick={() => {
                                                setCurrent(i)
                                                onChange(tab, i)
                                            }}
                                                className={"cb-data-tab-item w-100 py-2 bold font-n text-center pointer " + active}>{tab.name}</div>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    ) :
                    (
                        <Dropdown
                            fluid
                            selection
                            options={options}
                            className={"cb-tabs-dropdown"}
                            value={tabs[current].value}
                            onChange={(e, data) => {
                                const { value } = data;                                
                                const index = data.options.findIndex(o => o.value === value);
                                // console.log("index. ", value, index)
                                setCurrent(index)
                                onChange(tabs[index], index)
                            }}
                        />
                    )
            }
        </div>
    )
}

export default ViewTabs