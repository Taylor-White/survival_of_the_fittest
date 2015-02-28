/*
Colony: Colony
View: ColonyView 
File owner: Kat
*/

var PAUSED = 0;
var RUN_CONT = 1;
var RUN_ONE_GEN = 2;

var MID = 0;
var END = 1;

function colonyController(orgCtr, statsCtr){
	console.log("creating Colony Controller");

	this.winIntervalID = 0;

	this.orgCtr = orgCtr;
	this.statsCtr = statsCtr;
	this.colView = new colonyView();
	this.colony = new colony(10);
	this.selectedOrgID = 0;


	this.runState = PAUSED;
	this.genState = MID;

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		console.log("colonyController received "+ msg + " from " + observable);
		if (msg == "UserRand"){
			this.userRand();
		} else if (msg == "UserStep"){
			this.userStep();
		} else if (msg == "UserRun"){
			this.userRun();
		} else if (msg == "UserPause"){
			this.userPause();
		} else if (msg == "UserRunOneGen"){
			this.userRunOneGen();
		} else if (msg == "UserResetCol"){
			this.userResetCol();
		} else if (msg.substring(0,11) == "OrgSelected"){
			var orgID = parseInt(msg.substring(11, msg.length));
			this.orgCtr.setSelectedOrg(this.colony.getOrg(orgID));
		} else if (msg == "ViewReady"){
			this.colony.setViewReady(true);
		} else if (msg == "RunFlagChanged"){
			this.runFlagChanged();
		} else if (msg == "GenDone"){
			this.genDone(observable.gens);
		}
	}



	/* USER ACTIONS */
	/* function for when user chooses an organism */
	this.userSelectOrg = function(orgID){
		this.colView.deselectOrg(this.selectedOrgID);
		this.selectedOrgID = orgID;
		this.colView.selectOrg(orgID);
		this.orgCtr.setSelectedOrg(this.colony.getOrg(orgID));
	}

	/* function for when the user chooses to step the simulation */
	this.userStep = function(){
		this.setRunState(PAUSED);
		if (this.genState == END){
			this.colony.evolve();
			this.genState = MID;
		} else {
			this.tick(this);
		}
	}

	/* function for when the user wants to run the whole simulation out */
	this.userRun = function(){
		this.setRunState(RUN_CONT);
	}

	/* function for when the user wants to stop the simulation from stepping */
	this.userRunOneGen = function(){
		this.setRunState(RUN_ONE_GEN);
	}

	/* function for when the user wants to pause the simulation */
	this.userPause = function(){
		this.setRunState(PAUSED);
		// this.colony.pause();
	}

	this.userRand = function(){
		/* user settings should already be updated */
		this.colony.randSame();
	}

	/* function for when the user wants to pause the simulation */
	this.userResetCol = function(){
		this.setRunState(PAUSED);
		this.colony.resetColony();
		this.statsCtr.updateColStatsView();
		this.statsCtr.updateOrgStatsView();
	}


	this.setRunState = function(newRunState){
		console.log("Setting Run State: " + newRunState);
		if (this.runState == PAUSED){
		/* STARTING */
			if (newRunState == RUN_CONT || newRunState == RUN_ONE_GEN){
				if (this.genState == END){
					this.colony.evolve();
					this.genState = MID;
				}
				this.winIntervalID = window.setInterval(
					function(that){
						return function(){that.tick(that);}
					}(this), 100);
			}
		} else if (this.runState == RUN_CONT || this.runState == RUN_ONE_GEN){
		/* STOPPING */
			if (newRunState == PAUSED){
				window.clearInterval(this.winIntervalID);
			}
		}
		this.runState = newRunState;
	}

	this.runFlagChanged = function(){
		this.orgCtr.runFlagChanged(this.colony.running);

	}
	this.genDone = function(gens){
		this.genState = END;
		this.colView.updateGenCount(gens);
		var oldRunState = this.runState;
		this.setRunState(PAUSED);
		if (oldRunState == RUN_ONE_GEN){
			// this.colony.evolve();
		} else if (oldRunState = RUN_CONT){
			this.colony.evolve();
			this.setRunState(RUN_CONT);
		} 
	}

	this.tick = function(cc){
		console.log(" -- TICK -- ");
		cc.colony.step();
		cc.statsCtr.updateOrgStatsView();
		cc.statsCtr.updateColStatsView();
		cc.orgCtr.updateOrgView();
	}

	this.initialize = function(){
		this.colView.addObserver(this);
		this.orgCtr.addObserver(this);
		this.colony.addObserver(this);
		this.colView.selectOrg(1);
		this.colView.updateGenCount(this.colony.gens);
		this.orgCtr.setSelectedOrg(this.colony.getOrg(1));
		this.colony.randSame();
		this.statsCtr.setStats(this.colony.stats);
		this.statsCtr.updateOrgStatsView();
		this.statsCtr.updateColStatsView();
		this.orgCtr.updateOrgView();
	}

	this.initialize();
}