/*****************
Stores information about the variables for the simulation
*****************/
function settings(){
	this.birthArray = [0, 0, 0, 1, 0, 0, 0, 0, 0];
	this.sustainArray = [0, 0, 1, 1, 0, 0, 0, 0, 0];
	this.speed = 25;
	this.lifetime = 50;
	
	this.spawnWidth = 5;
	this.spawnHeight = 5;
	this.spawnDensity = 35;
	this.spawnCenterX = 25;
	this.spawnCenterY = 25;

	this.fitScalerB = 1;
	this.fitScalerD = -.5;
	this.fitScalerE = 4;		
	this.fitScalerS = 0;
	
	
	/* Setters */
	this.setBirthArray = function(barray){
		this.birthArray = barray;
	};
	this.setSustainArray = function(sarray){
		this.sustainArray = sarray;
	};
	this.setBirthArrayVal = function(neighbs, val){
		this.birthArray[neighbs] = val;
	};
	this.setSustainArrayVal = function(neighbs, val){
		this.sustainArray[neighbs] = val;
	};
	this.setSpeed = function(speed){
		console.log("Setting speed to " + speed);
		this.speed = speed;
	};
	this.setLifetime = function(lifetime){
		console.log("Setting lifetime to " + lifetime);
		this.lifetime = lifetime;
	};
	this.setSpawnWidth = function(w){
		this.spawnWidth = w;
	};
	this.setSpawnHeight = function(h){
		this.spawnHeight = h;
	};
	this.setSpawnDensity = function(d){
		this.spawnDensity = d;
	};
	this.setSpawnCenterX = function(cx){
		this.spawnCenterX = cx;
	};
	this.setSpawnCenterY = function(cy){
		this.spawnCenterY = cy;
	};

	this.setFitScalerB = function(fb){
		this.fitScalerB = fb;
	};	
	this.setFitScalerD = function(fd){
		this.fitScalerD = fd;
	};	
	this.setFitScalerE = function(fe){
		this.fitScalerE = fe;
	};			
	this.setFitScalerS = function(fs){
		this.fitScalerS = fs;
	};	

	this.setMutRate = function(mut){
		this.mutRate = mut;
	};

	/* Toggles */
	this.toggleBirthArrayVal = function(neighbs){
		this.birthArray[neighbs] = this.birthArray[neighbs] == 1? 0:1;
		// alert("User toggled Birth " + neighbs);
	};
	this.toggleSustainArrayVal = function(neighbs){
		this.sustainArray[neighbs] = this.sustainArray[neighbs] == 1? 0:1;
		// alert("User toggled Sustain " + neighbs);
	};

	/* Getters */
	this.getBirthArray = function(){
		return this.birthArray;
	};
	this.getSustainArray = function(){
		return this.sustainArray;
	};
	this.getBirthArrayVal = function(neighbs){
		return this.birthArray[neighbs] == 1;
	};
	this.getSustainArrayVal = function(neighbs){
		return this.sustainArray[neighbs] == 1;
	};
	this.getSpeed = function(){
		return this.speed;
	};
	this.getLifetime = function(){
		return this.lifetime;
	};
	this.getSpawnWidth = function(){
		return this.spawnWidth;
	};
	this.getSpawnHeight = function(){
		return this.spawnHeight;
	};
	this.getSpawnDensity = function(){
		return this.spawnDensity;
	};
	this.getSpawnCenterX = function(){
		return this.spawnCenterX;
	};
	this.getSpawnCenterY = function(){
		return this.spawnCenterY;
	};
	this.getFitScalerB = function(){
		return this.fitScalerB;
	};	
	this.getFitScalerD = function(){
		return this.fitScalerD;
	};	
	this.getFitScalerE = function(){
		return this.fitScalerE;
	};		
	this.getFitScalerS = function(){
		return this.fitScalerS;
	};	
}