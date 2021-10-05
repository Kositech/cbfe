// import { useState, useEffect } from 'react'
import ViewShadowBox from './view-shadowbox'
import ViewContent from './view-content'

function ChartFilterBtn(props) {
    var data = (typeof (props.data) !== "undefined") ? props.data : []

    return (
        <>
            {
                data.map((v, i) => {
                    var active = (props.chartFilterStatus === i) ? "active" : ""
                    var m = (i !== data.length - 1) ? "mr-2" : ""
                    return (
                        <div key={i} onClick={() => {
                            props.setChartFilterStatus(i)
                        }}>
                            <ViewShadowBox
                                className={`px-2 pointer ${m} ${active}`}
                                style={{borderRadius: "4px"}}
                            >
                                <ViewContent
                                    css={`d-flex justify-content-center align-items-center`}
                                >
                                    <div className={"font-s deep-dark px-2 py-2"} >{v.text}</div>
                                </ViewContent>
                            </ViewShadowBox>
                        </div>
                    )
                })
            }
        </>
    )
}

export default ChartFilterBtn