/*
Colony: Colony
View: ColonyView 
File owner: Kat
*/
function colonyController(){
	alert("Making Colony Controller");

	this.colony = new colony(10);

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		// If msg == "steppedAll" 
	}


	/* USER ACTIONS */
	/* function for when user chooses an organism */
	this.userSelectOrg = function(orgID){
		/*orgID = get orgModel*/
		/*organismController.changeOrg(orgID);
			^^ NEED TO ADD THIS WITH OBSERVER
		*/
	}

	/* function for when the user chooses to step the simulation */
	this.userStepAll = function(){
		colony.stepAll();
	}

	/* function for when the user wants to run the whole simulation out */
	this.userRunAll = function(){
		colony.runAll();
	}

	/* function for when the user wants to stop the simulation from stepping */
	this.UserStepEndAll = function(){
		colony.stepEndAll();
	}

	/* function for when the user wants to pause the simulation */
	this.userPause = function(){
		colony.pause();
	}
}

function eu(){
	alert("eu");
}

