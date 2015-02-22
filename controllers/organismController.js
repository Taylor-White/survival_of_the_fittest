/*
Organism: Organism
View: OrganismView 
File owner: Jared
*/

/* Constructor */
function organismController(){
	console.log("creating Organism Controller");
	this.orgView = new organismView();

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		console.log("orgCtrl received " + msg);
		if(msg == "StateChanged"){
			this.stateChanged();
		} else if (msg.substring(0,11) == "OrgSelected"){
			var orgID = parseInt(msg.substring(11, msg.length));	
			this.setSelectedOrg(colony.getOrg(orgID));
		}
	}

	/* function for when user chooses random */
	this.userRandState = function(){
		this.org.randomize();
	}

	/* function for when the user clicks on the canvas, records the coordinates */
	this.userToggleCell = function(x, y){
		this.org.toggleCell(x,y);
	}

	/* function for when the user wants to clear the canvas */
	this.userClearState = function(){
		this.org.clearState();
	}

	/* function for when the user wants to change the organism they are using */
	this.setSelectedOrg = function(org){
		console.log("SETSELSANTOEHUSRARCOEUB");
		if (this.org){
			this.org.removeObserver(this);
		}
		this.org = org;
		this.org.addObserver(this);
		this.orgView.update(this.org.getMatrix());
	}

	/* function for when the organism changes from alive or dead */
	this.stateChanged = function(){
		this.orgView.update(this.org.getMatrix());
	}



}
