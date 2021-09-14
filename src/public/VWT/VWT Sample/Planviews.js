async function Select_Floor_Plan_6F(){
var url_string = window.location.href;
var url = new URL(url_string);
var link = document.location.href.split('/');
var guid = link[4];
    var projectItemId = url.searchParams.get("pid");

    document.getElementById("PlanView").innerHTML = "<img src= \" 6F_add.jpg\" alt=\"Workplace\" usemap=\"#workmap\"><map name=\"workmap\"><area shape =\"circle\" coords=\"422,443,25\" alt=\"Coffee\" href=\"https://uatcia2.nwconstruction.com.hk/models/01_GeneralCode/VWT_Viewer.aspx?firstScene=Pano_00_AIM_Executive Lavatory_F?pid=" + projectItemId + "&guid=" + guid + "\"><area shape =\"circle\" coords=\"307,531,25\" alt=\"Coffee\" href=\"https://uatcia2.nwconstruction.com.hk/models/01_GeneralCode/VWT_Viewer.aspx?firstScene=Pano_00_AIM_Lift Lobby_02G11_STR?pid=" + projectItemId + "&guid=" + guid + "\"><area shape =\"circle\" coords=\"253,476,25\" alt=\"Coffee\" href=\"https://uatcia2.nwconstruction.com.hk/models/01_GeneralCode/VWT_Viewer.aspx?firstScene=Pano_00_AIM_Lift Lobby_01G10_STR?pid=" + projectItemId + "&guid=" + guid + "\"></map>"
}
