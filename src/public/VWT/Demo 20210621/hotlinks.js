// --------------------------------------------------------------------------------------------------------------------
// Filename: hotlinks.js
//
// Description: This file contains addition functions for Virtual Walkthrough module
// --------------------------------------------------------------------------------------------------------------------


// global variables
var current_config;
var current_edit_scene;
var current_edit_hotspot;
var update_scene;				// variable to indicate whether the information of a hot spot is modified

// --------------------------------------------------------------------------------------------------------------------
// functions for draggable hot spot edit menu
// --------------------------------------------------------------------------------------------------------------------
dragElement(document.getElementById("infomenu"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// --------------------------------------------------------------------------------------------------------------------
// Function to display hot spot menu
// --------------------------------------------------------------------------------------------------------------------
function displayHotlinks(URLs){

	var x = document.getElementById("infomenu");
	var hotlinksarray = [];
	
	if (URLs != '') 
	{ 
		hotlinksarray = URLs.split("|");
	
		if (x.style.display == "none") {
			x.style.display = "block";	
			
			var linkstring = "";
			var drawingstring = "";
			var methodstatementstring = "";
			var materialsubmissoinstring = "";


			for (var i=0; i<hotlinksarray.length;i++)
			{
				
				if (hotlinksarray[i]!="")
				{
					var hotlinkarray = [];
					hotlinkarray = hotlinksarray[i].split(";");				

					if (hotlinkarray.length==2){
						drawingstring += "<a href=\"" + hotlinkarray[1] + "\" target=\"_blank\">" + hotlinkarray[0] + "</a><br>\n";	
						//methodstatementstring += "<a href=\"" + hotlinkarray[1] + "\" target=\"_blank\">" + hotlinkarray[0] + "</a><br>\n";	
						//materialsubmissoinstring += "<a href=\"" + hotlinkarray[1] + "\" target=\"_blank\">" + hotlinkarray[0] + "</a><br>\n";
					}
					else{
						if (hotlinkarray[2]=="drawing"){
							drawingstring += "<a href=\"" + hotlinkarray[1] + "\" target=\"_blank\">" + hotlinkarray[0] + "</a><br>\n";	
						}
						else if (hotlinkarray[2]=="method"){
							methodstatementstring += "<a href=\"" + hotlinkarray[1] + "\" target=\"_blank\">" + hotlinkarray[0] + "</a><br>\n";	
						}
						else{		// Material
							materialsubmissoinstring += "<a href=\"" + hotlinkarray[1] + "\" target=\"_blank\">" + hotlinkarray[0] + "</a><br>\n";
						}
					}
					//linkstring += "<a href=\"" + hotlinkarray[1] + "\" target=\"_blank\">" + hotlinkarray[0] + "</a><br>\n";				
				}
			}

			if ((drawingstring!="") || (methodstatementstring!="") || (materialsubmissoinstring!=""))
			{
				linkstring += "&nbsp&nbsp";
				linkstring += "<table border=0>\n";

				if (drawingstring!=""){
					linkstring += "<tr><td width=15></td><td width=70 valign=top><center><img src=\"img/Drawing-icon.png\" width=60 ></center></td><td width=100 height=50 valign=top><table><tr><td height=50 valign=center>Drawings</td></tr></table></td><td width=300 valign=center>" + drawingstring + "</td></tr>";
				}

				if (methodstatementstring!=""){
					linkstring += "<tr><td width=15></td><td width=70 valign=top><center><img src=\"img/MethodStatement-icon.png\" width=60></center></td><td width=100height=50 valign=top><table><tr><td height=50 valign=center>Method Statement</td></tr></table></td><td width=300 valign=center>" + methodstatementstring + "</td></tr>";
				}

				if (materialsubmissoinstring!=""){
					linkstring += "<tr><td width=15></td><td width=70 valign=top><center><img src=\"img/MaterialSubmission-icon.png\" width=60></center></td><td width=100 height=50 valign=top><table><tr><td height=50 valign=center>Material Submission</td></tr></table></td><td width=300 valign=center>" + materialsubmissoinstring + "</td></tr>";
				}

				linkstring += "</table>\n";

				document.getElementById("hotlinks").innerHTML =linkstring;			
			}
		}
		else{
			x.style.display = "none";		
		}
	}
	else{
		document.getElementById("hotlinks").innerHTML = "No information available."
	}	
}


// --------------------------------------------------------------------------------------------------------------------
// Function to display edit hot spot menu
// --------------------------------------------------------------------------------------------------------------------

function editHotspots(current_scene, current_hotspot, URLs, show, config){

	var x = document.getElementById("infomenu");
	var hotlinksarray = [];
		
	//update_scene = false;
	
	if (update_scene==false){
	// Make a copy of current config
		current_config = JSON.parse(JSON.stringify(config));
	}

	current_edit_scene = current_scene;
	current_edit_hotspot = current_hotspot;
	var current_text = current_hotspot.text;

	// -------------------------------------------------------------------------------------------------------------------
	// Display edit hot spot menu
	// -------------------------------------------------------------------------------------------------------------------
	if (URLs != '') 
	{ 
		hotlinksarray = URLs.split("|");
	
		if (x.style.display == "none") {
			x.style.display = "block";	
			
			var linkstring = "<form action=\"\" method=\"post\">\n";			

			var Nb_valid_links = 0;

			linkstring += "		<label for =\"" + "itemtext" + "\">Item title</label><br>\n";
			linkstring += "		<input type=\"text\" id=\"" + "itemtext" + "\" name=\"" + "itemtext" + "\" value=\"" + current_text + "\"><br><br>\n";

			for (var i=0; i<hotlinksarray.length;i++)
			{							
				if (hotlinksarray[i]!="")
				{
					Nb_valid_links++;
					var hotlinkarray = [];
					hotlinkarray = hotlinksarray[i].split(";");

					if (hotlinkarray.length==2){

						linkstring += "		<label for =\"" + "label"+i + "\">Info title</label><br>\n";
						linkstring += "		<input type=\"text\" id=\"" + "label"+i + "\" name=\"" + "label"+i + "\" value=\"" + hotlinkarray[0] + "\"><br>\n";

						linkstring += "		<label for =\"" + "url"+i + "\">URL address</label><br>\n";
						linkstring += "		<input type=\"text\" id=\"" + "url"+i + "\" name=\"" + "url"+i + "\" value=\"" + hotlinkarray[1] + "\"><br>\n";
						linkstring += "		<label for =\"" + "infotype"+i + "\">Information type</label><br>\n";
						linkstring += "		<input type=\"radio\" id=\"drawing\" name=\"infotype" + i +"\" value=\"drawing\" checked=\"checked\"><label for=\"drawing\">Drawings</label> <input type=\"radio\" id=\"method\" name=\"infotype" + i +"\" value=\"method\"><label for=\"method\">Method Statement</label> <input type=\"radio\" id=\"material\" name=\"infotype" + i +"\" value=\"material\"><label for=\"material\">Material Submission</label><br>\n";
						linkstring += "<br>\n";


					}
					else{
						linkstring += "		<label for =\"" + "label"+i + "\">Info title</label><br>\n";
						linkstring += "		<input type=\"text\" id=\"" + "label"+i + "\" name=\"" + "label"+i + "\" value=\"" + hotlinkarray[0] + "\"><br>\n";

						linkstring += "		<label for =\"" + "url"+i + "\">URL address</label><br>\n";
						linkstring += "		<input type=\"text\" id=\"" + "url"+i + "\" name=\"" + "url"+i + "\" value=\"" + hotlinkarray[1] + "\"><br>\n";

						linkstring += "		<label for =\"" + "infotype"+i + "\">Information type</label><br>\n";

						if (hotlinkarray[2]=="drawing"){
							linkstring += "		<input type=\"radio\" id=\"drawing\" name=\"infotype" + i +"\" value=\"drawing\" checked=\"checked\"><label for=\"drawing\">Drawings</label> <input type=\"radio\" id=\"method\" name=\"infotype" + i +"\" value=\"method\"><label for=\"method\">Method Statement</label> <input type=\"radio\" id=\"material\" name=\"infotype" + i +"\" value=\"material\"><label for=\"material\">Material Submission</label><br>\n";
						}
						else if (hotlinkarray[2]=="method"){
							linkstring += "		<input type=\"radio\" id=\"drawing\" name=\"infotype" + i +"\" value=\"drawing\"><label for=\"drawing\">Drawings</label> <input type=\"radio\" id=\"method\" name=\"infotype" + i +"\" value=\"method\" checked=\"checked\"><label for=\"method\">Method Statement</label> <input type=\"radio\" id=\"material\" name=\"infotype" + i +"\" value=\"material\"><label for=\"material\">Material Submission</label><br>\n";
						}
						else{
							linkstring += "		<input type=\"radio\" id=\"drawing\" name=\"infotype" + i +"\" value=\"drawing\"><label for=\"drawing\">Drawings</label> <input type=\"radio\" id=\"method\" name=\"infotype" + i +"\" value=\"method\"><label for=\"method\">Method Statement</label> <input type=\"radio\" id=\"material\" name=\"infotype" + i +"\" value=\"material\" checked=\"checked\"><label for=\"material\">Material Submission</label><br>\n";
						}

						linkstring += "<br>\n";
					}

				}
			}
			
			for (var i=Nb_valid_links; i<10;i++)
			{
				linkstring += "		<label for =\"" + "label"+i + "\">Info title</label><br>\n";
				linkstring += "		<input type=\"text\" id=\"" + "label"+i + "\" name=\"" + "label"+i + "\" value=\"" + "" + "\"><br>\n";

				linkstring += "		<label for =\"" + "url"+i + "\">URL address</label><br>\n";
				linkstring += "		<input type=\"text\" id=\"" + "url"+i + "\" name=\"" + "url"+i + "\" value=\"" + "" + "\"><br>\n";

				linkstring += "		<label for =\"" + "infotype"+i + "\">Information type</label><br>\n";
				linkstring += "		<input type=\"radio\" id=\"drawing\" name=\"infotype" + i +"\" value=\"drawing\" checked=\"checked\"><label for=\"drawing\">Drawings</label> <input type=\"radio\" id=\"method\" name=\"infotype" + i +"\" value=\"method\"><label for=\"method\">Method Statement</label> <input type=\"radio\" id=\"material\" name=\"infotype" + i +"\" value=\"material\"><label for=\"material\">Material Submission</label><br>\n";

				linkstring += "<br>\n";
			}


			if (show=="yes"){
				linkstring += "<br>\n";
				linkstring += "<input type=\"radio\" id=\"showyes\" name=\"showstatus\" value=\"yes\" checked=\"checked\">";
				linkstring += "<label for=\"showyes\">Enable</label> ";
				linkstring += "<input type=\"radio\" id=\"showno\" name=\"showstatus\" value=\"no\">";
				linkstring += "<label for=\"showno\">Disable</label><br>";
			}
			else{
				linkstring += "<br>\n";
				linkstring += "<input type=\"radio\" id=\"showyes\" name=\"showstatus\" value=\"yes\">";
				linkstring += "<label for=\"showyes\">Enable</label> ";
				linkstring += "<input type=\"radio\" id=\"showno\" name=\"showstatus\" value=\"no\" checked=\"checked\">";
				linkstring += "<label for=\"showno\">Disable</label><br>";
			}

			linkstring += "<br>\n";			

			linkstring += "<button type=\"button\" value=\"Submit\" onClick=\"SavetoProjectDB(this.form," + Nb_valid_links + ")\">Save</button>\n";
			linkstring += "<button type=\"reset\" value=\"Reset\" onClick=\"CancelButtonClick()\">Cancel</button>\n";
			linkstring += "</form>\n";

			document.getElementById("hotlinks").innerHTML =linkstring;
			//URLs;			
		}
		else{
			x.style.display = "none";		
		}
	}
	else{
		document.getElementById("hotlinks").innerHTML = "No information available."
	}
}

// --------------------------------------------------------------------------------------------------------------------
// Function to save modified hot spot information to project database
// --------------------------------------------------------------------------------------------------------------------
function SavetoProjectDB(form, Nb_links){
	
	var x = document.getElementById("infomenu");				
	x.style.display = "none";		
	
	var nb_links_int = parseInt(Nb_links);
	
	var labels=[];
	var urls=[];
	var infotype = [];
	var display = form.showstatus.value;
	var itemtext = "";

	// --------------------------------------------------------------------------------
	// Retrieve the values from the form / edit hot spot menu
	// --------------------------------------------------------------------------------
	itemtext = form.itemtext.value;

	labels[0]= form.label0.value;
	labels[1]= form.label1.value;
	labels[2]= form.label2.value;
	labels[3]= form.label3.value;
	labels[4]= form.label4.value;
	labels[5]= form.label5.value;
	labels[6]= form.label6.value;
	labels[7]= form.label7.value;
	labels[8]= form.label8.value;
	labels[9]= form.label9.value;

	urls[0] = form.url0.value;
	urls[1] = form.url1.value;
	urls[2] = form.url2.value;
	urls[3] = form.url3.value;
	urls[4] = form.url4.value;
	urls[5] = form.url5.value;
	urls[6] = form.url6.value;
	urls[7] = form.url7.value;
	urls[8] = form.url8.value;
	urls[9] = form.url9.value;

	infotype[0] = form.infotype0.value;
	infotype[1] = form.infotype1.value;
	infotype[2] = form.infotype2.value;
	infotype[3] = form.infotype3.value;
	infotype[4] = form.infotype4.value;
	infotype[5] = form.infotype5.value;
	infotype[6] = form.infotype6.value;
	infotype[7] = form.infotype7.value;
	infotype[8] = form.infotype8.value;
	infotype[9] = form.infotype9.value;

	// ---------------------------------------------------------------------------------------
	// Construct the new URLs string
	// ---------------------------------------------------------------------------------------
	var new_URLs_string = "";
	for (var i=0; i<10;i++)
	{
		if (labels[i]!="")
		{
			new_URLs_string += labels[i] + ";" + urls[i] + ";" + infotype[i] +"|";
		}
	}
	
	var edit_first_scene =false;

	// ---------------------------------------------------------------------------------------
	// Save the new values into config
	// ---------------------------------------------------------------------------------------
	for(var k in current_config){		
		if (k=="scenes"){
			for(var m in current_config[k]){				
				if (m==current_edit_scene){					
					for(var n in current_config[k][m]){
						if (n=="hotSpots"){							
							for (var i in current_config[k][m][n]){								
								if (JSON.stringify(current_config[k][m][n][i])==JSON.stringify(current_edit_hotspot)){									
									for (var j in current_config[k][m][n][i]){

										if (j=="URLs"){											
											current_config[k][m][n][i][j] = new_URLs_string;
										}

										if (j=="show"){											
											current_config[k][m][n][i][j] = display;
										}

										if (j=="text"){											
											current_config[k][m][n][i][j] = itemtext;
										}
									}
								}
							}							
						}
					}
				}
			}			
		}
		else if (k=="firstScene"){						
			if (current_config[k]==current_edit_scene){								
				edit_first_scene=true;
			}							
		}
		else if (k=="hotSpots"){			
			if (edit_first_scene==true){
				for(var m in current_config[k]){					
					if (JSON.stringify(current_config[k][m])==JSON.stringify(current_edit_hotspot)){						
						for (var j in current_config[k][m]){

							if (j=="URLs"){								
								current_config[k][m][j] = new_URLs_string;
							}
																	
							if (j=="show"){								
								current_config[k][m][j] = display;
							}

							if (j=="text"){											
								current_config[k][m][j] = itemtext;											
							}
						}
					}
				}
			}
		}		
	}

	console.log("current config " + JSON.stringify(current_config));
	
	// -----------------------------------------------------------------------------------
	// Save a copy of current config to project database
	// -----------------------------------------------------------------------------------
	var data = {};
	data.pItemId = projectItemId;
	//data.pItemId = projectItemId;
	data.configstring = String(JSON.stringify(current_config));
	
	var returnId = 'new';
	
	$.ajax
    ({
        type: 'POST',
        url: 'VWT_Viewer.aspx/WriteVWT_Config',
        async: false,
        data: JSON.stringify(data),        
        contentType: 'application/json; charset =utf-8',
        success: function (data) {
			//alert("Data Saved Successfully");
            var obj = data.d;
            returnId = obj;
			//location.reload();
			update_scene =true;			
            if (obj == 'true') {
                
                alert("Data Saved Successfully");
            }
			else if (obj =="fail"){
				//alert("Error Occured, Try Again!");
			}
			else if (obj =="fail 1"){
				//alert("Error Occured, Try Again! 1");
			}
			else if (obj =="fail 2"){
				//alert("Error Occured, Try Again! 2");
			}
			else if (obj =="fail 3"){
				//alert("Error Occured, Try Again! 3");
			}
			else{		
				//console.log("abc " + returnId);
				//alert("Error Occured, Try Again!");
			}
        },
        error: function (result) {            
            alert("Error Occured, Try Again!");
        }
    });

	
}

function CancelButtonClick(){
	var x = document.getElementById("infomenu");				
	x.style.display = "none";		
}

