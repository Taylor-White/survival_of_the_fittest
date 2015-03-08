/*****************
Displays information about saved simulations

Registers click handlers for 
internal save and load functions

*****************/

function saveloadView(){
	console.log("creating saveload View");

	/* TEMPORARILY initializing to 0
			decide best way later */
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

	this.prepAfterLoad = function(sv){

		$( "#save" ).click(function(event){
			sv.notifyObservers("UserSave");
		})
		$( "#load" ).click(function(event){
			sv.notifyObservers("UserLoad" + loadSelected);
		});
	}
	this.updateSavedList = function(numSaved){
		console.log("numsaved: " + numSaved);
		savedSeedLinks.innerText = " ";
		if(numSaved == 0){
			savedSeedLinks.innerText = "No saved seeds";
		}else{
			for(var i=0; i<numSaved; i++){
				//Display saved seeds
				$( "#savedSeedLinks" ).append("<p>Saved" + [i] + "</p>");
			}
		}	
	}
	this.updateSavedList(4);
	$(document).ready(this.prepAfterLoad(this));
}