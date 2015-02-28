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
	this.statsView = new statsView();

	/* INTERFACE */

	this.setStats = function(stats){
		this.stats = stats;
	}

	this.clearStats = function(){
		this.stats.clearStats();
	}

	this.updateOrgStatsView = function(){
		console.log(" --- Updating Org Stats View --- ");
		console.log(" catch | " + this.stats.toString());
		for (var i = 0; i < this.stats.numOrgs; i++) {
			console.log("     " + i + " | " + this.stats);
			var os = this.stats.getOrgStats(i+1);
			var sv = this.statsView;
			sv.updateBirths(this.stats.getOrgStats(i+1).getBirths(), i+1);
			sv.updateDeaths(os.getDeaths(), i+1);
			sv.updateExplored(os.getExplored(), i+1);
			// sv.updateAccel(os.getAccel());
			// sv.updateSteady(os.getSteady());
		}
	}

	/*  */
	this.updateColStatsView = function(){
		var sv = this.statsView;
		var s = this.stats;
		
		this.stats.colStats.calcStats();
		sv.updateAvgBirths(this.stats.colStats.getAvgBirths());
		sv.updateAvgDeaths(this.stats.colStats.getAvgDeaths());
		sv.updateTotalBirths(this.stats.colStats.getTotalBirths());
		sv.updateTotalDeaths(this.stats.colStats.getTotalDeaths());
		sv.updateMostBirths(this.stats.colStats.getMostBirths());
		sv.updateFewestDeaths(this.stats.colStats.getFewestDeaths());
		sv.updateMostBirthsOrgID(this.stats.colStats.getMostBirthsOrgID());
		sv.updateFewestDeathsOrgID(this.stats.colStats.getFewestDeathsOrgID());
	}

	this.toString = function(){
		return "The Stats Controller";
	}
}