function anError(error, showHTML) {
	var errorMsg = document.createElement('div');
	errorMsg.className = 'pnlm-info-box';
	var p = document.createElement('p');
	if (showHTML)
		p.innerHTML = error;
	else
		p.textContent = error;
	errorMsg.appendChild(p);
	document.getElementById('container').appendChild(errorMsg);
}

// Set icon 20210301
function createHotspot(linkType, linkText, hotSpotDiv) {
	hotSpotDiv.className = "pnlm-hotspot-base pnlm-tooltip ";

	var linkBtn = document.createElement('div');

	linkBtn.innerHTML = '<button class="btnHotspot">' + linkType + '</button>';
	//linkBtn.innerHTML = '<button class="btnHotspot"></button>';
	hotSpotDiv.appendChild(linkBtn);

	if (linkText != "") {
		var tooltip = document.createElement('span');
		tooltip.innerHTML = linkText;
		hotSpotDiv.appendChild(tooltip);

		tooltip.style.width = tooltip.scrollWidth - 20 + 'px';
		tooltip.style.marginLeft = -(tooltip.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
		tooltip.style.marginTop = -tooltip.scrollHeight - 12 - linkBtn.scrollHeight + 'px';
	}
}

var viewer;
function parseURLParameters() {

	var URL;
	if (window.location.hash.length > 0) {
		// Prefered method since parameters aren't sent to server
		URL = window.location.hash.slice(1);
		//console.log("URL1 " + URL);
	} else {
		URL = window.location.search.slice(1);
		//console.log("URL2 " + URL);
	}
	// if (!URL) {
	// // Display error if no configuration parameters are specified
	// anError('No configuration options were specified.');
	// return;
	// }
	console.log("URL", URL)
	URL = URL.split('&');
	var configFromURL = {};
	/* Custom config 20210301 */
	var ts = Math.random() * 10000000000000000000;
	configFromURL["config"] = decodeURIComponent("pano.json") + "?_=" + ts;


	//console.log("configFromURL " + JSON.stringify(configFromURL));

	//configFromURL["preview"]= "Opening_Screen.jpg";
	configFromURL["autoLoad"] = true;
	console.log("URL", URL)
	for (var i = 0; i < URL.length; i++) {
		var option = URL[i].split('=')[0];

		//console.log("option " + option);

		var value = URL[i].split('=')[1];

		//console.log("value " + value);

		if (value == '')
			continue; // Skip options with empty values in URL config
		switch (option) {
			case 'hfov': case 'pitch': case 'yaw': case 'haov': case 'vaov':
			case 'minHfov': case 'maxHfov': case 'minPitch': case 'maxPitch':
			case 'minYaw': case 'maxYaw': case 'vOffset': case 'autoRotate':
				configFromURL[option] = Number(value);
				break;
			case 'autoLoad': case 'ignoreGPanoXMP': case 'floorplanview': case 'fullscreenActive':
				configFromURL[option] = JSON.parse(value);
				break;
			case 'author': case 'title': case 'firstScene': case 'fallback':
			case 'preview': case 'panorama': case 'config': case 'panoramaflip':
				configFromURL[option] = decodeURIComponent(value);
				break;
			// default:
			// anError('An invalid configuration parameter was specified: ' + option);
			// return;
		}
	}

	var request;

	// Check for JSON configuration file
	console.log("configFromURL ", configFromURL)
	if (configFromURL.config) {
		// Get JSON configuration file
		request = new XMLHttpRequest();
		request.onload = function () {
			if (request.status != 200) {
				// Display error if JSON can't be loaded
				var a = document.createElement('a');
				a.href = configFromURL.config;
				a.textContent = a.href;
				anError('The file ' + a.outerHTML + ' could not be accessed.', true);
				return;
			}

			var responseMap = JSON.parse(request.responseText);

			// Set JSON file location
			if (responseMap.basePath === undefined)
				responseMap.basePath = configFromURL.config.substring(0, configFromURL.config.lastIndexOf('/') + 1);

			// Merge options
			for (var key in responseMap) {
				if (configFromURL.hasOwnProperty(key)) {
					continue;
				}
				configFromURL[key] = responseMap[key];
			}

			// Set title
			if ('title' in configFromURL)
				document.title = configFromURL.title;

			// Set icon 20210301
			/*for(var scene in configFromURL["scenes"]) {
				for(var sceneInfo in configFromURL["scenes"][scene]) {				
					if(configFromURL["scenes"][scene]["hotSpots"]) {
						configFromURL["scenes"][scene]["hotSpots"].forEach(function(hs, index) {
							if(hs["type"]) {
								if(hs["type"] && hs["type"] == "info") {
									var linkType = "default";
									var linkText = "";
									if(hs["linktype"]) {
										if(hs["text"])
											linkText = hs["text"];
										linkType = hs["linktype"];									
										hs["createTooltipFunc"] = createHotspot.bind(null, linkType, linkText);
									}
								}									
							}
						});
					}
				}	
			}*/

			// Create viewer
			configFromURL.escapeHTML = true;

			console.log("vwt_DB_config\n" + vwt_DB_config);
			if ((vwt_DB_config != "fail") && (vwt_DB_config != "") && (vwt_DB_config != 0)) {

				//console.log("configFromURL " + JSON.stringify(configFromURL));
				//console.log("vwt_DB_config " + JSON.stringify(vwt_DB_config));
				//console.log("configFromURL " + JSON.stringify(configFromURL.panorama));
				//console.log("vwt_DB_config " + JSON.stringify(vwt_DB_config.scenes));
				//console.log("vwt_DB_config " + JSON.stringify(vwt_DB_config.panorama));

				configFromURL.scenes = vwt_DB_config.scenes;


				//configFromURL.panorama = vwt_DB_config.panorama;
				//console.log("after vwt_DB_config " + JSON.stringify(configFromURL.panorama));
				//configFromURL.dynamic = true;
				//console.log("after configFromURL " + JSON.stringify(configFromURL));
			}
			configFromURL.edithotspot = false;
			//console.log("configFromURL\n" + JSON.stringify(configFromURL.hotSpots));

			viewer = pannellum.viewer('container', configFromURL);
			// Toggle once for on load fullscreen
			if (configFromURL.fullscreenActive) {
				viewer.on('load', function () {
					viewer.toggleFullscreen();
					// remove load listen
					viewer.off('load')
				})
			}
		};
		request.open('GET', configFromURL.config);
		request.send();
		return;
	}

	// Set title
	if ('title' in configFromURL)
		document.title = configFromURL.title;

	// Create viewer
	configFromURL.escapeHTML = true;
	configFromURL.targetBlank = true;
	configFromURL = vwt_DB_config;

	viewer = pannellum.viewer('container', configFromURL);
}

// Display error if opened from local file
if (window.location.protocol == 'file:') {
	anError('Due to browser security restrictions, Pannellum can\'t be run ' +
		'from the local filesystem; some sort of web server must be used.');
} else {
	// Initialize viewer
	parseURLParameters();
}
