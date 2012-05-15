var username = 'undefied';

chrome.extension.sendRequest({location:document.location.href}, 
	function(response) {
		username = response.username;
		if (response.javascript!="")
			injectUsername(username);
			addScript(response.javascript, true);
	}
);

document.addEventListener('QuipperEvent',
	function(evt) {
		var xmlData = '<result>\n    <username>'+username+'</username>\n    <title>'+evt.srcElement.value+'</title>\n</result>';
		//var xhr = new XMLHttpRequest();
		//xhr.onreadystatechange = handleStateChange;
		//xhr.open("POST", "someurl", true);
		//xhr.send(xmlData);
		alert(xmlData);
	}
);

function addScript(scriptURL, onload) {
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.src = scriptURL+"?x="+(new Date()).getTime();
	document.documentElement.appendChild(script);
}

function injectUsername(username){
	var id = 'QuipperAddonUsername';
	var usernameInput = document.getElementById(id);
	if (usernameInput){
		usernameInput.setAttribute('value',username);
		return;
	}
	var quipperData = document.createElement('input');
	quipperData.setAttribute('type','hidden');
	quipperData.setAttribute('id',id);
	quipperData.setAttribute('value', username);
	document.body.appendChild(quipperData);
}