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

	/* reset colony
		currently randomizes */
	this.resetCol = function(){
		console.log("Resetting Colony");
		this.pause();
		this.age = 0;	// reset age counter
		this.gens = 0;	// reset generation counter
		this.clearCheckinList();	// clear checkin list
		for (org of this.organism_list){
			org.age = 0;	// reset each org's age
		}
		this.rand(10);		// randomize each org
	}

	/* clearing the Organism Check-in List */
	this.clearCheckinList = function(){
		console.log("Clearing CheckIn List");
		for (var i = 0; i < this.checkin_list.length; i++){
			this.checkin_list[i] = false;	// set each in list to false
		}
		this.isOrgsReady = false;	// reset Orgs ready flag
	}

	/* Handler for when an org changes state
		*/

	this.orgStateChanged = function(orgID){
		/* check the Org in */
		this.checkin_list[orgID-1] = true;
		console.log("Org " + orgID + " checking in");
		console.log("CheckIn List " + this.checkin_list);

		/* See if all orgs have checked in */
		for (var i = 0; i < this.checkin_list.length; i++){
			if (this.checkin_list[i] == false){
				return;		// an Org still needs to check in
			}
		}
		/* All orgs are ready */
		console.log("ALL ORGS READY");
		this.orgsReady();
	}


	/* Run Control Stuff */
	/* STEPPING & RUNNING METHODS */

	/*	this.step takes an instance of a colony
	*		because later step() is passed to a
	*		different function and it needs to
	*		keep a reference to this colony
	*	Where is this.step called?
	*		this.runOneGen	-- From not running
	*		this.ready		-- From running
	*/
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
		col.age++;
		console.log("Colony just turned " + col.age);
		/* "Grim Reaper" -- check if the colony members should die */
		if (col.age >= col.lifetime){
			col.pause();
			col.genDone();	// generation done function
		}

	}

	/* 	method for when the simulation should continue 
		to run through multiple **generations of organisms
			** this is not to be confused with states. 
	*/
	this.run = function(){
		/* set the flag for whether the generation should
			automatically advance when it reaches the end of life. */
		this.shouldAdvanceGen = true;
		/* Grim Reaper */
		if (this.age == this.lifetime){	// if it's time to die...
			this.genDone();				// kill them
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

	/* handles the generation completing
		in other words when col.age == lifetime */
	this.genDone = function(){
		console.log("Gen Done");
		this.gens++;
		this.pause();
		this.clearCheckinList();
		this.notifyObservers("GenDone");
		if(this.shouldAdvanceGen){
			this.evolve();
		}
	}

	this.evolve = function(){
		this.resetCol();
		this.runOneGen();
	}

	/* method for the simulation to pause */
	this.pause = function(){
		console.log("Pausing");
		this.isColsReady = false;
		this.isViewReady = false;
		this.setRunning(false);
	}

	this.orgsReady = function(){
		this.isOrgsReady = true;	// set orgs ready flag
		if (this.isViewReady && this.running){ 	// If view and orgs are ready
			this.ready();						// trigger ready function
		}
	}

	this.viewReady = function(){
		this.isViewReady = true;	// set view ready flag
		if (this.isOrgsReady && this.running){	// If view and orgs are ready
			this.ready();						// trigger ready function
		}
	}

	this.setRunning = function(flag){
		console.log("Setting run to " + flag);
		this.running = flag;	// set run flag
		this.notifyObservers("RunFlagChange");	// notify Observers
	}

	/* this.ready
			called when both view and orgs are ready 
			
	*/
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


