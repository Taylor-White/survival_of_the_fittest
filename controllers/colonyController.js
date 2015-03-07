/*
Colony: Colony
View: ColonyView 
File owner: Kat
*/

function colonyController(orgCtr, statsCtr, settCtr){
	console.log("creating Colony Controller");

	this.winIntervalID = 0;

	this.orgCtr = orgCtr;
	this.statsCtr = statsCtr;
	this.settCtr = settCtr;
	this.colView = new colonyView();
	this.colony = new colony(10);

	this.selectedOrgID = 0;
	
	this.importView = new importView();

	this.settView = new settingsView();
	this.settView.addObserver(this);
	this.settings = this.colony.getSettings();

	this.run = false;
	this.shouldContinue = false;

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
		} else if (msg == "GenDone"){
			this.genDone(observable.gens);
		} else if (msg.substring(0,9) == "UserSpeed"){
			// must pause and restart in order update speed
			var rs = this.run;
			this.setRun(false);
			this.setRun(rs);
		}else if (msg.substring(0,10) == "spawnWidth"){
			var sWidth = parseInt(msg.substring(10, msg.length));
			// console.log("spawnWidth: " + sWidth)
			this.settings.setSpawnWidth(sWidth);
		} else if (msg.substring(0,11) == "spawnHeight"){
			var sHeight = parseInt(msg.substring(11, msg.length));
			// console.log("spawnHeight: " + sHeight)
			this.settings.setSpawnHeight(sHeight);
		} else if (msg.substring(0,12) == "spawnDensity"){
			var sDensity = parseInt(msg.substring(12, msg.length));
			// console.log("spawnDensity: " + sDensity)
			this.settings.setSpawnDensity(sDensity);
		} else if (msg.substring(0,12) == "spawnCenterX"){
			var sCenterX = parseInt(msg.substring(12, msg.length));
			// console.log("spawnCenterX: " + sCenterX)
			this.settings.setSpawnCenterX(sCenterX);
		} else if (msg.substring(0,12) == "spawnCenterY"){
			var sCenterY = parseInt(msg.substring(12, msg.length));
			// console.log("spawnCenterY: " + sCenterY)
			this.settings.setSpawnCenterY(sCenterY);
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
		this.setRun(false);
		if (this.colony.isGenDone()){
			this.colony.evolve();
		} else {
			this.tick(this);
		}
	}

	/* function for when the user wants to run the whole simulation out */
	this.userRun = function(){
		this.setRun(true);
		this.shouldContinue = true;
	}

	/* function for when the user wants to stop the simulation from stepping 
		when the generation is done */
	this.userRunOneGen = function(){
		this.setRun(true);
		this.shouldContinue = false;
	}

	/* function for when the user wants to pause the simulation */
	this.userPause = function(){
		this.setRun(false);
	}

	/* function for when the user wants to randomize all orgs */
	this.userRand = function(){
		/* user settings should already be updated */
		this.colony.randSame();
		this.statsCtr.updateColStatsView();
		this.statsCtr.updateOrgStatsView();		
	}

	/* function for when the user wants to pause the simulation */
	this.userResetCol = function(){
		this.setRun(false);
		this.colony.resetColony();
		this.statsCtr.updateColStatsView();
		this.statsCtr.updateOrgStatsView();
	}


	this.setRun = function(newRun){
		console.log("Setting Run State: " + newRun);
		if (!this.run){		// if not running
		/* STARTING */
			if (newRun){
				if (this.colony.isGenDone()){
					this.colony.evolve();
				}
					
				/*
				Set a regular interval based on the speed setting 
					that calls the tick function. 
				Store returned reference in winIntervalID so we can 
					remove the interval to stop the simulation.
				*/
				this.winIntervalID = window.setInterval(
					function(that){
						return function(){that.tick(that);}
					}(this), 1000/this.settings.getSpeed());
			}
		} else {			// if running
		/* STOPPING */
			if (!newRun){
				window.clearInterval(this.winIntervalID);
			}
		}
		this.run = newRun;
	}

	this.genDone = function(gens){
		this.setRun(false);
		if (this.shouldContinue){
			this.colony.evolve();
			this.setRun(true);
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
		this.orgCtr.setSelectedOrg(this.colony.getOrg(1));
		this.statsCtr.setStats(this.colony.stats);
		this.colony.randSame();	
		this.statsCtr.updateOrgStatsView();
		this.statsCtr.updateColStatsView();		
		this.colView.selectOrg(1);
		this.settCtr.setSettings(this.colony.settings);
		// this.settCtr.updateSettingsView();
		this.orgCtr.updateOrgView();
	}

	this.initialize();
}