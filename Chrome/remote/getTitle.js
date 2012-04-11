var prashantScript = {
	execute : function () {
		prashantScript.fireCustomEvent();
	},
	
	fireCustomEvent: function() {
		var customEvent = document.createEvent('Event');
		customEvent.initEvent('PrashantEvent', true, true);
		var prashantData = document.createElement('input');
		prashantData.setAttribute('type','hidden');
		prashantData.setAttribute('id','prashantData');
		prashantData.setAttribute('value', prashantScript.getData());
		document.body.appendChild(prashantData);
		prashantData.dispatchEvent(customEvent);
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

};

prashantScript.execute();