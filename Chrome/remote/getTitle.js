var quipperScript = {
	
	execute : function () {
		quipperScript.fireCustomEvent();
	},
	
	fireCustomEvent: function() {
		quipperScript.getUsername();
		var customEvent = document.createEvent('Event');
		customEvent.initEvent('QuipperEvent', true, true);
		var quipperData = document.createElement('input');
		quipperData.setAttribute('type','hidden');
		quipperData.setAttribute('id','quipperData');
		quipperData.setAttribute('value', quipperScript.getData());
		document.body.appendChild(quipperData);
		quipperData.dispatchEvent(customEvent);
	},

	getData: function(){
		var value = "Title is undefined";
		var t = document.getElementsByTagName('title')[0];
		if ( t.childNodes.length>0 ) {
			value = t.firstChild.data;
		} else if ( t.innerHTML ) {
			value = t.innerHTML;
		}
		return value;
	},
	getUsername: function(){
		alert("Add-on username: "+document.getElementById('QuipperAddonUsername').value);
	}
};

quipperScript.execute();