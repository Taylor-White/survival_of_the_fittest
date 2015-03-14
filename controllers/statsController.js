/*****************
Sends information to the Simulation/Stats file
*****************/

function statsController(){
	console.log("Creating Stats Controller");

	/* DECLARATIONS */
	this.statsView = new statsView();

	/*	OBSERVABLE METHODS */
	this.observers = [];
	this.addObserver = function(observer){
		this.observers.push(observer);	};
	this.removeObserver = function(observer){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}};
	this.notifyObservers = function(msg){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}};

	/* INTERFACE */
	this.setStats = function(stats){
		this.stats = stats;
	};

	this.clearStats = function(){
		this.stats.clearStats();
	};

	this.updateOrgStatsView = function(){
		for (var i = 0; i < this.stats.numOrgs; i++) {
			var os = this.stats.getOrgStats(i+1);
			var sv = this.statsView;
			sv.updateBirths(this.stats.getOrgStats(i+1).getBirths(), i+1);
			sv.updateDeaths(os.getDeaths(), i+1);
			sv.updateExplored(os.getExplored(), i+1);
			sv.updateGenCount(this.stats.getColStats().getGens());
			sv.updateAge(this.stats.getColStats().getAge());
		}
	};

	this.updateColStatsView = function(){
		var sv = this.statsView;
		var s = this.stats;
		
		this.stats.colStats.calcStats();
		sv.updateAvgBirths(this.stats.colStats.getAvgBirths());
		sv.updateAvgDeaths(this.stats.colStats.getAvgDeaths());
		sv.updateMostBirths(this.stats.colStats.getMostBirths());
		sv.updateFewestDeaths(this.stats.colStats.getFewestDeaths());
		sv.updateMostBirthsOrgID(this.stats.colStats.getMostBirthsOrgID());
		sv.updateFewestDeathsOrgID(this.stats.colStats.getFewestDeathsOrgID());
	};

	this.updateViews = function(){
		this.updateColStatsView();
		this.updateOrgStatsView();
	};

	this.toString = function(){
		return "The Stats Controller";
	};
}