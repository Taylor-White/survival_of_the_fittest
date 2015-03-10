/*****************
Displays stats for the simulation
File owner: Taylor White
*****************/

function statsView(){
	console.log("creating Organism Stats View");
	
	this.updateBirths = function(born, orgID){
		$("#org-stats #" + orgID + " .born").html(born);
	};
	this.updateDeaths = function(died, orgID){
		$("#org-stats #" + orgID + " .dead").html(died);
	};
	this.updateExplored = function(explored, orgID){
		$("#org-stats #" + orgID + " .explored").html(explored);
	};
	this.updateGenCount = function(gens){
		$("#gens").html("Generation: " + gens);
	};
	this.updateAge = function(age){
		$("#age").html("Age: " + age);
	};


	this.updateAvgBirths = function(avgBirths){
		$("#colony-stats #born .avg").html(avgBirths);
	};
	this.updateAvgDeaths = function(avgDeaths){
		$("#colony-stats #dead .avg").html(avgDeaths);
	};
	this.updateTotalBirths = function(totalBirths){
		$("#colony-stats #born .total").html(totalBirths);
	};
	this.updateTotalDeaths = function(totalDeaths){
		$("#colony-stats #dead .total").html(totalDeaths);
	};


	this.updateAvgBirths = function(avgBirths){
		$("#colony-stats #born .avg").html(avgBirths);
	};
	this.updateAvgDeaths = function(avgDeaths){
		$("#colony-stats #dead .avg").html(avgDeaths);
	};
	this.updateTotalBirths = function(totalBirths){
		$("#colony-stats #born .total").html(totalBirths);
	};
	this.updateTotalDeaths = function(totalDeaths){
		$("#colony-stats #dead .total").html(totalDeaths);
	};
	this.updateMostBirths = function(mostBirths){
		$("#extremes #most-births .value").html(mostBirths);
	};
	this.updateFewestDeaths = function(fewestDeaths){
		$("#extremes #fewest-deaths .value").html(fewestDeaths);
	};
	this.updateMostBirthsOrgID = function(mostBirthsOrgID){
		$("#extremes #most-births .org").html(mostBirthsOrgID);
	};
	this.updateFewestDeathsOrgID = function(fewestDeathsOrgID){
		$("#extremes #fewest-deaths .org").html(fewestDeathsOrgID);
	};


	this.toString = function(){
		return "The Stats View";
	};
	
}
