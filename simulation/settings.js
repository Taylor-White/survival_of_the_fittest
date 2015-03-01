/*****************
Stores information about the variables for the simulation
*****************/
function settings(){
	this.birthArray = [0, 0, 0, 1, 0, 0, 0, 0, 0];
	this.sustainArray = [0, 0, 1, 1, 0, 0, 0, 0, 0];
	this.speed = 25;

	/* Setters */
	this.setBirthArray = function(barray){
		this.birthArray = barray;
	}
	this.setSustainArray = function(sarray){
		this.sustainArray = sarray;
	}
	this.setBirthArrayVal = function(neighbs, val){
		this.birthArray[neighbs] = val;
	}
	this.setSustainArrayVal = function(neighbs, val){
		this.sustainArray[neighbs] = val;
	}
	this.setSpeed = function(speed){
		console.log("Setting speed to " + speed);
		this.speed = speed;
	}

	/* Toggles */
	this.toggleBirthArrayVal = function(neighbs){
		this.birthArray[neighbs] = this.birthArray[neighbs] == 1? 0:1;
		// alert("User toggled Birth " + neighbs);
	}
	this.toggleSustainArrayVal = function(neighbs){
		this.sustainArray[neighbs] = this.sustainArray[neighbs] == 1? 0:1;
		// alert("User toggled Sustain " + neighbs);
	}

	/* Getters */
	this.getBirthArray = function(){
		return this.birthArray;
	}
	this.getSustainArray = function(){
		return this.sustainArray;
	}
	this.getBirthArrayVal = function(neighbs){
		return this.birthArray[neighbs] == 1;
	}
	this.getSustainArrayVal = function(neighbs){
		return this.sustainArray[neighbs] == 1;
	}
	this.getSpeed = function(){
		return this.speed;
	}


}