/***********************8
Deals with importing and exporting
************************/
/*
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  document.getElementById('importDisplayError').innerHTML = 'Importing and Exporting are not fully supported in this browser.';
}

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    for (var i = 0, f; f = files[i]; i++) {
			var reader = new FileReader();
			console.log('hi');
			reader.onload = function(e){
				document.getElementById('fileDisplayArea').innerHTML = reader.result;
			}
			
			//reader.readAsText(file);
	    	//document.getElementById('importError').innerHTML = 'Can only import files with .lif extension';
	}

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
*/