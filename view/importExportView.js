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
	var textType = /text.*/;

	if (file.type.match(textType)) {
		var reader = new FileReader();

		reader.onload = function(e) {
			fileDisplayArea.innerText = reader.result;
		}

		reader.readAsText(file);	
	} else {
		fileDisplayArea.innerText = "File not supported!"
	}
});

