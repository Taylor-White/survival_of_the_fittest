/*****************
Displays information about settings
*****************/


function settingsView(){
	console.log("creating Organism Stats View");
	
	this.updateBirths = function(born, orgID){
		console.log("Stats View updating born: " + born);
		$("#org-stats #" + orgID + " .born").html(born);
	}


	this.toString = function(){
		return "The Stats View";
	}
	
};