﻿<%@ page language="C#" async="true" autoeventwireup="true" codefile="VWT_Viewer.aspx.cs" inherits="VWT_Viewer" %>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.1.1.min.js"?_=<%=timestamp%>></script>
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pannellum</title>
  <link type="text/css" rel="Stylesheet" href="pannellum.css"/>
  <link type="text/css" rel="Stylesheet" href="standalone.css"/>
  <style type="text/css">
	.btnHotspot {
		background-color: #000000;
		border: 4px solid #e7e7e7;
		color: white;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 12px;
		margin: 0px;
		border-radius: 80%;
		cursor: grab;
	}

	.draggable {
	  left: 68%;
            top: 44%;
            width: 30%;
            height: 30%;
            /*max-width: 400px;*/
            /*max-height: 300px;*/
            resize: both; 
            z-index: 107;
            position: absolute;
            -moz-box-shadow: 1px 3px 6px -3px gray;
            -webkit-box-shadow: 1px 3px 6px -3px gray;
            box-shadow: 1px 3px 6px -3px gray;
    }

	.draggable-nav {
         height: 15px;
            width: 100%;
            top: 0px;
            left: 0px;
            position: absolute;
            z-index: 109;
            background-color: rgb(34, 37, 34);
            cursor: pointer;
            -moz-box-shadow: 0 3px 5px -3px black;
            -webkit-box-shadow: 0 3px 5px -3px black;
            box-shadow: 0 3px 5px -3px black;
    }

    .draggable-body {
        top: 15px;
        left: 0px;
        right: 0px;
        bottom: 0px;
            height: 100%;
        position: absolute;
        z-index: 108;
        border: black 1px solid;
		background-color: rgb(224, 224, 224);
		overflow-y: scroll;
     }

	 .hotlinks {
		background-color: rgb(255, 255, 255);
	 }

	 .editmode{
	 right : 20px;
	  //left: 68%;
            top: 1%;
            width: 100px;
            height: 20px;            
            //resize: both;
            overflow: auto;
            z-index: 107;
            position: absolute;
            -moz-box-shadow: 1px 3px 6px -3px gray;
            -webkit-box-shadow: 1px 3px 6px -3px gray;
            box-shadow: 1px 3px 6px -3px gray;
		background-color: rgb(255, 255, 255);
	 }

  </style>
</head>
<body>
<div id="container"> 
	<div id="infomenu" class="draggable" style="display: none;"> 
		<div id="infomenuheader" class="draggable-nav"></div>
            <div id="infomenubody" class="draggable-body">                
                <div id="hotlinks">Hello World</div>
            </div>
		</div>

		
	</div>
	<div id="editmode" class="editmode" style="display:none;"><center>Edit Mode</center></div>
	
  <noscript>  
    <div class="pnlm-info-box">	
      <p>Javascript is required to view this panorama.<br>(It could be worse; you could need a plugin.)</p>
    </div>
  </noscript>
</div>


<script>
	var vwt_DB_config = <%=vwt_config_string%>;
	var isAdmin = '<%=isAdmin%>';
	var projectItemId = '<%=projectItemId%>';
	console.log("projectItemId1 " + projectItemId);
	console.log("Admin " + isAdmin);	

</script>
<script type="text/javascript" src="hotlinks.js?_=<%=timestamp%>"></script>
<script type="text/javascript" src="libpannellum.js?_=<%=timestamp%>"></script>
<script type="text/javascript" src="pannellum.js?_=<%=timestamp%>"></script>
<script type="text/javascript" src="standalone.js?_=<%=timestamp%>"></script>
<!--<script type="text/javascript" src="hotlinks.js?_=<%=timestamp%>"></script>-->



</body>
</html>
