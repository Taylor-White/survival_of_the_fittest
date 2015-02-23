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
	this.lifetime = 50;

	/* Org stuff */
	this.numOrgs = numOrgs;
	this.organism_list = [];
	this.checkin_list = [];
	
	/* Run Control Stuff */
	this.running = false;
	this.isOrgsReady = false;
	this.isViewReady = false;
	this.shouldAdvanceGen = true;
	// this.isGenReady = true;

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
		console.log("colonyController received "+ msg + " from " + observable);
		if (msg == "StateChanged"){
			this.orgStateChanged(observable.orgID);
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

	/* Increment the Colony's Age */
	this.incAge = function(){
		this.age++;
		console.log("Colony just turned " + this.age);
		if (this.age >= this.lifetime){
			this.pause();
			this.genDone();
		}
	}

	/* Get an organism by it's orgID */
	this.getOrg = function(orgID){
		return this.organism_list[orgID-1];
	}

	/* Colony Control Stuff*/

	/* Randomize each Org */
	this.rand = function(numLive){
		for (org of this.organism_list){
			org.randomize(numLive);
		}
	}

	this.resetCol = function(){
		console.log("Resetting Colony");
		this.pause();
		this.age = 0;
		this.gens = 0;
		this.clearCheckinList();
		for (org of this.organism_list){
			org.age = 0;
		}
		this.rand(10);
	}

	this.clearCheckinList = function(){
		console.log("Clearing CheckIn List");
		for (var i = 0; i < this.checkin_list.length; i++){
			this.checkin_list[i] = false;
		}
		this.isOrgsReady = false;
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
		/*if (this.running){
		}*/
		// this.isReady = true;
		// this.ready();
	}


	/* Run Control Stuff */
	/* STEPPING & RUNNING METHODS */

	/* 	method for when the simulation should step 
		all the organisms in the simulation one time */
	this.step = function(col){
		// console.log("COLONY STARTING TO STEP");
		// console.log("                   col: " + col);
		col.isOrgsReady = false;
		col.isViewReady = false;
		// col.isReady = false;

		if (col.age >= col.lifetime){
			/* error code 1: Can't step past lifetime*/
			return 1;
		}

		/* Clear the checkin list */
		col.clearCheckinList();

		/* step each org */
		for(var i = 0; i<col.organism_list.length; i++){

			console.log("");
			console.log("COLONY Age("+col.age+") STEPPING Org " + (i + 1));
			console.log("------------------- ");
			col.organism_list[i].step();
		}

		/* increment age */
		col.incAge();
	}

	/* method for when the simulation should continue to run out the simulation*/
	this.run = function(){
		this.shouldAdvanceGen = true;
		if (this.age == this.lifetime){
			this.genDone();
			return;
		}
		this.runOneGen();
	}

	/* method for when the simulation should
	continue stepping untill the organisms have reached lifetime */
	this.runOneGen = function(){
		// this.shouldAdvanceGen = false;
		if (this.running){
			this.shouldAdvanceGen = false;
		} else {			// if not running
			if (this.age >= this.lifetime){
				/* error code 1: Can't step past lifetime*/
				return 1;
			}
			this.setRunning(true);	// set to running
			/* Clear Checkin List */
			this.clearCheckinList();
			/* if lifetime reached, set running false */
			if (this.age >= this.lifetime){
				this.genDone();
			} else {	// lifetime not reached
				this.isReady = false;
				this.step(this);
			}
		}
	}


	this.genDone = function(){
		console.log("Gen Done");
		this.gens++;
		this.pause();
		this.clearCheckinList();
		this.notifyObservers("GenDone");
		if(this.shouldAdvanceGen){
			this.resetCol();
			this.runOneGen();
		}
	}

	/* method for the simulation to pause */
	this.pause = function(){
		console.log("Pausing");
		this.isColsReady = false;
		this.isViewReady = false;
		this.setRunning(false);
	}

	/* if view is ready too, then colony is ready */
	this.orgsReady = function(){
		this.isOrgsReady = true;
		if (this.isViewReady && this.running){
			this.ready();
		}
	}

	/* if orgs are ready too, then colony is ready */
	this.viewReady = function(){
		this.isViewReady = true;
		if (this.isOrgsReady && this.running){
			this.ready();
		}
	}

	this.setRunning = function(flag){
		console.log("Setting run to " + flag);
		this.running = flag;
		this.notifyObservers("RunFlagChange");
	}

	this.ready = function(){
		var col = this;
		console.log("READY ColAge: " + col.age);
		console.log("# BEFORE----------------------");
		console.log("# 	    running: " + col.running);
		// console.log("#   isGenReady: " + col.isGenReady);
		// console.log("# 	   isReady: " + col.isReady);
		console.log("# 	isOrgsReady: " + col.isOrgsReady);
		console.log("# 	isViewReady: " + col.isViewReady);
		console.log("#     lifetime: " + col.lifetime);
		console.log("# ---------------------------");

		if (col.running){
			console.log("  CHECK  ----  col running");
			console.log("  CHECK  ----  " );
			console.log("  CHECK  ----  " );
			if (col.age >= col.lifetime){
				console.log("  CHECK  ----  ----  col too OLD");
				// col.isGenReady = false;
				col.pause();
				return;
			} else {
				console.log("  CHECK  ----  ----  col YOUNG enough" );
				console.log("  CHECK  ----  ----  ----  col isReady" );
				console.log("SETTING STEP TIMEOUT");
				console.log(" 		colAge: " + col.age);
				console.log(" 		lifetime: " + col.lifetime);
				// this.step(this);
				
				window.setTimeout(
					function(that){
						return function(){
							// console.log("WHAT IS THAT? " + that.toString());
							if (that.running){
								that.step(that);
							}
						};
					}(this), 100);
/*				if (col.isReady){
				} else {
					console.log("  CHECK  ----  ----  ----  col NOT isReady" );
					
				}*/
			}
		} else {
			console.log("  CHECK  ----  col NOT running" );
			return;
			// this.isReady = true;
		}

		console.log("# AFTER----------------------");
		console.log("# 	   running: " + col.running);
		// console.log("#  isGenReady: " + col.isGenReady);
		// console.log("# 	   isReady: " + col.isReady);
		console.log("# 	isOrgsReady: " + col.isOrgsReady);
		console.log("# 	isViewReady: " + col.isViewReady);
		console.log("#    lifetime: " + col.lifetime);
		console.log("# ---------------------------");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
		console.log("");
	}


	this.toString = function(){
		return "The Colony | Age: " + this.age; 
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


