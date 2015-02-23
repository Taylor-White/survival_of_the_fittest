/*
State: State
File owner:
*/

var DEAD = 0;
var ALIVE = 1;

/* represents the organism "class" */
function organism(orgID, numCols, numRows){
	console.log("creating an Organism");

	this.orgID = orgID;
	this.numCols = numCols;
	this.numRows = numRows;
	this.birthArray = [0, 0, 0, 1, 0, 0, 0, 0, 0];
	this.sustainArray = [0, 0, 1, 1, 0, 0, 0, 0, 0]

	this.age = 0;
	this.birthCount = 0;
	this.susCount = 0;
	this.deathCount = 0;

	/*	OBSERVABLE METHODS */
	this.observers = [];

	this.addObserver = function(observer){
		this.observers.push(observer);	}
	this.removeObserver = function(observer){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}}
	this.notifyObservers = function(msg){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}}

	this.startStep = function(callback){

	}

	this.incAge = function(){
		this.setAge(this.age + 1);
	}

	this.setAge = function(a){
		console.log("Org " + orgID + " age " + this.age + " -> " + a);
		this.age = a;
	}

	this.setOrgID = function(ID){
		this.orgID = ID;
	}

	/* function for when the simulation should step the simulation */
	this.step = function(){
		this.incAge();
		var nextState = createMatrix(this.numRows, this.numCols, 0);
		console.log("	stepping org " + this.orgID);
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				neighbours = CalcNeighbours(this.state, row, col);
				// console.log("neighbours " + row + ", " + col + ": " + neighbours);
				if(this.state[row][col] == ALIVE){
					if(this.sustainArray[neighbours] == 1){
						this.susCount++;
						nextState[row][col] = ALIVE;
					} else {
						this.deathCount++;
						nextState[row][col] = DEAD;
					}
				} else if (this.birthArray[neighbours] == 1) {
					this.birthCount++;
					nextState[row][col] = ALIVE;
				} else {
					this.deathCount++;
					nextState[row][col] = DEAD;
				}
			}
		}
		// console.log("next: " + nextState);
		this.state = nextState;
		this.notifyObservers("StateChanged");
		return;

		function CalcNeighbours(s, r, c){

			var total = 0;
			if(s[r][c] == 1){
				total--;
			}
			for (var h = -1; h <= 1; h++) {
    		    for (var w = -1; w <= 1; w++) {
				  if((r+h >= ROWS) || (c+w >= COLUMNS) || (r+h < 0) || (c+w < 0)){
				  }	else{
					  if (s[r+h][c+w] !== DEAD) {
						total++;
					  }
				  } 
    		    }
			}
			return total;
		}
	}

	this.randomize = function(numLive){
		console.log("randomizing");
		this.clearState();
		for (var row = 0; row < this.numRows; row++) {
			for (var col = 0; col < this.numCols; col++) {
				var i = Math.floor(Math.random() * numLive);
				if(i == 0)
					this.state[row][col] = 1; 
			}
		}
		this.notifyObservers("StateChanged");
	}

	this.toggleCell = function(row, col){
		state[row][col] = !state[row][col];
		this.notiyfObservers("StateChanged");
	}

	this.clearState = function(){
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				this.state[row][col] = 0;
			}
		}
		// this.notifyObservers("StateChanged");
	}

	this.getMatrix = function(){
		// console.log("Getting Matrix: " + this.state);
		return this.state;
	}

	/* function for the coordinates of the organism */
	this.toggleCell = function(x,y){

	}

	/* function to clear the organism */
	this.resetOrg = function(){
		this.clearState();
		this.setAge(0);
	}

	/* Creates and returns a matrix filled with a passed in value. Usually 0 */
	this.initState = function(m, n, initial){
		this.state = [m];
		for (var i = 0; i < m; i += 1) {
			var a = [];
			for (var j = 0; j < n; j += 1) {
				a[j] = initial;
			}
			this.state[i]= a;
		}
	}

	this.initState(numRows, numCols, 0);
}

/* Creates and returns a matrix filled with a passed in value. Usually 0 */
function createMatrix(m, n, initial){
	var mat = new Array(m);
	for (var i = 0; i < m; i += 1) {
		var a =   new Array(n);
		for (var j = 0; j < n; j += 1) {
			a[j] = initial;
		}
		mat[i]= a;
	}
	return mat;
}

function copyMatrix(oldMat, newMat){
	var rows = oldMat.length;
	var cols = oldMat[0].length;
	for (var i=0; i<rows; i++ ){
		for (var j=0; j<cols; j++){
			newMat[i,j] = oldMat[i,j];
		}
	}
}