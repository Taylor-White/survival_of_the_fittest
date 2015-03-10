/*
Organism: Organism
View: OrganismView 
File owner: Jared
*/

/* Constructor */
function organismController(){
	console.log("creating Organism Controller");
	this.orgView = new organismView();
	this.statsView = new statsView();

	/* Speed control stuff */
	this.frameCount = 0;
	this.timeRunning = 0;
	this.timeStart = 0;
	
	/*	OBSERVABLE METHODS */
	this.observers = [];
	this.addObserver = function(observer){
		this.observers.push(observer); };
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

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		// console.log("orgCtrl received " + msg);
		if (msg == "StateChanged"){
			this.updateOrgView();
		}
	};

	/* function for when user chooses random */
	this.userRandState = function(){
		this.org.randomize();
		this.updateOrgView();
	};

	/* function for when the user wants to
	change the organism they are viewing */
	this.setSelectedOrg = function(org){
		if (this.org){
			this.org.removeObserver(this);
		}
		this.org = org;
		this.org.addObserver(this);
		
		this.updateOrgView();
	};
	this.getSelectedOrg = function(){
		return this.org;
	};

	this.updateOrgView = function(){
		this.orgView.update(this.org.getMatrix());
	};
}
