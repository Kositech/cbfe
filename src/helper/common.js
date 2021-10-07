const path = require('path');
const url = require('url');

let authwhitelist = [
    "/login",
    "/locales"
]

function redirectTo(res, path, query = {}) {
    res.redirect(url.format({
        pathname: path,
        query: query
    }))
}

function getCookies(request) {
    var cookies = {};
    request.headers && request.headers.cookie.split(';').forEach(function (cookie) {
        var parts = cookie.match(/(.*?)=(.*)$/)
        cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
    return cookies;
};

function checkAuthWhiteList(url){
    let check = false
    
    for(var i = 0; i < authwhitelist.length; i++){
        // let urlSplit = url.split('/')
        if(authwhitelist[i] == url){
            check = true;
            break;
        }else{
            const relative = path.relative(authwhitelist[i], url);
            console.log("relative", )
            const isSubdir = relative && !relative.startsWith('..') && !path.isAbsolute(relative);
            console.log("relative ",relative, "isSubdir ", isSubdir)
            if(isSubdir){
                check = true;
                break;
            }
        }
    }

    return check
}

module.exports = {
    redirectTo,
    getCookies,
    checkAuthWhiteList
}