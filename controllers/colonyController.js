/*
Colony: Colony
View: ColonyView 
File owner: Kat
*/

function colonyController(orgCtr, statsCtr, settCtr){
	// console.log("creating Colony Controller");

	var INIT_NUM_ORGS = 10;

	this.winIntervalID = 0;

	this.orgCtr = orgCtr;
	this.statsCtr = statsCtr;
	this.settCtr = settCtr;
	this.colView = new colonyView();
	this.colony = new colony(INIT_NUM_ORGS);

	this.saved = new saved(INIT_NUM_ORGS);

	this.selectedOrgID = 0;
	
	this.ieView = new importExportView();
	this.saveloadView = new saveloadView();

	this.settView = new settingsView();
	this.settView.addObserver(this);
	this.settings = this.colony.getSettings();

	this.run = false;
	this.shouldContinue = false;

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
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
		} else if (msg == "UserResetGen"){
			this.userResetGen();
		} else if (msg == "UserResetUniverse"){
			this.userResetUniverse();
		} else if (msg == "UserSave"){
			this.userSave();
		} else if (msg.substring(0,10) == "UserExport"){
			var exportIndex = parseInt(msg.substring(8, msg.length));
			this.userExport(exportIndex);
		} else if (msg == "UserImported"){

			this.userImported(observable.getImported());
		} else if (msg.substring(0,8) == "UserLoad"){
			var loadIndex = parseInt(msg.substring(8, msg.length));
			this.userLoad(loadIndex);
		} else if (msg.substring(0,9) == "UserSpeed"){
			// must pause and restart in order update speed
			var rs = this.run;
			this.setRun(false);
			this.setRun(rs);
		} else if (msg.substring(0,15) == "UserSelectSaved"){
			var selectSavedIndex = parseInt(msg.substring(15, msg.length));
			this.userSelectSaved(selectSavedIndex);

		} else if (msg.substring(0,11) == "OrgReplaced"){
			var orgID = parseInt(msg.substring(11, msg.length));
			if (this.orgCtr.getSelectedOrg().getOrgID() == orgID){
				this.orgCtr.setSelectedOrg(this.colony.getOrg(orgID));
			}

		} else if (msg.substring(0,11) == "OrgSelected"){
			var orgID = parseInt(msg.substring(11, msg.length));
			this.orgCtr.setSelectedOrg(this.colony.getOrg(orgID));
		} else if (msg == "GenDone"){
			this.genDone(observable.gens);
		} 
	};

	/* USER ACTIONS */
	/* function for when user chooses an organism */
	this.userSelectOrg = function(orgID){
		this.colView.deselectOrg(this.selectedOrgID);
		this.selectedOrgID = orgID;
		this.colView.selectOrg(orgID);
		this.orgCtr.setSelectedOrg(this.colony.getOrg(orgID));
	};

	/* function for when the user chooses to step the simulation */
	this.userStep = function(){
		this.setRun(false);
		if (this.colony.isGenDone()){
			this.advanceGen();
		} else {
			this.tick(this);
		}
	};

	/* function for when the user wants to run the whole simulation out */
	this.userRun = function(){
		if (this.colony.isGenDone()){
			this.advanceGen();
		}
		this.shouldContinue = true;
		this.setRun(true);
	};

	/* function for when the user wants to stop the simulation from stepping 
		when the generation is done */
	this.userRunOneGen = function(){
		if (this.colony.isGenDone()){
			this.advanceGen();
		} 
		this.shouldContinue = false;
		this.setRun(true);
	};

	/* function for when the user wants to pause the simulation */
	this.userPause = function(){
		this.setRun(false);
	};

	/* function for when the user wants to randomize all orgs */
	this.userRand = function(){
		/* user settings should already be updated */
		this.colony.randSame();
		this.statsCtr.updateViews();
	};

	/* function for when the user wants to pause the simulation */
	this.userResetGen = function(){
		this.setRun(false);
		this.colony.resetGen();
		this.statsCtr.updateViews();
	};
	this.userResetUniverse = function(){
		this.setRun(false);
		this.colony.resetUniverse();
		this.statsCtr.updateViews();
	};

	this.userSave = function(){
		this.saved.addSeed(this.orgCtr.getSelectedOrg().getSeed());
		this.saveloadView.updateSavedList(this.saved.numSeeds());
	};
	this.userLoad = function(index){
		this.setRun(false);
		this.colony.loadSeed(this.saved.getSeed(index));
		this.statsCtr.updateViews();
	};
	this.userExport = function(index){
		//Send seed to importExportView
		this.ieView.exportFile();
	};
	this.userImported = function(importedMat){
		//Send seed to importExportView
		this.saved.addSeed(fillToSize(importedMat));
		this.saveloadView.updateSavedList(this.saved.numSeeds());
	};
	this.userSelectSaved = function(index){
		var selectedSeedMatrix = this.saved.getSeed(index);
		this.saveloadView.updateSelectedSavedMatrix(
			this.saved.getSeed(index)
		);
		this.ieView.prepExport(this.saved.getSeed(index));
		this.saveloadView.selectedSavedSeed(this.saved.numSeeds(), index);
	};

	this.setRun = function(newRun){
		if (this.run === false){
		/* STARTING */
			if (newRun === true){
				if (this.colony.isGenDone()){
					this.genDone();
				}
				// Set a regular interval based on the speed setting 
				// 	that calls the tick function. 
				// Store returned reference in winIntervalID so we can 
				// 	remove the interval to stop the simulation.
				
				this.winIntervalID = window.setInterval(
					function(that){
						return function(){that.tick(that);};
					}(this), 1000/this.settings.getSpeed());
			}
		} else {			// if running
		/* STOPPING */
			if (newRun === false){
				window.clearInterval(this.winIntervalID);
			}
		}
		this.run = newRun;

	};

	this.genDone = function(gens){
		this.setRun(false);
		if (this.shouldContinue){
			this.advanceGen();
			this.setRun(true);
		}
	};

	this.advanceGen = function(){
		this.colony.advanceGen();
		this.statsCtr.updateViews();
		this.orgCtr.updateOrgView();
	};

	this.tick = function(cc){
		console.log(" -- TICK -- ");
		cc.colony.step();
		cc.orgCtr.updateOrgView();
		cc.statsCtr.updateViews();
	};

	this.initialize = function(){
		/* Register this as Observer */
		this.saveloadView.addObserver(this);
		this.colView.addObserver(this);
		this.orgCtr.addObserver(this);
		this.colony.addObserver(this);
		this.ieView.addObserver(this);

		/* Give colony a reference to the stats and settings models */
		/* Ideally these would use the singleton pattern */
		this.statsCtr.setStats(this.colony.stats);
		this.settCtr.setSettings(this.colony.settings);

		/* Select org 1 */
		this.orgCtr.setSelectedOrg(this.colony.getOrg(1));
		this.colView.selectOrg(1);

		/* Initialize the Colony */
		this.colony.randSame();	
		
		/* Update Views */
		this.statsCtr.updateViews();	
		this.orgCtr.updateOrgView();
	};

	this.initialize();
}