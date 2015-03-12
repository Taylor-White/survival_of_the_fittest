/*****************
Displays information about settings
*****************/


function settingsView(){
	console.log("creating Organism Stats View");

	/*	OBSERVABLE METHODS */
	this.observers = [];
	this.addObserver = function(observer){
		this.observers.push(observer);	};
	this.removeObserver = function(observer){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}};
	this.notifyObservers = function(msg){
		console.log(this + " notifying that " + msg);
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}};

	
	/* Setters */
	this.setBirthArrayVal = function(neighbs, bool){
		$("#life-settings #birth  #" + neighbs + " :checkbox").prop("checked", bool);	};
	this.setSustainArrayVal = function(neighbs, bool){
		$("#life-settings #sustain  #" + neighbs + " :checkbox").prop("checked", bool);};


	this.toString = function(){
		return "The Settings View";
	};

	this.prepAfterLoad = function(sv){
		/* Loop through checkboxes to add onclick handlers */
		for (var i = 0; i < 9; i++){
			var cb = $( "#life-settings #birth #" + i).children(":checkbox");
			cb.change(function(sv,i){
				return function(){
					sv.notifyObservers("UserToggleBirth" + i);
				};
			}(sv,i));

			cb = $( "#life-settings #sustain #" + i).children(":checkbox");
			cb.change(function(sv,i){
				return function(){
					sv.notifyObservers("UserToggleSustain" + i);
				};
			}(sv,i));
		}
		$("#lifetime").change(function(sv, i){
			return function(){
				sv.notifyObservers("lifetime" + i);
			};
		});
		$("#slow").change(function(){
			sv.notifyObservers("UserSpeed4");
		});
		$("#medium").change(function(){
			sv.notifyObservers("UserSpeed8");
		});
		$("#fast").change(function(){
			sv.notifyObservers("UserSpeed100");
		});
		$( "#spawnWidth" ).change(function(event){
			// console.log("spawn width: " + $('#spawnWidth').val());
			sv.notifyObservers("spawnWidth" + $('#spawnWidth').val());
		});
		$( "#spawnHeight" ).change(function(event){
			// console.log("spawn height" + $('#spawnHeight').val());
			sv.notifyObservers("spawnHeight" + $('#spawnHeight').val());
		});		
		$( "#spawnDensity" ).change(function(event){
			// console.log("spawn density: " + $('#spawnDensity').val());
			sv.notifyObservers("spawnDensity" + $('#spawnDensity').val());
		});		
		$( "#spawnCenterX" ).change(function(event){
			// console.log("spawn centerX: " + $('#spawnCenterX').val());
			sv.notifyObservers("spawnCenterX" + $('#spawnCenterX').val());
		});			
		$( "#spawnCenterY" ).change(function(event){
			// console.log("spawn centerY: " + $('#spawnCenterY').val());
			sv.notifyObservers("spawnCenterY" + $('#spawnCenterY').val());
		});	
		$( "#lifetime" ).change(function(event){
			// console.log("lifetime: " + $('#spawnCenterX').val());
			sv.notifyObservers("lifetime" + $('#lifetime').val());
		});
		$( "#rand" ).click(function(event){
			sv.notifyObservers("UserRand");
		});		

	};

	$(document).ready(this.prepAfterLoad(this));
}