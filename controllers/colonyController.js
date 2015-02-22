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
		this.orgCtr.setSeledOrg(this.colony.getOrg(orgID));
	}

	/* function for when the user chooses to step the simulation */
	this.userStep = function(){
		this.colony.step();
	}

	/* function for when the user wants to run the whole simulation out */
	this.userRun = function(){
		this.colony.runAll();
	}

	/* function for when the user wants to stop the simulation from stepping */
	this.UserRunOneGen = function(){
		this.colony.stepEndAll();
	}

	/* function for when the user wants to pause the simulation */
	this.userPause = function(){
		this.colony.pause();
	}

	this.userRand = function(){
		this.colony.rand(3);
	}

	this.colView.addObserver(this);
	this.colView.selectOrg(1);
	this.orgCtr.setSelectedOrg(this.colony.getOrg(1));
	this.colony.rand(3);
}
