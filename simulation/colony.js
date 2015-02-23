/*
Organisms: list of Organisms
File owner: Xi
*/

/* represents the colony class */
function colony(numOrgs){
	console.log("creating Colony");

	this.numOrgs = numOrgs;
	this.age = 0;
	this.organism_list = [];
	this.checkin_list = [];
	this.lifetime = 20;
	this.running = false;
	this.isOrgsReady = false;
	this.isViewReady = false;
	this.isGenReady = true;


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
			this.observers[i].receiveMessage(this, msg);
		}}

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		console.log("colonyController received "+ msg + " from " + observable);
		if (msg == "StateChanged"){
			this.orgStateChanged(observable.orgID);
		}


	}
	this.incAge = function(){
		this.age++;
		console.log("Colony just turned " + this.age);
	}


	/* STEPPING & RUNNING METHODS */

	/* 	method for when the simulation should step 
		all the organisms in the simulation one time */
	this.step = function(col){
		console.log("COLONY STARTING TO STEP");
		console.log("                   col: " + col);
		col.isOrgsReady = false;
		col.isViewReady = false;
		col.isReady = false;
		var i = 0;
		for(i = 0; i<col.organism_list.length; i++){
			console.log("");
			console.log("COLONY STEPPING Org " + (i + 1));
			console.log("------------------- ");
			col.organism_list[i].step();
		}
		col.incAge();
	}

	/* method for when the simulation should continue to run out the simulation*/
	this.run = function(){
		this.running = true;
		while(this.running){
			this.runOneGen();
		}
	}

	/* method for when the simulation should
	continue stepping untill the organisms have reached lifetime */
	this.runOneGen = function(){
		if (!this.running){			// if not running
			this.setRunning(true);	// set to running
			/* Clear Checkin List */
			for (var i = 0; i < this.checkin_list.length; i++){
				this.checkin_list[i] = false;
			}
			/* if lifetime reached, set running false */
			if (this.age >= this.lifetime){
				col.genDone();
			} else {	// lifetime not reached
				this.isReady = false;
				this.step(this);
			}
		}
	}

	this.genDone = function(){
		this.setRunning(false);

	}

	/* method for the simulation to pause */
	this.pause = function(){
		this.setRunning(false);
	}



	this.getOrg = function(orgID){
		return this.organism_list[orgID-1];
	}

	this.rand = function(numLive){
		for (org of this.organism_list){
			org.randomize(numLive);
		}
	}

	this.resetCol = function(){
		this.setRunning(false);
		this.age = 0;
		this.rand(3);
	}

	this.setRunning = function(flag){
		console.log("Setting run to " + flag);
		this.running = flag;
		this.notifyObservers("RunFlagChange");
	}

	this.ready = function(){
		var col = this;
		console.log("READY ColAge: " + col.age);
		if (col.running){
			if (col.age >= col.lifetime){
				col.isGenReady = false;
				col.pause();
				return;
			} else if (col.isReady){
				console.log("SETTING STEP TIMEOUT");
				console.log(" 		colAge: " + col.age);
				console.log(" 		lifetime: " + col.lifetime);
				window.setTimeout(function(that){
					return function(){
						console.log("WHAT IS THAT? " + that);
						that.step(that);
					};
				}(this), 3000);
			}
		} else {
			this.isReady = true;
		}
	}

	this.orgStateChanged = function(orgID){
		this.checkin_list[orgID-1] = true;
		console.log("Org " + orgID + " checking in");
		console.log("CheckIn List " + this.checkin_list);
		/* if there's an org that's still not ready, return */
		for (var i = 0; i < this.checkin_list.length; i++){
			if (this.checkin_list[i] == false){
				return;
			}
		}
		/* if all orgs are ready
				clear the checkin list
				mark ready
		*/
		console.log("ALL ORGS READY");
		this.orgsReady();
		// this.isReady = true;
		// this.ready();
	}

	/* if view is ready too, then colony is ready */
	this.orgsReady = function(){
		this.isOrgsReady = true;
		if (this.isViewReady){
			this.ready();
		}
	}

	/* if orgs are ready too, then colony is ready */
	this.viewReady = function(){
		this.isViewReady = true;
		if (this.isOrgsReady){
			this.ready();
		}
	}

	/* SETUP */
	/* fill list of orgs */
	for (var i=0; i<numOrgs; i++){
		var org = new organism(i+1,50,50);
		org.addObserver(this);
		this.organism_list.push( org );
		// org.addObserver(this);
	}
}


