/*****************
Sends information to the Simulation/Stats file
*****************/

function statsController(){
	console.log("Creating Stats Controller");

	/*	OBSERVABLE METHODS */
	this.observers = [];

	this.addObserver = function(observer){
		this.observers.push(observer);	}
	this.removeObserver = function(observer){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}}
	this.notifyObservers = function(msg){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}}

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		console.log("orgCtrl received " + msg);
		if(msg == "EXAMPLE1"){
			// this.example1();
		} else if (msg == "EXAMPLE2"){
			// this.example2();
		}
	}

	/* DECLARATIONS */
	this.stats;
	this.statsView = new statsView();

	/* INTERFACE */

	/*  */
	this.updateColStatsView = function(){

	}

	this.updateOrgStatsView = function(){
		console.log(" --- Updating Org Stats View --- ");
		console.log(" catch | " + this.stats);
		for (var i = 0; i < this.stats.numOrgs; i++) {
			console.log("     " + i + " | ");
			var os = this.stats.getOrgStats(i+1);
			var sv = this.statsView;
			sv.updateBirths(this.stats.getOrgStats(i+1).getBirths(), i+1);
			sv.updateDeaths(os.getDeaths(), i+1);
			sv.updateExplored(os.getExplored(), i+1);
			// sv.updateAccel(os.getAccel());
			// sv.updateSteady(os.getSteady());
		};
	}

	this.setStats = function(stats){
		this.stats = stats;
	}

}