/*
Organisms: list of Organisms
File owner: Xi
*/

STATE_WIDTH = 50;
STATE_HEIGHT = 50;

/* represents the colony class */
function colony(numOrgs){
	// console.log("creating Colony");

	/* Org stuff */
	this.numOrgs = numOrgs;
	this.orgList = [];
	
	/* Stats */
	this.stats = new stats(numOrgs);
	this.colStats = this.stats.getColStats();

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
		return this.orgList[orgID-1];
	};
	this.setOrg = function(org){
		// console.log(org);
		// this.prepOrg(org);
		this.orgList[org.getOrgID()-1] = org;
	};

	this.randSame = function(){
		var w = this.settings.getSpawnWidth();
		var h = this.settings.getSpawnHeight();
		var x = this.settings.getSpawnCenterX() - Math.floor((w/2)+1);
		var y = this.settings.getSpawnCenterY()	- Math.floor((h/2)+1);
		var d = this.settings.getSpawnDensity();

		// console.log("Randomizing " + this);
		// console.log("  At: " + x + ", " + y + "  In: " + w + "X" + h);

		/* Reset each Org */
		for (var orgNum = 0; orgNum < this.orgList.length; orgNum++){
			this.orgList[orgNum].resetOrg();
		}
		
		for (var row = y; row < y+h; row++) {
			for (var col = x; col < x+w; col++) {
				/* should cell be alive? */
				if(	boolFromPercent(d)&&
					inRange(row,0,50) &&
					inRange(col,0,50) ){

					/* make this cell alive in each org */
					for (orgNum = 0; orgNum < this.orgList.length; ++orgNum){
						this.orgList[orgNum].building_setCell(row, col, ALIVE);
					}
				}
			}
		}

		// mutate each org and freeze it's seed
		for (orgNum = 0; orgNum < this.orgList.length; orgNum++){
			var org = this.orgList[orgNum];

			org.mutate(x, y, w, h, 100);
			org.doneBuilding();
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
		// 	var org = this.orgList[i];
		// 	org.setState(seed);
		// 	org.setSeed(seed);
		// }
	};

	this.resetUniverse = function(){
		this.randSame();		// randomize each org
		this.colStats.setGens(0);
	};

	/* reset each organism in the colony
		currently randomizes */
	this.resetColony = function(){
		// console.log("Resetting Colony");
		this.randSame();		// randomize each org
		// this.colStats.setGens(0);
	};

	this.resetGen = function(){
		/* Should reset each org to its seed */
		/* TODO */
		
	};

	this.step = function(){
		/* step each org */
		for(var i = 0; i<this.orgList.length; i++){
			this.orgList[i].step();
		}

		/* increment age */
		this.colStats.incAge();
		this.colStats.calcStats();
		/* "Grim Reaper" -- checks if the colony members should die */
		if (this.colStats.getAge() >= this.settings.getLifetime()){
			this.genDone();	// generation done function
		}
	};

	/* handles the generation completing */
	this.genDone = function(){
		this.notifyObservers("GenDone");
	};
	this.advanceGen = function(){
		this.stats.clearStats();
		// this.colStats.incGens();
		this.resetColony();
		// this.evolve();
		this.colStats.setAge(0); // reset colony's age
	};

	this.isGenDone = function(){
		// console.log("isGenDone");
		return this.colStats.getAge() >= this.settings.getLifetime();
	};

	this.getFittest = function(){
		var fittest = []; //Store the 4 fittest organisms
		var orgList = this.orgList; 
		//Put the first 4 organisms in fittest[]
		for(var i=0; i<4; ++i){
			fittest[i] = i;
		}	

		//Find the least fit element in the fittest array			
		var indexOfWeakest = function(){
			var min=fittest[0];
			//Loop throught fittest to find weakest organism in the fittest array
			for(var i=1; i<fittest.length; i++){
				if(orgList[min].getFitness() > orgList[fittest[i]].getFitness()){
					min = fittest[i]; 
				}
			}
			return min;
		};
		var m = indexOfWeakest();

		//loop through the rest of the organisms and compare to the ones in the fittest array
		for(var i=4; i<numOrgs; ++i){
			//If an organism outside the fittest array is more fit, then replace
			if(orgList[i].getFitness() > orgList[m].getFitness()){
				fittest[m] = orgList[i].getFitness();
				m = indexOfWeakest(); //Update weakest seed
			}
		}
		return fittest;
	};
	this.evolve = function(){

		var mate = function(col, orgID, parent1, parent2){
			// console.log("Parent1");
			// console.log(parent1);
			// console.log("Parent2");
			// console.log(parent2);

			/* temporary orgID: -1 */
			var child = new organism(orgID,STATE_WIDTH,STATE_HEIGHT);
			col.prepOrg(child);

			// var child = createMatrix(50, 50, 0);

			//loop through each cell and put either a 1 or 0 in the child cell.
			for(var row=0; row<50; row++){
				for(var col=0; col<50; col++){
					var p1cell = parent1[row][col];
					var p2cell = parent2[row][col];
					if( p1cell == p2cell){
						// console.log("child\n");
						// console.log(child);
						child.building_setCell(row,col,p1cell);
					} else{
						child.building_setCell(Math.floor(Math.random() * 2));
					}
				}
			}
			// console.log("child: " + child);
			return child;
		};

		var fittest = this.getFittest(); //Retrieve Fittest Organisms
		var newOrgs = []; //Array of next generation organisms
		var numNewOrgs = 0; //Keeps track of number of new organisms
		var orgList = this.orgList;


		//Mate each organism in fittest with each of the others. 
		//Put the child organisms in newOrgs
		for(var i=0; i<fittest.length; ++i){
			for(var j=i+1; j<fittest.length; ++j){
				var leftOrg  = orgList[fittest[i]];
				var rightOrg = orgList[fittest[j]];

				newOrgs[numNewOrgs] = mate(this, i+1, leftOrg.getSeed(), rightOrg.getSeed());
				numNewOrgs++;
			}
		}

		//Set state of the first 6 organisms to the 6 new child organisms
		for(var i=0; i<numNewOrgs; ++i){
			var org = newOrgs[i];

			console.log("org:");
			console.log(org);
			this.setOrg(org);	// uses orgID to determine placement in array
		}
		//Set state of the last 4 organisms to the 4 elite fittest organisms
		for(var i=numNewOrgs; i<fittest.length+numNewOrgs; ++i){
			orgList[i].setState(orgList[fittest[i-numNewOrgs]].getState());
		}	

		// console.log("orglist" + orgList);
		return;
	};

	this.toString = function(){
		return "The Colony | Age: " + this.colStats.getAge(); 
	};

	this.prepOrg = function(org){
		org.setStats(this.stats);			// Pass reference of the Stats object
		org.setSettings(this.settings);		// Pass reference of the Settings object
	};

	this.init = function(){
		this.colStats.setAge(0);
		this.colStats.setGens(0);

		/* fill list of orgs */
		for (var i=0; i<numOrgs; i++){
			var org = new organism(i+1,STATE_WIDTH,STATE_HEIGHT);
			this.prepOrg(org);
			this.orgList.push( org );		// Add org to the org list
		}
	};


	this.changeBirthArray = function(orgID, neighbs, bool){
		this.orgList[orgID-1].changeBirthArray(neighbs,bool);
	};
	this.changeDeathArray = function(orgID, neighbs, bool){
		this.orgList[orgID-1].changeDeathArray(neighbs,bool);
	};

	this.getSettings = function(){
		return this.settings;
	};
	
	/* SETUP */
	this.init();
	//Testing//
	// this.getFittest();
}