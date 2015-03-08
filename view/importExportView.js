/***********************8
Deals with importing and exporting
************************/

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
  document.getElementById('importDisplayError').innerHTML = "Import: supports 'lif' and 'cells' filetypes.";
} else {
  document.getElementById('importDisplayError').innerHTML = 'Importing and Exporting are not fully supported in this browser.';
}


function importView(){

	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');

	var loadSelected = 0;

	/*	OBSERVABLE METHODS */
	this.observers = [];
	this.addObserver = function(observer){
		this.observers.push(observer);	}
	this.removeObserver = function(observer){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}}
	this.notifyObservers = function(msg){
		console.log(this + " notifying that " + msg);
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}}

	this.prepAfterLoad = function(iev){

		$( "#export" ).click(function(event){
			iev.notifyObservers("UserExport" + loadSelected);
		});
	}




	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var fileTypes = ['lif', 'cells'];

		var extension = file.name.split('.').pop().toLowerCase(),  //file extension from input file
	    validExtension = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types

		if (validExtension) {
	    	var newMat;
			var reader = new FileReader();

			reader.onload = function(e) {
				
				display(reader.result);

				var newMat = extractMat(reader.result);

			}
			reader.readAsText(file);
		} else {
			fileDisplayArea.innerText = "File not supported!";
		}
	});
	function display(content){
		fileDisplayArea.innerText = content;
	}

	function extractMat(result){
		var lines = result.split('\n');
		var coordinateX = [];
		var coordinateY = [];
		var counterX = 0;
		var counterY = 0;
	    for(var line = 0; line < lines.length; line++){
	      for(var i = 0; i < lines[line].length; i++){
	      	if(lines[line].charAt(i) == "."){
	      		counterX++;
	      	} else if(lines[line].charAt(i) == "*" || lines[line].charAt(i) == "O"){
	      		coordinateX[coordinateX.length] = counterX;
	      		coordinateY[coordinateY.length] = counterY;
	      		counterX++;
	      	}
	      }
	      if(lines[line].charAt(0) == "*" || lines[line].charAt(0) == "O" || lines[line].charAt(0) == ".")
	      	counterY++;
	      counterX = 0;
	    }

	    s = createMatrix(Math.max.apply(Math,coordinateX)+1,Math.max.apply(Math,coordinateY)+1,0);
	    s = toggleCells(coordinateX, coordinateY, s);

		for(var z = 0; z < s.length; z++) {
		 console.log(s[z]);
		}
	    return s;
	}		    

	this.toggleCells = function(row, col, m){
	    for( var j = 0; j<row.length; j++){
				m[row[j]][col[j]] = 1;
	    }	
		return m;
	}

	this.exportFile = function(){

		var data = "blarg";//[["0", "0", "1", "0"], ["1", "0", "1", "1"], ["1", "0", "0", "1"], ["0", "1", "0", "0"]];
		
			data.href = 'data:text/plain;charset=utf-8,' + data;
    		data.download = 'data.txt';
    		console.log("export should have worked");
		/*var csvContent = "data:text/plain;charset=utf-8,";
		data.forEach(function(infoArray, index){

		   dataString = infoArray.join(",");
		   csvContent += index < data.length ? dataString+ "\n" : dataString;

		}); 
		var encodedUri = encodeURI(csvContent);
		window.open(encodedUri);
		//window.location.href = url;
		console.log("exporting file");*/
	}
	this.toString = function(){
		return "The import/export View";
	}

	$(document).ready(this.prepAfterLoad(this));	
}	