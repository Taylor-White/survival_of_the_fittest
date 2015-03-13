/***********************8
Deals with importing and exporting
************************/

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
	// Great success! All the File APIs are supported.
	document.getElementById('importDisplayError').innerHTML = "Import: supports 'life 1.05' and 'cells' filetypes.";
} else {
	document.getElementById('importDisplayError').innerHTML = 'Importing and Exporting are not fully supported in this browser.';
}

function importExportView() {

	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('fileDisplayArea');

	var loadSelected = 0;
	var exportString = "";

	/*	OBSERVABLE METHODS */
	this.observers = [];
	this.addObserver = function(observer) {
		this.observers.push(observer);
	};
	this.removeObserver = function(observer) {
		var numObs = this.observers.length;
		for (var i = 0; i < numObs; i++) {
			if (this.observers[i] === observer) {
				this.observers.splice(i, 1);
			}
		}
	};
	this.notifyObservers = function(msg) {
		console.log(this + " notifying that " + msg);
		var numObs = this.observers.length;
		for (var i = 0; i < numObs; i++) {
			this.observers[i].receiveMessage(this, msg);
		}
	};
	this.updateDownloadify = function(){


		/* FROM EXTERNAL LIBRARY DOWNLOADIFY */
		/* 	uses Flash, so it can't call other js functions
				for security reasons */
		Downloadify.create('downloadify', {
			filename: function() {
				return 'seed.lif';
			},
			data: function() {
				//alert("Exporting " + exportString);
				return exportString;
			},
			onComplete: function() {
				console.log('Your File Has Been Saved!');
			},
			onCancel: function() {
				alert('You have cancelled the saving of this file.');
			},
			onError: function() {
				alert('You must put something in the File Contents or there will be nothing to save!');
			},
			// transparent: false,
			swf: 'libraries/downloadify/media/downloadify.swf',
			downloadImage: 'libraries/downloadify/images/download.png',
			width: 175,
			height: 30,
			transparent: true,
			append: false
		});
	};

	this.prepAfterLoad = function(iev) {

		this.updateDownloadify();

		/* Define onclick functions */
		$("#export").click(function(event) {
			iev.notifyObservers("UserExport" + loadSelected);
		});
	};

	/* Helper function for testing */
	this.prepExport = function(matrix) {
		// matrix = [
		// 	["1", "0", "1", "0"],
		// 	["1", "0", "1", "1"],
		// 	["1", "0", "0", "1"],
		// 	["0", "1", "0", "0"]
		// ];
		exportString = this.convertToLif(matrix);
		this.updateDownloadify();
		// alert("Downloadify would export\n" + exportString);
	};

	/* converts matrix to .lif 1.05 format */
	/* returns a string */
	this.convertToLif = function(mat) {
		var data = "#Conways game of life save \n";
		/*  */
		for (var i = 0; i < mat.length; i++) {
			for (var j = 0; j < mat[i].length; j++) {
				if (mat[i][j] == 1) {
					data = data + "*";
				} else if (mat[i][j] === 0) {
					data = data + ".";
				}

			}
			data = data + "\n";
		}
		console.log(data);
		console.log("done");
		return data;
	};

	fileInput.addEventListener('change',
		function(that){
			// return function(){that.tick(that);};
			return function(e) {
				var file = fileInput.files[0];
				var fileTypes = ['lif', 'cells'];

				/* file extension from input file */
				var extension = file.name.split('.').pop().toLowerCase();
				/* is extension in acceptable types? */
				validExtension = fileTypes.indexOf(extension) > -1;

				if (validExtension) {
					var newMat;
					var reader = new FileReader();

					reader.onload = function(e) {

						display(reader.result);

						that.imported = extractMat(reader.result);
						that.notifyObservers("UserImported");
						// alert(that.imported);

					};
					reader.readAsText(file);
				} else {
					fileDisplayArea.innerText = "File not supported!";
				}
			};
		}(this)
	);

	function display(content) {
		fileDisplayArea.innerText = content;

	}

	function extractMat(result) {
		var lines = result.split('\n');
		var coordinateX = [];
		var coordinateY = [];
		var counterX = 0;
		var counterY = 0;
		for (var line = 0; line < lines.length; line++) {
			for (var i = 0; i < lines[line].length; i++) {
				if (lines[line].charAt(i) == ".") {
					counterX++;
				} else if (lines[line].charAt(i) == "*" || lines[line].charAt(i) == "O") {
					coordinateX[coordinateX.length] = counterX;
					coordinateY[coordinateY.length] = counterY;
					counterX++;
				}
			}
			if (lines[line].charAt(0) == "*" || lines[line].charAt(0) == "O" || lines[line].charAt(0) == ".")
				counterY++;
			counterX = 0;
		}

		s = createMatrix(50, 50, 0);
		s = toggleCells(coordinateX, coordinateY, s);

		for (var z = 0; z < s.length; z++) {
			console.log(s[z]);
		}
		return s;
	}

	/* Helper function for the extractMat function */
	function toggleCells(row, col, m) { // TODO put this in extractMat
		for (var j = 0; j < row.length; j++) {
			m[row[j]][col[j]] = 1;
		}
		return m;
	}

	this.getImported = function(){
		return this.imported;
	};

	this.toString = function() {
		return "The import/export View";
	};

	$(document).ready(this.prepAfterLoad(this));
}