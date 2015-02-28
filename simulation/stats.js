/*
Stats
Owner: Adam
Description: This is the model
	that holds all statistical
	data for colony and organism
*/

function stats(numOrgs){
	console.log("Creating Stats Model");

	this.numOrgs = numOrgs;
	this.orgStatsArray = [];

	this.updateOrgStats = function(orgID, born, dead, explored){
		console.log("Updating Org Stats: " + orgID + ", " + born + ", " + dead + ", " + explored);
		var os = this.orgStatsArray[orgID-1];
		os.addToBirths(born);
		os.addToDeaths(dead);
		os.addToExplored(explored);
	}

	this.updateColStats = function(){
		/* extrapolate from orgStats */

	}

	this.getOrgStats = function(orgID){
		return this.orgStatsArray[orgID - 1];
	}

	this.getOrgStatsArray = function(){
		return this.orgStatsArray;
	}

	/* Constructor */
	for (var i = 0; i < numOrgs; i++){
		this.orgStatsArray.push(new orgStats(i + 1));
	}
}

/* Colony Stats Object */
function colStats(orgStatsArray){
	console.log("Creating colStats");
	this.orgStatsArray = orgStatsArray;
	this.totalBirths = 0;
	this.totalDeaths = 0;
	this.avgBirths = 0;
	this.avgDeaths = 0;
	this.mostBirths = 0;
	this.mostBirthsOrgID;
	this.fewestDeaths = 0;
	this.fewestDeathsOrgID;

	this.calcStats = function(){
		var sumBirths = 0;
		var sumDeaths = 0;
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

		this.avgBirths(sumBirths/orgStatsArray.length);
		this.avgDeaths(sumDeaths/orgStatsArray.length);
	}
	this.getAvgDeaths = function(){
		return avgDeaths;
	}
	this.getAvgBirths = function(){
		return avgBirths;
	}
	this.getMostBirthsOrgID = function(){
		return mostBirthsOrgID;
	}
	this.getFewestDeathsOrgID = function(){
		return fewestDeathsOrgID;
	}

	this.setAvgDeaths = function(avgDeaths){
		this.avgDeaths = avgDeaths;
	}
	this.setAvgBirths = function(avgBirths){
		this.avgBirths = avgBirths;
	}
	this.setMostBirthsOrgID = function(mostBirthsOrgID){
		this.mostBirthsOrgID = mostBirthsOrgID;
	}
	this.setFewestDeathsOrgID = function(fewestDeathsOrgID){
		this.fewestDeathsOrgID = fewestDeathsOrgID;
	}


	this.calcMostBirths = function(){
		var mb = 0;
		for (var i = 0; i < this.orgStatsArray.length; i++) {

		}
		return mb;
	}
	this.calcFewestDeaths = function(){
		
	}
}

/* Organism Stats Object*/
function orgStats(orgID){
	console.log("Creating orgStats");
	this.orgID = orgID;
	this.births = 0;
	this.deaths = 0;
	this.explored = 0;
	this.accel = 0;
	this.steady = 0;

	this.toString = function(){
		return "OrgStats: " + this.orgID;
	}

	/* Setters */
	this.setOrgID = function(orgID){
		this.orgID = orgID;
	}
	this.setBirths = function(births){
		this.births = births;
	}
	this.setDeaths = function(deaths){
		this.deaths = deaths;
	}
	this.setExplored = function(explored){
		this.explored = explored;
	}
	this.setAccel = function(accel){
		this.accel = accel;
	}
	this.setSteady = function(steady){
		this.steady = steady;
	}

	/* Getters */
	this.getOrgID = function(){
		return this.orgID;
	}
	this.getBirths = function(){
		return this.births;
	}
	this.getDeaths = function(){
		return this.deaths;
	}
	this.getExplored = function(){
		return this.explored;
	}
	this.getAccel = function(){
		return this.accel;
	}
	this.getSteady = function(){
		return this.steady;
	}

	/* Adders */
	this.addToBirths = function(x){
		console.log("Adding " + x + " to Births")
		this.births += x;
		console.log("Total " + this.births + " Births")
	}
	this.addToDeaths = function(x){
		console.log("Adding " + x + " to Deaths")
		this.deaths += x;
	}
	this.addToExplored = function(x){
		console.log("Adding " + x + " to Explored")
		this.explored += x;
	}

}
