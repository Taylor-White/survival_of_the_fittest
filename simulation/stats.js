/*
Stats
Owner: Adam
Description: This is the model
	that holds all statistical
	data for colony and organism
*/

function stats(numOrgs){
	// console.log("Creating Stats Model");

	this.numOrgs = numOrgs;
	this.orgStatsArray = [];

	this.updateOrgStats = function(orgID, born, dead, explored){
		// console.log("Updating Org Stats: " + orgID + ", " + born + ", " + dead + ", " + explored);
		var os = this.orgStatsArray[orgID-1];
		os.addToBirths(born);
		os.addToDeaths(dead);
		os.addToExplored(explored);
	};

	this.updateColStats = function(){
		/* extrapolate from orgStats */
		this.colStats.calcStats();
	};

	this.getColStats = function(){
		return this.colStats;
	};
	this.getOrgStats = function(orgID){
		return this.orgStatsArray[orgID - 1];
	};

	this.getOrgStatsArray = function(){
		return this.orgStatsArray;
	};
	this.clearStats = function(){
		this.colStats.clearStats();
		for (os of this.orgStatsArray){
			os.clearStats();
		}
		/* add clear for each org */
	};

	this.toString = function(){
		return "The Stats Model ";
	};

	/* Constructor */
	for (var i = 0; i < numOrgs; i++){
		this.orgStatsArray.push(new orgStats(i + 1));
	}
	this.colStats = new colStats(this.orgStatsArray);
}

/* Colony Stats Object */
function colStats(orgStatsArray){
	// console.log("Creating colStats");

	this.age = 0;
	this.gens = 0;

	this.orgStatsArray = orgStatsArray;
	this.totalBirths = 0;
	this.totalDeaths = 0;
	this.avgBirths = 0;
	this.avgDeaths = 0;
	this.mostBirths = 0;
	this.fewestDeaths = 0;

	this.calcStats = function(){
		var sumBirths = 0;
		var sumDeaths = 0;
		this.fewestDeaths = orgStatsArray[0].getDeaths();
		this.fewestDeathsOrgID = 1;
		this.mostBirths = orgStatsArray[0].getBirths();
		this.mostBirthsOrgID = 1;
		for (os of orgStatsArray){
			sumBirths += os.getBirths();
			sumDeaths += os.getDeaths();
			var births = os.getBirths();
			if (births > this.mostBirths){
				this.mostBirths = births;
				this.mostBirthsOrgID = os.getOrgID();
			}
			var deaths = os.getDeaths();
			if (deaths < this.fewestDeaths){
				this.fewestDeaths = deaths;
				this.fewestDeathsOrgID = os.getOrgID();
			}
		}

		this.totalBirths += sumBirths;
		this.totalDeaths += sumDeaths;
		this.setAvgBirths((sumBirths) / (orgStatsArray.length));
		this.setAvgDeaths((sumDeaths) / (orgStatsArray.length));
	};
	this.clearStats = function(){
		this.totalBirths = 0;
		this.totalDeaths = 0;
		this.avgBirths = 0;
		this.avgDeaths = 0;
		this.mostBirths = 0;
		this.fewestDeaths = 0;
	};

	/* Getters */
	this.getAge = function(){
		return this.age;
	};
	this.getGens = function(){
		return this.gens;
	};
	this.getAvgDeaths = function(){
		return this.avgDeaths;
	};
	this.getAvgBirths = function(){
		return this.avgBirths;
	};
	this.getTotalDeaths = function(){
		return this.totalDeaths;
	};
	this.getTotalBirths = function(){
		return this.totalBirths;
	};
	this.getMostBirthsOrgID = function(){
		return this.mostBirthsOrgID;
	};
	this.getFewestDeathsOrgID = function(){
		return this.fewestDeathsOrgID;
	};
	this.getMostBirths = function(){
		return this.mostBirths;
	};
	this.getFewestDeaths = function(){
		return this.fewestDeaths;
	};

	/* Setters */
	this.setAge = function(age){
		this.age = age;
	};
	this.setGens = function(gens){
		this.gens = gens;
	};
	this.setAvgDeaths = function(avgDeaths){
		this.avgDeaths = avgDeaths;
	};
	this.setAvgBirths = function(avgBirths){
		this.avgBirths = avgBirths;
	};
	this.setMostBirthsOrgID = function(mostBirthsOrgID){
		this.mostBirthsOrgID = mostBirthsOrgID;
	};
	this.setFewestDeathsOrgID = function(fewestDeathsOrgID){
		this.fewestDeathsOrgID = fewestDeathsOrgID;
	};
	this.setMostBirths = function(mostBirths){
		this.mostBirths = mostBirths;
	};
	this.setFewestDeaths = function(fewestDeaths){
		this.fewestDeaths = fewestDeaths;
	};
	this.setTotalDeaths = function(totalDeaths){
		this.totalDeaths = totalDeaths;
	};
	this.setTotalBirths = function(totalBirths){
		this.totalBirths = totalBirths;
	};

	/* Incrementers */
	this.incAge = function(){
		this.age++;
	};
	this.incGens = function(){
		this.gens++;
	};
}

/* Organism Stats Object*/
function orgStats(orgID){
	// console.log("Creating orgStats");
	this.orgID = orgID;
	this.births = 0;
	this.deaths = 0;
	this.explored = 0;
	this.toString = function(){
		return "OrgStats: " + this.orgID;
	};

	/* Setters */
	this.setOrgID = function(orgID){
		this.orgID = orgID;
	};
	this.setBirths = function(births){
		this.births = births;
	};
	this.setDeaths = function(deaths){
		this.deaths = deaths;
	};
	this.setExplored = function(explored){
		this.explored = explored;
	};

	/* Getters */
	this.getOrgID = function(){
		return this.orgID;
	};
	this.getBirths = function(){
		return this.births;
	};
	this.getDeaths = function(){
		return this.deaths;
	};
	this.getExplored = function(){
		return this.explored;
	};

	/* Adders */
	this.addToBirths = function(x){
		// console.log("Adding " + x + " to Births")
		this.births += x;
		// console.log("Total " + this.births + " Births")
	};
	this.addToDeaths = function(x){
		// console.log("Adding " + x + " to Deaths")
		this.deaths += x;
	};
	this.addToExplored = function(x){
		// console.log("Adding " + x + " to Explored")
		this.explored += x;
	};

	this.clearStats = function(){
		this.births = 0;
		this.deaths = 0;
		this.explored = 0;
	};

	this.toString = function(){
		return "The Org Stats Model";
	};

}
