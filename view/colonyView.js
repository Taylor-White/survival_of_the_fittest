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

	this.selectOrg = function(orgID){
		console.log("ORG " + orgID + " SELECTED");
		var oldID = this.currOrgID;
		this.currOrgID = orgID;

		$( "#mo" + oldID ).css("border", "0px solid black");
		$( "#mo" + orgID).css("border", "6px solid red");

		this.notifyObservers("OrgSelected" + orgID);
	}
	this.updateGenCount = function(gens){
		$("#gens").html("Generation: " + gens);
	}
	this.prepAfterLoad = function(cv){
		$( ".mini-org" ).click(function(event){
			orgID = this.id.substring(2, this.id.length);
			console.log("mini-org clicked! orgID: " + orgID);
			cv.selectOrg(orgID);
		});
		$( "#spawnWidth" ).change(function(event){
			console.log("spawn width: " + $('#spawnWidth').val());
			cv.notifyObservers("spawnWidth" + $('#spawnWidth').val());
		});
		$( "#spawnHeight" ).change(function(event){
			console.log("spawn height" + $('#spawnHeight').val());
			cv.notifyObservers("spawnHeight" + $('#spawnHeight').val());
		});		
		$( "#spawnDensity" ).change(function(event){
			console.log("spawn density: " + $('#spawnDensity').val());
			cv.notifyObservers("spawnDensity" + $('#spawnDensity').val());
		});		
		$( "#spawnCenterX" ).change(function(event){
			console.log("spawn centerX: " + $('#spawnCenterX').val());
			cv.notifyObservers("spawnCenterX" + $('#spawnCenterX').val());
		});			
		$( "#spawnCenterY" ).change(function(event){
			console.log("spawn centerY: " + $('#spawnCenterY').val());
			cv.notifyObservers("spawnCenterY" + $('#spawnCenterY').val());
		});	
		$( "#rand" ).click(function(event){
			cv.notifyObservers("UserRand");
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

		$( "#reset" ).click(function(event){
			cv.notifyObservers("UserResetCol");
		});
	}
	$(document).ready(this.prepAfterLoad(this));
}