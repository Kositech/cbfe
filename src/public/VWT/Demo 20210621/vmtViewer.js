/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
  

function tofloorplanview(ele){
    var url_string = window.location.href;
    var url = new URL(url_string);
    
    var urlSplit = url.pathname.split('/');
    console.log("url_string", urlSplit)
    urlSplit.pop()
    let path = urlSplit.join('/')
    closeFullscreen()
    window.open(path + "/wrap.html", "_self")
}

function renderFloorPlanButton(){
    // window.open(`/VWT/Demo 20210621/wrap.html`, "_self")
    if($('.pnlm-controls-container').length > 0){
        if($('.cb-floorplan-toggle-button').length == 0){
            var floorplanview = document.createElement('div');
            floorplanview.addEventListener('click', tofloorplanview);
            floorplanview.className = 'cb-floorplan-toggle-button pnlm-floorplan pnlm-controls';
            floorplanview.style.cssText = "position:absolute; bottom:-32px; width: 26px; height:26px;"
            
            $('.pnlm-controls-container').append(floorplanview);
        }
    }
}

$(function(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    // var params = url_string.substring(url_string.indexOf("?"));
    var params = "?"
    params += "firstScene=" + encodeURIComponent(url.searchParams.get("firstScene"));
    // console.log("firstScene::: ", url.searchParams.get("firstScene"))
    params += "&autoLoad=true"
    params += "&config=" + url.searchParams.get("config");
    params += "&floorplanview=false"

    console.log("params", params)
    // document.getElementById("vmt-viewer").innerHTML = "<iframe height=\"100%\" width=\"100%\" frameborder=\"0\" allowfullscreen style=\"border-style:none;\" src=\"./pannellumViewer.htm" + params + "\"></iframe>"

    $("#vmt-viewer").load(`./pannellumViewer.htm${params}`, function (responseText, textStatus, jqXHR) {

    })

    $('#vmt-viewer').on("DOMSubtreeModified", function () {
        // console.log("#vmt-viewer", $('.pnlm-floorplan-toggle-button').length)
        renderFloorPlanButton()
    })
})