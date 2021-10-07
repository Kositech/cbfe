var { redirectTo, checkAuthWhiteList } = require.main.require('../src/helper/common.js');
// var { gqlClientRequest } = require.main.require('../src/graphQL/gqlClient.js')
// var userGQL = require.main.require('../src/graphQL/user-query.js')

exports.verify = async function (req, res, next) {
    // console.log("middleware ", req.headers.cookie, req.headers, req.url)

    console.log("checkAuthWhiteList:: ", checkAuthWhiteList(req.url), req.url)

    if (typeof (req.headers.cookie) !== "undefined" && !checkAuthWhiteList(req.url)) {
        // res.append("my-header", "somthings here")
        // let ts = Date.now();
        // res.cookie("x-api-key", ts, { maxAge: 60 * 60 * 1000, httpOnly: false }) // millisecs
        next()
    } else {
        if (!checkAuthWhiteList(req.url)) {
            redirectTo(res, "/login")
        } else {
            next()
        }
    }
}