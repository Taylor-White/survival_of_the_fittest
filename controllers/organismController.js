/*
Organism: Organism
View: OrganismView 
File owner: Jared
*/

/* Constructor */
function organismController(){
	console.log("creating Organism Controller");
	this.orgView = new organismView();

	/* Speed control stuff */
	this.frameCount = 0;
	this.timeRunning = 0;
	this.timeStart = 0;
	
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
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}}

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		console.log("orgCtrl received " + msg);
		if(msg == "UpdateOrgView"){
			this.updateOrgView();
		} else if (msg == "StateChanged"){
			this.stateChanged();
		} else if (msg == "ChangeRunTrue"){
			this.runFlagChanged(true);
		} else if (msg == "ChangeRunFalse"){
			this.runFlagChanged(false);
		}
	}

	/* function for when user chooses random */
	this.userRandState = function(){
		this.org.randomize();
		this.updateOrgView();
	}

	/* function for when the user clicks on the canvas, records the coordinates */
	this.userToggleCell = function(x, y){
		this.org.toggleCell(x,y);
		this.updateOrgView();
	}

	/* function for when the user wants to clear the canvas */
	this.userClearState = function(){
		this.org.clearState();
	}

	/* function for when the user wants to change the organism they are using */
	this.setSelectedOrg = function(org){
		if (this.org){
			this.org.removeObserver(this);
		}
		this.org = org;
		this.org.addObserver(this);
		this.updateOrgView();
	}

	/* function for when the organism changes from alive or dead */
	this.stateChanged = function(){
		this.updateOrgView();		
	}

	this.updateOrgView = function(){
		this.orgView.updateAge(this.org.age);
		this.orgView.update(this.org.getMatrix());
	}
	/*

	this.viewReady = function(context){
		// context.notifyObservers("ViewReady");

		// context.frameCount++;
	}
	this.runFlagChanged = function(bool){
		if (bool){
			this.winIntervalID = window.setInterval(this.tick(this),1000);
			// this.updateFPS();
		} else {
			window.clearInterval(this.winIntervalID);
		}
	}
*/
/* WORKING ON THIS */


	/* 
	this.updateFPS = function(){
		var fps = this.frameCount / this.timeRunning;
		this.frameCount = 0;
		console.log("Updating FPS: " + fps);
		// this.fps = fps;
		 this.orgView.updateFPS(fps);
	}

	when called, tick needs a reference to organismController passed with 
		Returns: a function with the appropriate context so that it can be passed around as a var
	this.tick = function(oc){
		return function(){
			console.log("INC SEC");
			oc.frameCount++;
			// alert("Frame Count: " + oc.frameCount);
			oc.updateFPS();
			// oc.orgView.viewReady();

			oc.orgView.update(oc.viewReady, oc, oc.org.getMatrix());
		}
	}
	*/

}
