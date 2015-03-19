/*
State: State
File owner:
*/

var DEAD = 0;
var ALIVE = 1;
var EXPLORED = 2;

/* represents the organism "class" */
function organism(orgID, numCols, numRows){
	console.log("creating an Organism");

	this.orgID = orgID;
	this.numCols = numCols;
	this.numRows = numRows;
	this.fitness = 0;

	/*	OBSERVABLE METHODS */
	this.observers = [];

	this.addObserver = function(observer){
		this.observers.push(observer);	};
	this.removeObserver = function(observer){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}};
	this.notifyObservers = function(msg){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}};

	/* Setters */
	this.setBirthCount = function(b){
		this.birthCount = b;
	};
	this.setSusCount = function(s){
		this.susCount = s;
	};
	this.setDeathCount = function(d){
		this.deathCount = d;
	};
	this.setExploredCount = function(e){
		this.exploredCount = e;
	};
	this.setState = function(state){
		copyMatrix(this.state, state);
	};
	this.setSeed = function(seed){
		copyMatrix(this.seed, seed);
	};
	this.setOrgID = function(ID){
		this.orgID = ID;
	};
	this.setStats = function(stats){
		this.stats = stats;
		this.orgStats = stats.getOrgStats(this.orgID);
	};
	this.setSettings = function(settings){
		this.settings = settings;
	};
	this.setFitness = function(fitness){
		this.fitness = fitness;
	};	

	/* Getters */
	this.getState = function(){
		return this.state;
	};
	this.getSeed = function(){
		return this.seed;
	};
	this.getOrgID = function(){
		return this.orgID;
	};
	this.getCellValue = function(row, col){
		return this.state[row][col];
	};
	this.getPrintableMatrix = function(){
		var printMat = "";
		for (var row = 0; row < this.numRows; row++){
			printMat = this.state[row] + "\n";
		}
	};
	this.getFitness = function(){
		this.updateFitness();
		return this.fitness;
	};		


	/* MODEL STUFF*/
	/* Steps according to the rules in the settings */
	this.step = function(){

		/* Prepare next state's matrix (empty) */
		var nextState = createMatrix(this.numRows, this.numCols, 0);

		/* collect stats counts */
		var birthsCount = 0;
		var deathsCount = 0;
		var sustainsCount = 0;
		var exploredCount = 0;		
		
		/* Shorter names for the settings arrays */
		var birthArray = this.settings.getBirthArray();
		var susArray = this.settings.getSustainArray();

		/* Calculate the next state, collecting stats on the way */
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				var neighbours = CalcNeighbours(this.state, row, col);
				if(this.state[row][col] == ALIVE){
					if(susArray[neighbours] == 1){
						sustainsCount++;
						nextState[row][col] = ALIVE;
					} else {
						this.orgStats.addToDeaths(1);
						nextState[row][col] = EXPLORED;
					}
				} else if (birthArray[neighbours] == 1) {
					if(this.state[row][col] != EXPLORED){
						this.orgStats.addToExplored(1);
					}
					this.orgStats.addToBirths(1);
					nextState[row][col] = ALIVE;
				} else if (this.state[row][col] == EXPLORED){
					nextState[row][col] = EXPLORED;
				} else{
					nextState[row][col] = DEAD;
				}	
			}
		}

		/* Update the stats for this org */
		/* Save the new state */
		this.state = nextState;
		return;

		/* helper function to get the number of alive neighbors for a cell */
		function CalcNeighbours(s, r, c){

			var total = 0;
			if(s[r][c] == 1){
				total--;
			}
			for (var h = -1; h <= 1; h++) {
    		    for (var w = -1; w <= 1; w++) {
				  if((r+h >= ROWS) || (c+w >= COLUMNS) || (r+h < 0) || (c+w < 0)){
				  }	else{
					  if (s[r+h][c+w] == ALIVE) {
						total++;
					  }
				  } 
    		    }
			}
			return total;
		}
	};

	/* Sets each cell to dead */
	this.clearState = function(){
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				this.state[row][col] = 0;
			}
		}
	};

	/* Reset counters, Clear state */
	this.clearOrg = function(){
		this.orgStats.clearStats();
		this.clearState();
	};

	this.resetToSeed = function(){
		this.orgStats.clearStats();
		this.building_setState(this.getSeed());
		this.doneBuilding();
	};

	/* Array Changes */
	this.changeBirthArray = function(neighbs, bool){
		this.settings.setBirthArrayVal(neighbs, bool); };
	this.changeSustainArray = function(neighbs, bool){
		this.settings.setSustianArrayVal(neighbs, bool); };

	this.toString = function(){
		return "An Org | orgID: " + this.orgID + ", explored: " + this.stats.getOrgStats(this.orgID).getExplored(); 
	};
	this.updateFitness = function(){
		var fb = this.settings.getFitScalerB();
		var fd = this.settings.getFitScalerD();
		var fs = this.settings.getFitScalerS();
		var fe = this.settings.getFitScalerE();
		var points = fb*this.orgStats.getBirths()+fd*this.orgStats.getDeaths()+fs*this.orgStats.getSustains()+fe*this.orgStats.getExplored();
		this.setFitness(points);
	};

	this.building_toggleCell = function(row, col){
		var numRows = this.state.length;
		var numCols = this.state[numRows-1].length;

		if(	inRange(row,0,numRows) && inRange(col,0,numCols) ){
			/* in bounds, toggle */
			if (this.state[row][col] == ALIVE) {
				this.building_setCell(row, col, DEAD);
			} else {
				this.building_setCell(row, col, ALIVE);
			}
		} else {
			/* out of bounds, don't toggle */
		}
	};
	this.building_setCell = function(row, col, newCell){
		var numRows = this.state.length;
		var numCols = this.state[numRows-1].length;

		if(	inRange(row, 0, numRows) &&
			inRange(col, 0, numCols)){
			/* in bounds */
			var oldCell = this.state[row][col];
			this.state[row][col] = newCell;

			if (oldCell == ALIVE) {
				if (newCell == DEAD){
					this.orgStats.addToExplored(-1);
				}
			} else if (oldCell == DEAD) {
				if (newCell == ALIVE){
					this.orgStats.addToExplored(1);
				}
			}
		} else {
			/* out of bounds, don't set */
		}
	};
	this.building_setState = function(state){
		this.setState(state);
		this.orgStats.setExplored(this.getNumAlive());
	};
	this.mutate = function(){
		var activeArray = this.getActiveArea();

		minX = activeArray[0];
		minY = activeArray[1];
		maxX = activeArray[2];
		maxY = activeArray[3];


		var row = getRandInt(minY, maxY);
		var col = getRandInt(minX, maxX);

		/* setcell Should random choose between ALIVE and DEAD */
		this.building_toggleCell(row, col);

	};
	this.doneBuilding = function(){
		this.setSeed(this.getState());
		this.notifyObservers("StateChanged");
	};

	this.getNumAlive = function(){
		var numAlive = 0;
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				if (this.state[row][col] == ALIVE){
					++numAlive;
				}
			}
		}
		return numAlive;
		
	};

	this.getActiveArea = function(){
		var minX = Number.POSITIVE_INFINITY;
		var minY = Number.POSITIVE_INFINITY;
		var maxX = Number.NEGATIVE_INFINITY;
		var maxY = Number.NEGATIVE_INFINITY;
		/* loop through state */
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				if (this.state[row][col] == ALIVE){
					/* SET MIN AND MAXES */
					if (col < minX){
						minX = col;
					}
					if (row < minY){
						minY = row;
					}
					if (col > maxX){
						maxX = col;
					}
					if (row > maxY){
						maxY = row;
					}
				}
			}
		}
		return [minX, minY, maxX, maxY];
	};

	/* Creates and returns a matrix filled with a passed in value.
		Usually 0 */
	this.initState = function(h, n, initial){
		this.state = [h];
		this.seed = [h];
		for (var i = 0; i < h; i += 1) {
			var stateRow = [];
			var seedRow  = [];
			for (var j = 0; j < n; j += 1) {
				stateRow[j] = initial;
				seedRow[j]  = initial;
			}
			this.state[i] = stateRow;
			this.seed[i]  = seedRow;
		}
	};

	this.init = function(){
		this.initState(numRows, numCols, 0);
		this.initState(numRows, numCols, 0);
	};

	this.init();
}
