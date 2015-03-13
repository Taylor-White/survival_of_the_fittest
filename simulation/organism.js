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
	// this.seedHistory = []; -- want to but shouldn't now

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
		//console.log("Org " + orgID + " birth " + this.birthCount + " -> " + b);
		this.birthCount = b;
	};
	this.setSusCount = function(s){
		//console.log("Org " + orgID + " sustain " + this.susCount + " -> " + s);
		this.susCount = s;
	};
	this.setDeathCount = function(d){
		//console.log("Org " + orgID + " death " + this.deathCount + " -> " + d);
		this.deathCount = d;
	};
	this.setExploredCount = function(e){
		//console.log("Org " + orgID + " explored " + this.exploredCount + " -> " + e);
		this.exploredCount = e;
	};
	this.setState = function(state){
		// console.log(" ----- Setting State ----- ");
		copyMatrix(this.state, state);
		// var activeArray = this.getActiveArea();
	};
	this.setSeed = function(seed){
		copyMatrix(this.seed, seed);
		// this.seed = seed;
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

		// FOR DEBUG!! console.log("-----      -----     -----");
		// FOR DEBUG!! console.log("this:\n " + this);
		// FOR DEBUG!! console.log("this.ex:\n " + this.ex);

		/* Calculate the next state, collecting stats on the way */
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				var neighbours = CalcNeighbours(this.state, row, col);
				if(this.state[row][col] == ALIVE){
					if(susArray[neighbours] == 1){
						// sustainsCount++; -- need to add sustain to stats
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
		// this.stats.updateOrgStats(	this.orgID, birthsCount,
		// 							deathsCount, exploredCount );
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
		// console.log("Just reset org: " + this);
	};

	this.resetToSeed = function(){
		this.orgStats.clearStats();
		this.setState(this.getSeed());
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
		var fe = this.settings.getFitScalerE();
		//var fs = this.settings.getFitScalerS();
		// console.log(" -- Updating fitness -- " + this);
		// console.log(" -- -- births " + fb + " | " + this.orgStats.getBirths());
		// console.log(" -- -- deaths " + fd + " | " + this.orgStats.getDeaths());
		// console.log(" -- -- births " + fe + " | " + this.orgStats.getExplored());

		var points = fb*this.orgStats.getBirths()+fd*this.orgStats.getDeaths()+fe*this.orgStats.getExplored();
		this.setFitness(points);
		// alert("Updating fitness to " + points);
	};

	this.building_toggleCell = function(row, col){
		// console.log("Toggling " + row + " " + col + " in " + this);

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
		// console.log("Setting " + row + " " + col + " in " + this);
		// alert(row + " " + col);
		// console.log(this);

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
	this.build_setState = function(state){
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

		// console.log("Mutating cell " + row + ", " + col + " in");
		// console.log("  " + minX + ", " + minY + "  -> " + maxX + ", " + maxY);
		// console.log(this);

		/* setcell Should random choose between ALIVE and DEAD */
		// this.building_setCell(row, col, ALIVE);
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


		// alert("(" + minX + ", " + minY + ")\n" + "(" + maxX + ", " + maxY + ")");
		
		return [minX, minY, maxX, maxY];
	};

	/* WORK-IN-PROGRESS -- LOW PRIORITY */
	this.patternCtr = function(){
		/*	0: DEAD
			1: ALIVE
			9: WILD (could be either)
		*/
		var glider = [ 
			[9,0,0,0,0], 
			[0,0,1,0,0],
			[0,1,1,0,0],
			[0,1,0,1,0],
			[0,0,0,0,0]
		];
		var square = [
			[0,0,0,0],
			[0,1,1,0],
			[0,1,1,0],
			[0,0,0,0]
		];
		var cross = [
			[0,0,0,0,0],
			[0,1,1,1,0],
			[0,0,0,0,0],
		];
	};

	/* WORK-IN-PROGRESS -- LOW PRIORITY */
	this.compareBack = function(row, col){
		/* may need better than js arrays for this
			also may need methods to query neighbors
				so we can handle out-of-bounds there, too  */
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


		// this.initState = function(m, n, initial){
		// 	this.state = [m];
		// 	for (var i = 0; i < m; i += 1) {
		// 		var a = [];
		// 		for (var j = 0; j < n; j += 1) {
		// 			a[j] = initial;
		// 		}
		// 		this.state[i]= a;
		// 	}
		// };

	this.init = function(){
		// this.setState(createMatrix(50,50,0));
		// this.setSeed(createMatrix(50,50,0));

		this.initState(numRows, numCols, 0);
		this.initState(numRows, numCols, 0);
	};

	this.init();
}

/* Copies from newMat to oldMat */
function copyMatrix(oldMat, newMat){
	// console.log("-------");
	// console.log("-------");
	// console.log("oldMat");
	// console.log(oldMat);
	// console.log("newMat");
	// console.log(newMat);
	var rows = oldMat.length;
	var cols = oldMat[0].length;
	for (var i=0; i<rows; i++ ){
		for (var j=0; j<cols; j++){
			oldMat[i][j] = newMat[i][j] ;
		}
	}
	// console.log("oldMat After");
	// console.log(oldMat);
}
