function NCRPeriodChartDataReassign(data, fieldName = "safety_type") {
    let thisMonth = data.thismonth;
    let previousMonth = data.previousmonth

    let xcategoires = []
    let thisMonthData = []
    let previousMonthData = []

    thisMonth.map(function (v, i) {
        xcategoires.push(v[fieldName])
        thisMonthData.push(v.count)

        let check = previousMonth.some((ele) => {
            if (ele[fieldName] === v[fieldName]) {
                previousMonthData.push(ele.count)
            }

            return ele[fieldName] === v[fieldName]
        })
    })

    console.log("thisMonthData ", thisMonthData)
    console.log("xcategoires ", xcategoires)
    console.log("previousMonthData ", previousMonthData)

    return {
        thisMonthData: thisMonthData,
        xcategoires: xcategoires,
        previousMonthData: previousMonthData
    }
}

function NCRPeriodChart(series, xcategoires) {
    return {
        series: series,
        options: {
            colors: ['#00509d', '#fdc500'],
            chart: {
                type: 'bar',
                height: 450
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        position: 'top',
                    },
                    barHeight: '90%',
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: -6,
                style: {
                    fontSize: '15px',
                    colors: ['#fff'],
                },
                dropShadow: {
                    enabled: true,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.7
                }
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['#fff']
            },
            tooltip: {
                shared: true,
                intersect: false
            },
            xaxis: {
                categories: xcategoires,
            },
        }
    }
}

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
                style: {
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

function NCRPermitChart(series, xcategoires) {
    return {
        series: series,
        options: {
            chart: {
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                tooltipHoverFormatter: function (val, opts) {
                    return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
                }
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                categories: xcategoires
            },
            grid: {
                borderColor: '#f1f1f1',
            }
        }
    }
}

export {
    NCRPeriodChartDataReassign,
    NCRChart,
    NCRPeriodChart,
    NCRPermitChart
}