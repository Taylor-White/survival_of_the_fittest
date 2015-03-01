/*
Organisms: list of Organisms
File owner: Xi
*/

/* represents the colony class */
function colony(numOrgs){
	console.log("creating Colony");

	/* Colony Properties */
	this.age = 0;
	this.gens = 0;
	// this.lifetime = 50;

	/* Org stuff */
	this.numOrgs = numOrgs;
	this.organism_list = [];
	this.checkin_list = [];

	/* Randomize Values */
	this.randWidth = 5;
	this.randHeight = 5;
	this.randX = 25;
	this.randY = 25;
	this.randDensity = 35;
	
	/* Stats */
	this.stats = new stats(numOrgs);

	/* Settings */
	this.settings = new settings();

	/*	OBSERVABLE METHODS */
	this.observers = [];
	this.addObserver = function(observer){
		this.observers.push(observer);	}
	this.removeObserver = function(observer){
		if (this.observers.length == 0){return;}
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}}
	this.notifyObservers = function(msg){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);}}

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		console.log("colony received "+ msg + " from " + observable);
		if (msg == "StateChanged"){
			// this.orgStateChanged(observable.orgID);
		}
	}

	/* Error Handling */
	this.errToString = function(err){
		if (err = 0){
			return "No Errors";
		} else if (err = 1){
			return "Can't step past lifetime";
		}
	}

	/* Get an organism by it's orgID */
	this.getOrg = function(orgID){
		return this.organism_list[orgID-1];
	}

	this.randSame = function(){
		console.log("Entered randSame");
		var randResult, col, row;

		this.organism_list[0].randomize(
								this.randWidth,
								this.randHeight,
								this.randX,
								this.randY,
								this.randDensity );
		this.organism_list[0].notifyObservers("StateChanged");

		for (var i = 1; i < this.organism_list.length; i++){
			var org = this.organism_list[i];
			org.setState(this.organism_list[0].getState());

			org.toggleCell(
				getRandInt(this.randX -1, this.randX + this.randWidth +1),
				getRandInt(this.randY -1, this.randY + this.randHeight +1) );

			org.notifyObservers("StateChanged");

		}
	}

	/* reset earch organism in the colony
		currently randomizes */
	this.resetEachOrg = function(){
		console.log("Resetting Colony");
		this.age = 0;	// reset age counter
		this.randSame();		// randomize each org
		for (org of this.organism_list){
			org.age = 0;	// reset each org's age

		}
		this.stats.clearStats();
	}

	this.resetColony = function(){
		this.resetEachOrg();
		this.gens = 0;
	}

	this.step = function(){
		// console.log("COLONY STARTING TO STEP");
		// console.log("                   col: " + col);

		if (this.age >= this.settings.getLifetime()){
			/* error code 1: Can't step past lifetime*/
			return 1;
		}

		/* step each org */
		for(var i = 0; i<this.organism_list.length; i++){
			// console.log("");
			// console.log("COLONY Age("+this.age+") STEPPING Org " + (i + 1));
			// console.log("------------------- ");
			this.organism_list[i].step();
		}

		/* increment age */
		this.age++;
		console.log("colony just turned " + this.age);
		/* "Grim Reaper" -- check if the thisony members should die */
		if (this.age >= this.settings.getLifetime()){
			this.genDone();	// generation done function
		}
	}

	/* handles the generation completing */
	this.genDone = function(){
		console.log("Gen Done");
		this.gens++;
		this.notifyObservers("GenDone");
	}

	this.evolve = function(){
		this.resetEachOrg();
		this.notifyObservers("Evolved");
	}

	this.toString = function(){
		return "The Colony | Age: " + this.age; 
	}

	this.initOrgs = function(){
		/* fill list of orgs */
		for (var i=0; i<numOrgs; i++){
			var org = new organism(i+1,50,50);
			org.addObserver(this);
			org.setStats(this.stats);
			org.setSettings(this.settings);
			this.organism_list.push( org );

			// org.addObserver(this);
		}
	}

	this.init = function(){
		this.initOrgs();

		   // alert(this.organism_list[0].getMatrix() == this.organism_list[1].getMatrix());
	}


	this.changeBirthArray = function(orgID, neighbs, bool){
		this.organism_list[orgID-1].changeBirthArray(neighbs,bool);
	}
	this.changeDeathArray = function(orgID, neighbs, bool){
		this.organism_list[orgID-1].changeDeathArray(neighbs,bool);
	}

	this.getSettings = function(){
		return this.settings;
	}

	/* SETUP */
	this.init();
}

function getRandInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


