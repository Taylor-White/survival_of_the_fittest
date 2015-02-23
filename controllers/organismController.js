/*
Organism: Organism
View: OrganismView 
File owner: Jared
*/

/* Constructor */
function organismController(){
	console.log("creating Organism Controller");
	this.orgView = new organismView();


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
		if(msg == "StateChanged"){
			this.stateChanged();
		}
	}

	/* function for when user chooses random */
	this.userRandState = function(){
		this.org.randomize();
	}

	/* function for when the user clicks on the canvas, records the coordinates */
	this.userToggleCell = function(x, y){
		this.org.toggleCell(x,y);
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
		this.orgView.updateAge(this.org.age);
		this.orgView.update(this.viewReady, this, this.org.getMatrix());
	}

	/* function for when the organism changes from alive or dead */
	this.stateChanged = function(){
		console.log();
		this.orgView.updateAge(this.org.age);
		this.orgView.update(this.viewReady, this, this.org.getMatrix());
	}

	this.viewReady = function(context){
		context.notifyObservers("ViewReady");
	}




}
