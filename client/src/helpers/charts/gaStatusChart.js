function GateAccessStatusChart(series, xcategoires) {
    var color = ["#BA894F","#3F817D"]
    return {
        series: series,
        options: {
            title: {
                text: "大牌/細牌狀況分佈"
            },
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
            fill: {
                colors: color
            },
            legend: {
                markers: {
                    fillColors: color
                }
            },
            labels: xcategoires,
            dataLabels: {
                dropShadow: {
                    blur: 3,
                    opacity: 0.8
                }
            },
            tooltip: {
                fillSeriesColor: true
            },
            colors: color
        }
    }
}


export {
    GateAccessStatusChart
}