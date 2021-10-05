import variable from '../variable'

function PTWPermitChart(series, xcategoires) {
    return {
        series: series,
        options: {
            chart: {
                type: "donut",
            },
            stroke: {
                width: 0
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: true
                            }
                        }
                    }
                }
            },
            fill:{
                colors: variable.PTW_CHART_COLOR
            },
            legend:{
                markers:{
                    fillColors: variable.PTW_CHART_COLOR
                }
            },
            labels: xcategoires,
            dataLabels: {
                dropShadow: {
                    blur: 3,
                    opacity: 0.8
                }
            },
            tooltip:{
                fillSeriesColor: true
            },
            colors: variable.PTW_CHART_COLOR
        }
    }
}

export {
    PTWPermitChart
}