// import { Trans } from 'react-i18next'
import { permitKeyI18nKey } from '../common'
import variable from '../variable'

function reassignPermitChartData(data) {
    let output = []
    // console.log("reassignPermitChartData ", data)
    Object.keys(data).forEach(function (key) {
        var totals = []
        data[key].map(function (item) {
            totals.push(item.waiting_approval + item.not_cancelled + item.not_approved + item.cancelled + item.withdrawn + item.cancel_confirmed)            
            return item;
        })

        var i18nkey = permitKeyI18nKey(key)

        output.push(
            { data: totals, name: i18nkey }
        )
    })

    return output
}

function reassignPermitBarChartData(data){
    let totals = []
    let names = []
    Object.keys(data).forEach(function (key) {
        let total = 0
        let name = ""
        data[key].map(function (item) {
            total = item.waiting_approval + item.not_cancelled + item.not_approved + item.cancelled + item.withdrawn + item.cancel_confirmed
            name = permitKeyI18nKey(key)

            return item
        })
        totals.push(total)
        names.push(name)
    })

    return {
        totals: totals,
        names: names
    }
}

function NCRAverageResponseDayDataReassign(data, xcategoiresFieldName = "", dataFieldName = "average_response_day") {
    let xcategoires = []
    let avgdata = []
    let max = 0
    let avg = data.data

    avg.map(function (v, i) {
        xcategoires.push(v[xcategoiresFieldName])
        avgdata.push(v[dataFieldName])

        max = (v[dataFieldName] > max) ? v[dataFieldName] : max

        return v
    })

    return {
        avgdata: avgdata,
        xcategoires: xcategoires,
        max: max
    }
}

function NCRPeriodChartDataReassign(data, xcategoiresFieldName = "safety_type", dataFieldName = "count") {
    let thisMonth = data.thismonth;
    let previousMonth = data.previousmonth

    let xcategoires = []
    let thisMonthData = []
    let previousMonthData = []
    var max = 0

    thisMonth.map(function (v, i) {
        xcategoires.push(v[xcategoiresFieldName])
        thisMonthData.push(v[dataFieldName])

        previousMonth.some((ele) => {
            if (ele[xcategoiresFieldName] === v[xcategoiresFieldName]) {
                max = (ele[dataFieldName] > max) ? ele[dataFieldName] : max
                previousMonthData.push(ele[dataFieldName])
            }

            return ele[xcategoiresFieldName] === v[xcategoiresFieldName]
        })

        return v
    })

    // console.log("thisMonthData ", thisMonthData)
    // console.log("xcategoires ", xcategoires)
    // console.log("previousMonthData ", previousMonthData)

    return {
        thisMonthData: thisMonthData,
        xcategoires: xcategoires,
        previousMonthData: previousMonthData,
        max: max
    }
}

function NCRAvgResponseDaySorting(avgResponseDay, companyAndStatusRecentMonths){
    let data = []
    companyAndStatusRecentMonths.xcategoires.map(function(v1, i) {
        avgResponseDay.xcategoires.map(function(v2, j){
            if(avgResponseDay.xcategoires[j] === companyAndStatusRecentMonths.xcategoires[i]){
                data[i] = avgResponseDay.avgdata[j]
            }
        })
    })

    avgResponseDay["avgdata"] = data
    avgResponseDay["xcategoires"] = companyAndStatusRecentMonths.xcategoires
    return avgResponseDay
}

function NCRBarChart(series, xcategoires, horizontal = true, distributed = false) {
    // console.log("NCRPeriodChart", series, xcategoires)
    return {
        series: series,
        options: {
            colors: variable.CHART_COLOR,
            chart: {
                type: 'bar'
            },
            plotOptions: {
                bar: {
                    horizontal: horizontal,
                    dataLabels: {
                        position: 'top',
                    },
                    barHeight: '90%',
                    distributed: distributed
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

function NCRChart(series, xcategoires, max) {

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
            // title: {
            //     text: "承判商NC數目",
            //     align: 'left',
            //     offsetX: 0,
            //     style: {
            //         fontSize: '25px'
            //     }
            // },
            xaxis: {
                type: 'category',
                categories: xcategoires,
                labels: {
                    minHeight: 120,
                    maxHeight: 350,
                    hideOverlappingLabels: false
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
                        text: "本月份 及 上月份",
                        style: {
                            color: '#000',
                        }
                    },
                    tooltip: {
                        enabled: true
                    },
                    max: max
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
                    max: max

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
            // tooltip: {
            //     fixed: {
            //         enabled: true,
            //         position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            //         offsetY: 30,
            //         offsetX: 60
            //     },
            // },
            legend: {
                position: 'top', // topRight, topLeft, bottomRight, bottomLef
                horizontalAlign: 'left',
                offsetX: 40
            }
        },
    }
}

function NCRPermitBarChart(series, xcategoires, type = "bar") {
    return {
        series: series,
        options: {
            colors: variable.CHART_COLOR,
            chart: {
                type: type,
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                type: 'category',
                categories: xcategoires
            },
        }
    }
}

function NCRPermitChart(series, xcategoires, type = "line") {
    return {
        series: series,
        options: {
            chart: {
                type: type,
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
    reassignPermitBarChartData,
    reassignPermitChartData,
    NCRAverageResponseDayDataReassign,
    NCRPeriodChartDataReassign,
    NCRChart,
    NCRBarChart,
    NCRPermitBarChart,
    NCRPermitChart,
    NCRAvgResponseDaySorting
}