var _TOTAL_ROWS_=7;

function save_options() {
	var usernameText = document.getElementById("username");
	var username = trim(usernameText.value);
	if (username==""){
		changeStyle(usernameText, "inputHighlighted");
		usernameText.focus();
		return false;
	}
	changeStyle(usernameText, "");
	localStorage["username"]=trim(document.getElementById("username").value);
	var itemsCount=getLastIndex();
	if (itemsCount==-1)
		return;
	localStorage["itemsCount"]=itemsCount;
	var table = document.getElementById("urljsmaptable");
	for (var i=1; i<itemsCount; i++){
		var cells = table.rows[i].cells;
		localStorage["row_"+i+"_0"]=cells[0].innerHTML;
		localStorage["row_"+i+"_1"]=cells[1].innerHTML;
	}
}

function restore_options() {
	var username = localStorage["username"];
	if (username) {
		document.getElementById("username").value = username;
	}
	var itemsCount = localStorage["itemsCount"];
	if (itemsCount) {
		var table = document.getElementById("urljsmaptable");
		for (var i=1; i<itemsCount; i++){
			addRow(localStorage["row_"+i+"_0"],localStorage["row_"+i+"_1"]);
		}
	}
	addEmptyRows();
}

function resetRadioBtns(){
	var elems = document.getElementsByName('tableradio');
	for(var i=0;i<elems.length;i++)
		elems[i].checked=false;
}

function getSelectedRadioBtn(){
	var result = -1;
	var elems = document.getElementsByName('tableradio');
	for(var i=0;i<elems.length;i++){
		if (elems[i].checked){
			result = i;
			break;
		}
	}
	return result;
}

function validateItem(itemNr){
	var isValid = true;
	var urlText = document.getElementById('urlText');
	urlText.value = trim(urlText.value);
	if (urlText.value!='' && webAddrExists(urlText.value,itemNr)){
		alert("The "+urlText.value+" already in the list");
		return;
	}
	if (urlText.value=="" /*|| !isUrl(urlText.value)*/){
		urlText.focus();
		isValid = false;
		changeStyle(urlText, "bigText inputHighlighted");
	}else{
		changeStyle(urlText, "bigText");
	}
	var jsText = document.getElementById('jsText');
	jsText.value = trim(jsText.value);
	if (jsText.value=="" || !isUrl(jsText.value) || jsText.value.lastIndexOf('.js')!=jsText.value.length-3){
		if (isValid)
			jsText.focus();
		isValid = false;
		changeStyle(jsText, "bigText inputHighlighted");
	}else{
		changeStyle(jsText, "bigText");	
	}
	return isValid;
}

function addItem(){
	if (!validateItem(-1))
		return;
	var urlText = document.getElementById('urlText');
	var jsText = document.getElementById('jsText');
	addRow(urlText.value,jsText.value);
	resetSelectedRadio();
}

function initEditItem(){
	var targetItem = getSelectedRadio();
	if (targetItem==-1)
		return;
	var table = document.getElementById("urljsmaptable");
	var row = table.rows[targetItem];
	document.getElementById('urlText').value=row.cells[0].innerHTML;
	document.getElementById('jsText').value=row.cells[1].innerHTML;
	document.getElementById('addBtn').setAttribute('hidden',"true");
	document.getElementById('okBtn').removeAttribute('hidden');
}

function editItem(){
	var targetItem = getSelectedRadio();
	if (targetItem==-1)
		return;
	if (!validateItem(targetItem))
	        return;
	var table = document.getElementById("urljsmaptable");
	var row = table.rows[targetItem];
	var urlText = document.getElementById('urlText');
	var jsText = document.getElementById('jsText');
	row.cells[0].innerHTML = urlText.value;
	row.cells[1].innerHTML = jsText.value;
	document.getElementById('okBtn').setAttribute('hidden',"true");
	document.getElementById('addBtn').removeAttribute('hidden');
	resetSelectedRadio();
}

function isUrl(str) {
	var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
	return regexp.test(str);
}

function trim(str){
	return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
}
function changeStyle(element,newclass){
	element.setAttribute("class",newclass);
}

function getLastIndex(){
	var table = document.getElementById("urljsmaptable");
	var rowCount = table.rows.length;
	var result = -1;
	for (var i=1; i< rowCount; i++){
		if (table.rows[i].cells[0].innerHTML==''){
			result = i;
			break;
		}
	}
	return result;
}

function webAddrExists(str, itemNr){
	var result = false;
	var table = document.getElementById("urljsmaptable");
	var rowCount = table.rows.length;
	for (var i=1; i<rowCount; i++){
		if (itemNr==i)
			continue;
		if (table.rows[i].cells[0].innerHTML == str){
			result = true;
			break;
		}
	}
	return result;
}
function addRow(url,js) {
	var table = document.getElementById("urljsmaptable");
	var rowCount = table.rows.length;
	var lastIndex = getLastIndex();
	if (lastIndex!=-1 && rowCount==_TOTAL_ROWS_+1 && url!='' && js!='') {
		var row = table.rows[lastIndex];
		row.cells[0].innerHTML = url;
		row.cells[1].innerHTML = js;
		row.cells[2].firstChild.removeAttribute("disabled");
	}else{
		var row = table.insertRow(rowCount);
		var cell1 = row.insertCell(0);
		cell1.innerHTML = url;
		var cell2 = row.insertCell(1);
		cell2.innerHTML = js;
		var cell3 = row.insertCell(2);
		var element2 = document.createElement("input");
		element2.type = "radio";
		element2.name = "tableradio";
		element2.setAttribute("onchange","radioOnChange()");
		if (url=='' && js=='') {
			element2.setAttribute("disabled","true");
		}
		cell3.appendChild(element2);
	}
}

function addEmptyRows(){
	var table = document.getElementById("urljsmaptable");
	var rowCount = table.rows.length;
	for (var i=0; i<_TOTAL_ROWS_ + 1 - rowCount; i++){
		addRow('','');
	}
}

function getSelectedRadio(){
	var result = -1;
	var radio = document.getElementsByName("tableradio");
	for (var i=0; i<radio.length; i++){
		if (radio[i].checked){
			result = i+1;
			break;
		}
	}
	return result;
}

function resetSelectedRadio(){
	var radio = document.getElementsByName("tableradio");
	for (var i=0; i<radio.length; i++){
		radio[i].checked = false;
	}
	document.getElementById("editBtn").setAttribute("disabled","true");
	document.getElementById("deleteBtn").setAttribute("disabled","true");
	document.getElementById('urlText').value='';
	document.getElementById('jsText').value='';
}

function deleteItem(){
	var targetItem = getSelectedRadio();
	if (targetItem==-1)
		return;
	var table = document.getElementById("urljsmaptable");
	var row = table.rows[targetItem];
	if (confirm("This row will be removed\n"+row.cells[0].innerHTML+"<-->"+row.cells[1].innerHTML)){
		table.deleteRow(targetItem);
		var rowCount = table.rows.length;
		if (rowCount<_TOTAL_ROWS_+1) {
			addEmptyRows();
		}
	}
}

function radioOnChange(){
	document.getElementById("editBtn").removeAttribute("disabled");
	document.getElementById("deleteBtn").removeAttribute("disabled");
}