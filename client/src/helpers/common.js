import routes from '../routers/routes'
import moment from 'moment'

function debug(name = "", value = "") {
    if (process.env.NODE_ENV !== "production") {
        console.log(name, value);
    }
}

function objArrayToDropdownObject(objs, keys = [], targetKeys = ['key', 'value', 'text']) {
    let output = []

    objs.map(function (obj, i) {
        let newObj = { ...obj };
        keys.map(function (key, j) {
            newObj[targetKeys[j]] = obj[key]

            return key
        })

        output.push(newObj)

        return obj
    })

    return output
}

function searchArrayObject(nameKey, props, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i][props] === nameKey) {
            return myArray[i];
        }
    }
}

function objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    let symbol = (keyValuePairs.length > 0) ? "?" : ""
    return symbol + keyValuePairs.join('&');
}

function countDecimals(str) { // str must be number
    let value = Number(str)
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}

function currencyFormat(n, currency = "", output = 0, fixed = -1) {
    if (n !== "") {
        if (!isNaN(n) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(n))) {
            var symbol = ""
            if (n < 0) {
                n *= -1
                symbol = "-"
            }
 
            var c = (fixed === -1) ? countDecimals(n.toString()) : fixed

            // console.log("countDecimals(n.toString()) ",n, countDecimals(n.toString()))

            return symbol + currency + Number(n).toFixed(c).replace(/./g, function (c, i, a) {
                console.log("c i a", c, i, a, (a.length - i) % 3, a.indexOf('.'))
                return i > 0 && c !== "." && (a.length - i) % 3 === 0 && ((a.indexOf('.') == -1) ? true : i < a.indexOf('.')) ? "," + c : c;
            });
        } else {
            return output
        }
    } else {
        return output
    }
}

function routesFilterPath(mpath, mparams) {
    const crumbs = routes
        .filter(({ path }) => mpath.includes(path))
        .map(({ path, ...rest }) => ({
            path: Object.keys(mparams).length
                ? Object.keys(mparams).reduce(
                    (path, param) =>
                        path.replace(`:${param}`, mparams[param]),
                    path
                )
                : path,
            value: Object.keys(mparams).length
                ? Object.keys(mparams).reduce(
                    (path, param) =>
                        (path.includes(param) ? mparams[param] : ""),
                    path
                )
                : null,
            ...rest
        }));

    return crumbs
}

function arrayGroupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function permitKeyI18nKey(key){
    var i18nkey = ""
    switch(key){
        case "FALSECEILING":
            i18nkey = "False_Ceiling_Permit"
            break;
        case "LADDER":
            i18nkey = "Ladder_Work_Permit"
            break;
        case "SIDEWALK":
            i18nkey = "Exterior_wall_Permit"
            break;
        case "THERMAL":
            i18nkey = "Hot_Work_Permit"
            break;
        default:            
    }

    return i18nkey
}

function permitDataFilter (permitData, key, t) {
    var data = [
        {
            label: "Submitted",
            value: 0
        },
        {
            label: "Approved",
            value: 0
        }
    ]
    var clonePermitData = { ...permitData }
    if (typeof (clonePermitData[key]) !== "undefined") {
        var filterdata = clonePermitData[key].filter(function (v, i) {
            return v.dateTime === moment().format("MM/DD/YYYY")
        })
        
        if (filterdata.length > 0) {
            data = []
            data.push(
                {
                    label: "Submitted",
                    value: (filterdata[0].waiting_approval + filterdata[0].not_cancelled +
                    filterdata[0].not_approved + filterdata[0].cancelled +
                    filterdata[0].withdrawn + filterdata[0].cancel_confirmed)
                },
                {
                    label: "Approved",
                    value: filterdata[0].not_cancelled
                }
            )
        }
    }
    return data
}

function getDateArray(startdays = 10, enddays = 0, format = "DD/MM"){
    let date = []

    for (let i = startdays; i >= enddays; i--) {
        date.push(moment().subtract(i, 'd').format("DD/MM"))
    }

    return date
}

export {
    debug,
    searchArrayObject,
    objToQueryString,
    currencyFormat,
    routesFilterPath,
    arrayGroupBy,
    countDecimals,
    objArrayToDropdownObject,
    getRandomInt,
    permitKeyI18nKey,
    permitDataFilter,
    getDateArray
}