$(function(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    // var params = url_string.substring(url_string.indexOf("?"));
    var params = "?"
    params += "firstScene=" + url.searchParams.get("firstScene");
    console.log("firstScene::: ", url.searchParams.get("firstScene"))
    params += "&autoLoad=true"
    params += "&config=" + url.searchParams.get("config");
    console.log("params", params)

    document.getElementById("vmt-viewer").innerHTML = "<iframe height=\"100%\" width=\"100%\" frameborder=\"0\" allowfullscreen style=\"border-style:none;\" src=\"./viewer/standalone/pannellum.htm" + params + "\"></iframe>"
})