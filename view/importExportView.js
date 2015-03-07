/***********************8
Deals with importing and exporting
************************/

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
  document.getElementById('importDisplayError').innerHTML = 'Import supported.';
} else {
  document.getElementById('importDisplayError').innerHTML = 'Importing and Exporting are not fully supported in this browser.';
}


function importView(){

	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');

	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var fileTypes = ['lif', 'cells'];

		var extension = file.name.split('.').pop().toLowerCase(),  //file extension from input file
	    validExtension = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types

		if (validExtension) {
			var reader = new FileReader();

			reader.onload = function(e) {
				fileDisplayArea.innerText = reader.result;
				display(reader.result);

				newMat = extractMat(reader.result);


			}

			reader.readAsText(file);	
		} else {
			fileDisplayArea.innerText = "File not supported!"
		}
	});
	function display(content){
				var display = content;
				console.log(display);

	}

	function extractMat(result){
		var lines = result.split('\n');
		var coordinateX = [];
		var coordinateY = [];
		var counterX = 0;
		var counterY = 0;
	    for(var line = 0; line < lines.length; line++){
	      console.log(lines[line]);
	      /*if(lines[line].charAt(0) != "*" || lines[line].charAt(0) != "O"){
	      	counterX = 0;
	      	counterY = 0;
	      }*/
	      for(var i = 0; i < lines[line].length; i++){

	      	console.log(lines[line].charAt(i));
	      	if(lines[line].charAt(i) == "."){
	      		counterX++;
	      	} else if(lines[line].charAt(i) == "*" || lines[line].charAt(i) == "O"){
	      		coordinateX[coordinateX.length] = counterX;
	      		coordinateY[coordinateY.length] = counterY;
	      		counterX++;
	      	}
	      	//if(lines[line])

	      }
	      if(lines[line].charAt(0) == "*" || lines[line].charAt(0) == "O" || lines[line].charAt(0) == ".")
	      	counterY++;
	      counterX = 0;

	    }
	    console.log(coordinateX);
	    console.log(coordinateY);
	    s = createMatrix(coordinateX.length,coordinateY.length,0);
	    s = toggleCells(coordinateX, coordinateY, s);
	    //Display in console
	    console.log("Matrix: \n");
		for(var z = 0; z < s.length; z++) {
		 console.log(s[z]);
		}

	    return s;
	}		    


	function toggleCells(row, col, m){
	    for( var j = 0; j<row.length; j++){
	    	//console.log("x coordinate: " + row[j]);
	    	//console.log("y coordinate: " + col[j]);
				m[row[j]][col[j]] = 1;

	    }	

		return m;
	}
}	