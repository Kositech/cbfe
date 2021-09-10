function NCRChart(series, xcategoires) {

    return {
        series: series,
        options: {
            chart: {
                height: 350,
                type: 'line',
                stacked: false
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [2, 2, 2]
            },
            title: {
                text: "承判商NC數目",
                align: 'left',
                offsetX: 0,
                style:{
                    fontSize: '25px'
                }
            },
            xaxis: {
                type: 'category',
                categories: xcategoires,
                labels: {
                    minHeight: 120,
                    maxHeight: 350,
                }
            },
            yaxis: [
                {
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#000'
                    },
                    labels: {
                        style: {
                            colors: '#000',
                        }
                    },
                    title: {
                        text: "本周期 及 上週期",
                        style: {
                            color: '#000',
                        }
                    },
                    tooltip: {
                        enabled: true
                    },
                    max: 7
                },
                {
                    seriesName: 'Income',
                    opposite: true,
                    axisTicks: {
                        show: false,
                    },
                    show: false,
                    axisBorder: {
                        show: true,
                        color: '#00E396'
                    },
                    labels: {
                        style: {
                            colors: '#00E396',
                        }
                    },
                    title: {
                        text: "Operating Cashflow (thousand crores)",
                        style: {
                            color: '#00E396',
                        }
                    },
                    max: 7

                },
                {
                    seriesName: 'Revenue',
                    opposite: true,
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: '#FEB019'
                    },
                    labels: {
                        style: {
                            colors: '#FEB019',
                        },
                    },
                    title: {
                        text: "平均行動回應時間(日)",
                        style: {
                            color: '#FEB019',
                        }
                    }
                },
            ],
            tooltip: {
                fixed: {
                    enabled: true,
                    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60
                },
            },
            legend: {
                position: 'top', // topRight, topLeft, bottomRight, bottomLef
                horizontalAlign: 'left',
                offsetX: 40
            }
        },
    }
}

export {
    NCRChart
}