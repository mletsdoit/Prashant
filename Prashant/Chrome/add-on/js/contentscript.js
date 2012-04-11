var username = 'undefied';

chrome.extension.sendRequest({location:document.location.href}, 
	function(response) {
		username = response.username;
		if (response.javascript!="")
			addScript(response.javascript, true);
	}
);

document.addEventListener('PrashantEvent',
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