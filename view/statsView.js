/*****************
Displays stats for the simulation
File owner: Taylor White
*****************/

function statsView(){
	console.log("creating Organism Stats View");
	
	this.updateBirths = function(born, orgID){
		console.log("Stats View updating born: " + born);
		$("#org-stats #" + orgID + " .born").html(born);
	}
	this.updateDeaths = function(died, orgID){
		console.log("Stats View updating died: " + died);
		$("#org-stats #" + orgID + " .dead").html(died);
	}
	this.updateExplored = function(explored, orgID){
		console.log("Stats View updating explored: " + explored);
		$("#org-stats #" + orgID + " .explored").html(explored);
	}
	this.updateGenCount = function(gens){
		$("#gens").html("Generation: " + gens);
	}


	this.updateAvgBirths = function(avgBirths){
		console.log("Stats View updating avg births: " + avgBirths);
		$("#colony-stats #born .avg").html(avgBirths);
	}
	this.updateAvgDeaths = function(avgDeaths){
		console.log("Stats View updating avg deaths: " + avgDeaths);
		$("#colony-stats #dead .avg").html(avgDeaths);
	}
	this.updateTotalBirths = function(totalBirths){
		console.log("Stats View updating total births: " + totalBirths);
		$("#colony-stats #born .total").html(totalBirths);
	}
	this.updateTotalDeaths = function(totalDeaths){
		console.log("Stats View updating total deaths: " + totalDeaths);
		$("#colony-stats #dead .total").html(totalDeaths);
	}


	this.updateAvgBirths = function(avgBirths){
		console.log("Stats View updating avg births: " + avgBirths);
		$("#colony-stats #born .avg").html(avgBirths);
	}
	this.updateAvgDeaths = function(avgDeaths){
		console.log("Stats View updating avg deaths: " + avgDeaths);
		$("#colony-stats #dead .avg").html(avgDeaths);
	}
	this.updateTotalBirths = function(totalBirths){
		console.log("Stats View updating total births: " + totalBirths);
		$("#colony-stats #born .total").html(totalBirths);
	}
	this.updateTotalDeaths = function(totalDeaths){
		console.log("Stats View updating total deaths: " + totalDeaths);
		$("#colony-stats #dead .total").html(totalDeaths);
	}
	this.updateMostBirths = function(mostBirths){
		console.log("Stats View updating total births: " + mostBirths);
		$("#extremes #most-births .value").html(mostBirths);
	}
	this.updateFewestDeaths = function(fewestDeaths){
		console.log("Stats View updating total deaths: " + fewestDeaths);
		$("#extremes #fewest-deaths .value").html(fewestDeaths);
	}
	this.updateMostBirthsOrgID = function(mostBirthsOrgID){
		console.log("Stats View updating total births: " + mostBirthsOrgID);
		$("#extremes #most-births .org").html(mostBirthsOrgID);
	}
	this.updateFewestDeathsOrgID = function(fewestDeathsOrgID){
		console.log("Stats View updating total deaths: " + fewestDeathsOrgID);
		$("#extremes #fewest-deaths .org").html(fewestDeathsOrgID);
	}


	this.toString = function(){
		return "The Stats View";
	}
	
};