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
                colors:["#5B8FF9", "#CD7B7B", "#61DDAA", "#65789B"]
            },
            legend:{
                markers:{
                    fillColors: ["#5B8FF9", "#CD7B7B", "#61DDAA", "#65789B"]
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
            colors: ["#5B8FF9", "#CD7B7B", "#61DDAA", "#65789B"]
        }
    }
}

export {
    PTWPermitChart
}