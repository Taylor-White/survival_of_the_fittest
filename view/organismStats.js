/*****************
Displays stats for the simulation
File owner: Taylor White
*****************/

function organismStats(){
	console.log("creating Organism Stats View");
	
	this.updateBorn = function(born){
		$("#born").html("BORN: " + born);
	}
	this.updateDied = function(died){
		$("#died").html("DIED: " + died);
	}
	this.updateExplored = function(explored){
		$("#explored").html("Explored: " + explored);
	}	
	
};	