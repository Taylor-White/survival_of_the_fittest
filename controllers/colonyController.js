/*
Colony: Colony
View: ColonyView 
File owner: Kat
*/
function colonyController(orgCtr){
	console.log("creating Colony Controller");

	this.orgCtr = orgCtr;
	this.colView = new colonyView();
	this.colony = new colony(10);
	this.selectedOrgID = 0;

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
			this.colony.viewReady();
		} else if (msg == "RunFlagChange"){
			this.runFlagChange();
		}


	}



	/* USER ACTIONS */
	/* function for when user chooses an organism */
	this.userSelectOrg = function(orgID){
		/*orgID = get orgModel*/
		/*organismController.changeOrg(orgID);
			^^ NEED TO ADD THIS WITH OBSERVER
		*/

		this.colView.deselectOrg(this.selectedOrgID);
		this.selectedOrgID = orgID;
		this.colView.selectOrg(orgID);
		this.orgCtr.setSelectedOrg(this.colony.getOrg(orgID));
	}

	/* function for when the user chooses to step the simulation */
	this.userStep = function(){
		if (err = this.colony.step(this.colony)){
			alert(this.colony.errToString(err));
		}

	}

	/* function for when the user wants to run the whole simulation out */
	this.userRun = function(){
		this.colony.run();
	}

	/* function for when the user wants to stop the simulation from stepping */
	this.userRunOneGen = function(){
		if (err = this.colony.runOneGen(this.colony)){
			alert(this.colony.errToString(err));
		}
	}

	/* function for when the user wants to pause the simulation */
	this.userPause = function(){
		this.colony.pause();
	}

	this.userRand = function(){
		this.colony.rand(5);
	}

	/* function for when the user wants to pause the simulation */
	this.userResetCol = function(){
		this.colony.resetCol();
	}

	this.runFlagChange = function(){

	}

	this.colView.addObserver(this);
	this.orgCtr.addObserver(this);
	this.colony.addObserver(this);
	this.colView.selectOrg(1);
	this.orgCtr.setSelectedOrg(this.colony.getOrg(1));
	this.colony.rand(3);
}
