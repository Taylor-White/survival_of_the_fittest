/*
Organism: Organism
View: OrganismView 
File owner: Jared
*/

/* Constructor */
function organismController(org){
	console.log("creating Organism Controller");
	this.currentOrg = org;
	this.orgView = new organismView();

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		if(msg == "StateChanged"){

		}
	}

	/* function for when user chooses random */
	this.userRandState = function(){
		this.currentOrg.randomize();
	}

	/* function for when the user clicks on the canvas, records the coordinates */
	this.userToggleCell = function(x, y){
		this.currentOrg.toggleCell(x,y);
	}

	/* function for when the user wants to clear the canvas */
	this.userClearState = function(){
		this.currentOrg.clearState();
	}

	/* function for when the user wants to change the organism they are using */
	this.setSelectedOrg = function(org){
		this.currentOrg = org;
	}

	/* function for when the organism changes from alive or dead */
	this.stateChanged = function(){
		matrix = State.getMatrix();
		this.orgView.update(matrix);
	}

}
