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
