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

	this.toString = function(){
		return "The Stats View";
	}
	
};	