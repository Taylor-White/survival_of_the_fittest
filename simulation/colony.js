/*
Organisms: list of Organisms
File owner: Xi
*/

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

	/* Get an organism by it's orgID */
	this.getOrg = function(orgID){
		return this.orgList[orgID-1];
	};
	this.setOrg = function(newOrg){

		var oldOrg = this.orgList[newOrg.getOrgID()-1];
		this.prepOrg(newOrg);
		this.orgList[newOrg.getOrgID()-1] = newOrg;
		this.notifyObservers("OrgReplaced" + newOrg.getOrgID());
	};

	this.randSame = function(){
		var w = this.settings.getSpawnWidth();
		var h = this.settings.getSpawnHeight();
		var x = this.settings.getSpawnCenterX() - Math.floor((w/2)+1);
		var y = this.settings.getSpawnCenterY()	- Math.floor((h/2)+1);
		var d = this.settings.getSpawnDensity();

		/* Clear each Org */
		for (var orgNum = 0; orgNum < this.orgList.length; orgNum++){
			this.orgList[orgNum].clearOrg();
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

			org.mutate();
			org.doneBuilding();
		}
	};

	this.loadSeed = function(seed){
		/* Clear each Org */
		for (var orgNum = 0; orgNum < this.orgList.length; orgNum++){
			this.orgList[orgNum].clearOrg();
		}

		/* copy seed to each and mutate it */
		var org;
		for(var i=0; i<this.numOrgs; ++i){
			org = new organism(i + 1, STATE_WIDTH, STATE_HEIGHT);
			this.prepOrg(org);
			org.building_setState(seed);
			org.mutate();
			org.doneBuilding();
			this.setOrg(org);	// uses orgID to determine placement in array
		}
		this.colStats.setGens(0);
		this.colStats.setAge(0);
	};

	this.resetUniverse = function(){
		this.randSame();		// randomize each org
		this.colStats.setGens(0);
		this.colStats.setAge(0);
	};

	this.resetGen = function(){
		/* Should reset each org to its seed */
		for(var orgID = 1; orgID<=this.numOrgs; orgID++ ){
			this.getOrg(orgID).resetToSeed();
		}
		this.colStats.setAge(0);
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
		this.stats.clearColStats();
		this.colStats.incGens();
		this.evolve();
		this.colStats.setAge(0); // reset colony's age
	};

	this.isGenDone = function(){
		return this.colStats.getAge() >= this.settings.getLifetime();
	};

	this.getFittest = function(){
		// Copy organism array
		var fitOrgs = createArrayCopy(this.orgList);
		
		// drop the worst 6 from new array
		for (var i = 0; i<6; ++i){
			var worstIndex = 0;
			for (var ocount = 0; ocount<fitOrgs.length; ocount++){
				if(fitOrgs[ocount].getFitness() < fitOrgs[worstIndex].getFitness()){
					worstIndex = ocount;
				}
			}
			fitOrgs.splice(worstIndex,1);
		}
		// return array with best 4
		return fitOrgs;
	};
	this.evolve = function(){

		var mate = function(colony, orgID, parent1, parent2){
			var child = new organism(orgID,STATE_WIDTH,STATE_HEIGHT);
			colony.prepOrg(child);

			//loop through each cell and put either a 1 or 0 in the child cell.
			for(var row=0; row<50; row++){
				for(var col=0; col<50; col++){
					var p1cell = parent1[row][col];
					var p2cell = parent2[row][col];
					if( p1cell == p2cell){
						child.building_setCell(row,col,p1cell);
					} else{
						child.building_setCell(Math.floor(Math.random() * 2));
					}
				}
			}
			return child;
		};

		var fittest = this.getFittest(); //Retrieve Fittest Organisms
		this.stats.clearStats();
		var newOrgs = []; //Array of next generation organisms

		/* CROSSOVER */
		//Mate each organism in fittest with each of the others. 
		//Put the child organisms in newOrgs
		for(var i=0; i<fittest.length; ++i){		// loop left elites
			for(var j=i+1; j<fittest.length; ++j){	// loop right elites
				var leftParent  = fittest[i];
				var rightParent = fittest[j];
				
				/* make a baby for each pairing */
				var newOrg = mate(this, newOrgs.length+1, leftParent.getSeed(), rightParent.getSeed());
				if(boolFromPercent(this.settings.getMutRate())){
					newOrg.mutate();
				}
				newOrg.doneBuilding();
				newOrgs.push(newOrg);
			}
		}

		//Set state of the last 4 organisms to the 4 elite fittest organisms
		var elite;
		for(var eliteCount=0; eliteCount<fittest.length; ++eliteCount){
			elite = new organism(newOrgs.length + 1, STATE_WIDTH, STATE_HEIGHT);
			this.prepOrg(elite);
			elite.building_setState(fittest[eliteCount].getSeed());
			elite.doneBuilding();
			newOrgs.push(elite);
		}	

		//Set state of the first 6 organisms to the 6 new child organisms
		for(var i=0; i<newOrgs.length; ++i){
			var org = newOrgs[i];
			this.setOrg(org);	// uses orgID to determine placement in array
		}
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
}