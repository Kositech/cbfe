import routes from '../routers/routes'

function debug(name = "", value = "") {
    if (process.env.NODE_ENV !== "production") {
        console.log(name, value);
    }
}

function objArrayToDropdownObject(objs, keys = [], targetKeys = ['key', 'value', 'text']){
    let output = []

    objs.map(function(obj, i){
        let newObj = {...obj};
        keys.map(function(key, j){
            newObj[targetKeys[j]] = obj[key]
        })

        output.push(newObj)
    })

    return output
}

function searchArrayObject(nameKey, props, myArray){
    for (var i=0; i < myArray.length; i++) {
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
    console.log("conuntDecimals ", str)
    let value = Number(str)
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
}

function currencyFormat(n, currency = "", output = 0, fixed = 0) {
    if (n !== "") {
        if (!isNaN(n) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(n))) {
            var symbol = ""
            if (n < 0) {
                n *= -1
                symbol = "-"
            }

            var c = (fixed == -1) ? countDecimals(n.toString()) : fixed

            return symbol + currency + Number(n).toFixed(c).replace(/./g, function (c, i, a) {
                return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
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

function arrayGroupBy(list, keyGetter){
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

export {
    debug,
    searchArrayObject,
    objToQueryString,
    currencyFormat,
    routesFilterPath,
    arrayGroupBy,
    countDecimals,
    objArrayToDropdownObject
}