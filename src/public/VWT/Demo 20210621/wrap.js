function replacePath(target, ele, attr, callback, matchHttps = false) {
    $(target).find(ele).filter(function () {
        let match = ($(this).attr(attr).match(/https:\/\//i) == null) ? true : false
        if (matchHttps) {
            match = !match
        }

        return match
    }).map(function (n) {
        callback($(this), n)
    })
}

function addHashQueryParam(url, key, value) {
    const existing = (url.lastIndexOf('?') > url.lastIndexOf('#')) ?
      url.substr(url.lastIndexOf('?') + 1) : '';
      
    const query = new URLSearchParams(existing);
    query.set(key, value)
    console.log("query.toString() ", query.toString(), existing, url)
    return `${url.replace(`?${existing}`, '')}?${query.toString()}`;
  }

function objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    let symbol = (keyValuePairs.length > 0) ? "?" : ""
    return symbol + keyValuePairs.join('&');
}

$(function () {
    var url_string = window.location.href;
    var url = new URL(url_string);
    // var projectName = url.searchParams.get("projectName");
    // console.log("projectName: ", projectName)
    $("#wrap").load(`./index.html`, function (responseText, textStatus, jqXHR) {

    })

    $('#wrap').on("DOMSubtreeModified", function () {
        // $('a.w3-bar-item').each(function (i, e) {
        //     var href = $(this).attr('href')
        //     var hqp = addHashQueryParam(href, "projectName", projectName)
        //     console.log("addHashQueryParam ", hqp)
        //     $(this).attr('href', hqp)
        // })
        // modify red dot href to local viewer with parms
        replacePath("#PlanView", 'area', 'href', function (ele, n) {
            // var value = ele.attr('href').substring(ele.attr('href').indexOf("?"));
            var value = ele.attr('href').split('?')

            console.log(value)
            ele.attr('href', './viewer.html?' + value[1] + `&config=./pano.json&floorplanview=false&autoLoad=true&fullscreenActive=true`)
        }, true)
    })
})