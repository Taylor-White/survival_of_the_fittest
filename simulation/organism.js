/*
State: State
File owner:
*/

/* represents the organism "class" */
function organism(){
	alert("Making an org");

	this.age = 0;

	/* function for when the simulation should step the simulation */
	this.step = function(){
		this.age++;
	}

	/* function for the coordinates of the organism */
	this.toggleCell = function(x,y){

	}

	/* function to clear the organism */
	this.clearOrginism = function(){

	}
}