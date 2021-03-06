/*
View: Colony View
File owner: Taylor White
*/

/* function to highlight the selected organism to be displayed on canvas */

function colonyView(){
	console.log("creating Colony View");

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
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}};

	this.selectOrg = function(orgID){
		var oldID = this.currOrgID;
		this.currOrgID = orgID;

		$( "#mo" + oldID ).css("border", "1px solid #ccc");
		$( "#mo" + orgID).css("border", "4px solid #000");

		this.notifyObservers("OrgSelected" + orgID);
	};
	this.prepAfterLoad = function(cv){
		$( ".mini-org" ).click(function(event){
			orgID = this.id.substring(2, this.id.length);
			cv.selectOrg(orgID);
		});
		$( "#step" ).click(function(event){
			cv.notifyObservers("UserStep");
		});
		$( "#run" ).click(function(event){
			cv.notifyObservers("UserRun");
		});
		$( "#run-one-gen" ).click(function(event){
			cv.notifyObservers("UserRunOneGen");
		});
		$( "#pause" ).click(function(event){
			cv.notifyObservers("UserPause");
		});
		$( "#reset-gen" ).click(function(event){
			cv.notifyObservers("UserResetGen");
		});
		$( "#reset-universe" ).click(function(event){
			cv.notifyObservers("UserResetUniverse");
		});
	};
	
	$(document).ready(this.prepAfterLoad(this));
}