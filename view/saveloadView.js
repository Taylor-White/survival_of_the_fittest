/*****************
Displays information about saved simulations

Registers click handlers for 
internal save and load functions

*****************/

function saveloadView(){
	console.log("creating Colony View");

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

		$( "#reset" ).click(function(event){
			cv.notifyObservers("UserResetCol");
		});
	}
	
	$(document).ready(this.prepAfterLoad(this));
}