/*
Organisms: list of Organisms
File owner: Xi
*/

/* represents the colony class */
function colony(numOrgs){
	// console.log("creating Colony");

	/* Org stuff */
	this.numOrgs = numOrgs;
	this.organism_list = [];
	
	/* Stats */
	this.stats = new stats(numOrgs);

	/* Settings */
	this.settings = new settings();

	/*	OBSERVABLE METHODS */
	this.observers = [];
	this.addObserver = function(observer){
		this.observers.push(observer);	};
	this.removeObserver = function(observer){
		if (this.observers.length === 0){return;}
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}};
	this.notifyObservers = function(msg){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);}};

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		console.log("colony received "+ msg + " from " + observable);
	};

	/* Get an organism by it's orgID */
	this.getOrg = function(orgID){
		/* NOTE org id starts at 1 */
		return this.organism_list[orgID-1];
	};

	this.randSame = function(){
		// console.log("Entered randSame");
		var tempState = createMatrix(50,50,0);
		var exploredCounter = 0;
		
		var w = this.settings.getSpawnWidth();
		var h = this.settings.getSpawnHeight();
		var x = this.settings.getSpawnCenterX();
		var y = this.settings.getSpawnCenterY();
		var d = this.settings.getSpawnDensity();
		
		// Creates random state based on user settings
		//   Keeps track of num explored 
		y = y-Math.floor((h/2)+1);
		x = x-Math.floor((w/2)+1);		
		for (var row = y; row < y+h; row++) {
			for (var col = x; col < x+w; col++) {
				var i = Math.floor(Math.random() * (100/d));
				if(i === 0 && row>=0 && row<50 && col>=0 && col<50  ){
					tempState[row][col] = 1; 
					exploredCounter++;
				}	
			}
		}
		
		//Loops through each organism and applies the state to it
		for (var j = 0; j < this.organism_list.length; j++){
			var org = this.organism_list[j];

			var tempStateCopy = createMatrix(50,50,0);
			copyMatrix(tempStateCopy, tempState);

			var randY = getRandInt(y, y+h); 
			var randX = getRandInt(x, x+w);
			/* toggleCell returns number turned on (-1, 0, 1) */
			// this.stats.getOrgStats(j+1).setExplored(
			// 								exploredCounter + 
			// 								toggleCell(tempStateCopy, randY, randX) );
			/* TODO!!! HANDLE EXPLORED UPDATE IN ORG */
			org.toggleCell(randY, randX);
			org.setSeed(tempStateCopy);
			org.setState(tempStateCopy);

			org.notifyObservers("StateChanged");

		}
	};

	this.loadSeed = function(seed){
		/* TODO!!!!! */
		/* Need to make sure to count alives for explored count */

		/*
			We may only need to load one in
				Going to wait for GA
		*/


		// for (var i = 0; i <= this.numOrgs; i++){
		// 	var org = this.organism_list[i];
		// 	org.setState(seed);
		// 	org.setSeed(seed);
		// }
	};

	this.mutateAll = function(){
		for (var j = 0; j < this.organism_list.length; j++){
			/* TODO */
		}
	};

	/* reset each organism in the colony
		currently randomizes */
	this.resetColony = function(){
		// console.log("Resetting Colony");
		this.randSame();		// randomize each org
		// this.stats.getColStats().setGens(0);
		this.stats.getColStats().setAge(0); // reset colony's age
		this.stats.clearStats();
	};

	this.replay = function(){
		/* Should reset each org to its seed */
		/* TODO */
		
	};

	this.step = function(){
		/* step each org */
		for(var i = 0; i<this.organism_list.length; i++){
			this.organism_list[i].step();
		}

		/* increment age */
		this.stats.getColStats().incAge();
		/* "Grim Reaper" -- checks if the colony members should die */
		if (this.stats.getColStats().getAge() >= this.settings.getLifetime()){
			this.genDone();	// generation done function
		}
	};

	/* handles the generation completing */
	this.genDone = function(){
		this.notifyObservers("GenDone");
	};
	this.advanceGen = function(){
		this.stats.getColStats().incGens();
		this.resetColony();

	};

	this.isGenDone = function(){
		// console.log("isGenDone");
		return this.stats.getColStats().getAge() >= this.settings.getLifetime();
	};

	this.getFittest = function(){
		return matrix = [1, 3, 5, 7];
	};
	this.evolve = function(){

		var mate = function(parent1, parent2){

			var child = createMatrix(50, 50, 0);

			for(var i=0; i<50; i++){
				for(var j=0; j<50; j++){
					if(parent1[i][j] == parent2[i][j]){
						child[i][j] = parent1[i][j];
					} else{
						child[i][j] = Math.floor(Math.random() * 2);
					}									
				}
			}
			return child;
		};	

		var fittest = this.getFittest(); //Retrieve Fittest Organisms
		var newOrg = []; //Array of next generation organisms
		var counter = 0; //Keeps track of number of new organisms
		var orgList = this.organism_list; 

		//Mate each organism in fittest with each of the others. Put the child organisms in newOrg
		for(var i=0; i<fittest.length; ++i){
			for(var j=i+1; j<fittest.length; ++j){
				newOrg[counter] = mate(orgList[fittest[i]].getState(), orgList[fittest[j]].getState());
				counter++;
			}
		}

		//Set state of the first 6 organisms to the 6 new child organisms
		for(var i=0; i<counter; ++i){
			orgList[i+1].setState(newOrg[i]);
		}
		//Set state of the last 4 organisms to the 4 elite fittest organisms
		for(var i=counter; i<fittest.length+counter; ++i){
			orgList[i].setState(orgList[fittest[i-counter]].getState());
		}	

		this.stats.getColStats().setAge(0); // reset colony's age
		this.stats.clearStats();
		return;
	};

	this.toString = function(){
		return "The Colony | Age: " + this.stats.getColStats().getAge(); 
	};

	this.initOrgs = function(){
		/* fill list of orgs */
		for (var i=0; i<numOrgs; i++){
			var org = new organism(i+1,50,50);
			org.setStats(this.stats);			// Pass reference of the Stats object
			org.setSettings(this.settings);		// Pass reference of the Settings object
			this.organism_list.push( org );		// Add org to the org list
		}
	};

	this.init = function(){
		this.stats.getColStats().setAge(0);
		this.stats.getColStats().setGens(0);
		this.initOrgs();
	};


	this.changeBirthArray = function(orgID, neighbs, bool){
		this.organism_list[orgID-1].changeBirthArray(neighbs,bool);
	};
	this.changeDeathArray = function(orgID, neighbs, bool){
		this.organism_list[orgID-1].changeDeathArray(neighbs,bool);
	};

	this.getSettings = function(){
		return this.settings;
	};
	
	/* SETUP */
	this.init();
}

function getRandInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}


