/*****************
Displays information about settings
*****************/


function settingsView(){
	console.log("creating Organism Stats View");

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

	
	this.setBirthArrayVal = function(neighbs, bool){
		// console.log("Settings View updating birthArray | neighbs: " + neighbs + ": " + bool);
		$("#life-settings #birth  #" + neighbs + " :checkbox").prop("checked", bool);
		// alert($("#life-settings #birth  #" + neighbs + " :checkbox").is(":checked") );
	}
	this.setSustainArrayVal = function(neighbs, bool){
		// console.log("Settings View updating sustainArray | neighbs: " + neighbs + ": " + bool);
		$("#life-settings #sustain  #" + neighbs + " :checkbox").prop("checked", bool);
	}


	this.toString = function(){
		return "The Settings View";
	}

	this.prepAfterLoad = function(sv){
		/* Loop through checkboxes */
		for (var i = 0; i < 9; i++){
			var cb = $( "#life-settings #birth #" + i).children(":checkbox");
			cb.change(function(sv,i){
				return function(){
					sv.notifyObservers("UserToggleBirth" + i);
				}
			}(sv,i));

			cb = $( "#life-settings #sustain #" + i).children(":checkbox");
			cb.change(function(sv,i){
				return function(){
					sv.notifyObservers("UserToggleSustain" + i);
				}
			}(sv,i));
		}

		$("#slow").change(function(){
			sv.notifyObservers("UserSpeed4");
		});
		$("#medium").change(function(){
			sv.notifyObservers("UserSpeed8");
		});
		$("#fast").change(function(){
			sv.notifyObservers("UserSpeed100");
		});

	}

	$(document).ready(this.prepAfterLoad(this));
};