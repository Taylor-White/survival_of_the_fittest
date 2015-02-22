/*
State: State
File owner:
*/

var DEAD = 0;
var ALIVE = 1;

/* represents the organism "class" */
function organism(numCols, numRows){
	console.log("creating an Organism");

	this.numCols = numCols;
	this.numRows = numRows;
	this.birthArray = [0, 0, 0, 1, 0, 0, 0, 0, 0];
	this.sustainArray = [0, 0, 1, 1, 0, 0, 0, 0, 0]

	this.age = 0;

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

	/* function for when the simulation should step the simulation */
	this.step = function(){
		this.age++;
		var nextState = createMatrix(this.numRows, this.numCols, 0);
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				neighbours = CalcNeighbours(row, col);
				if(this.state[row,col] == ALIVE){
					if(this.sustainArray[neighbours] == 1){
						nextState[row,col] = ALIVE;
					}
				} else if (birthArray[neighbours] == 1) {
					nextState[row,col] = ALIVE;
				}
			}
		}
		this.state = nextState;
		notifyObservers("StateChanged");
		return;

		function CalcNeighbours(r, c){
			var total = 0;
			if(this.state[r][c] == 1)
				total--;
			for (var h = -1; h <= 1; h++) {
    		    for (var w = -1; w <= 1; w++) {
				  if((r+h >= ROWS) || (c+w >= COLUMNS) || (r+h < 0) || (c+w < 0)){
				  }	else{
					  if (this.state[r+h][c+w] !== DEAD) {
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
		notiyfObservers("StateChanged");
	}

	this.clearState = function(){
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				this.state[row][col] = 0;
			}
		}
		notifyObservers("StateChanged");
	}

	this.getMatrix = function(){
		return this.state;
	}

	/* function for the coordinates of the organism */
	this.toggleCell = function(x,y){

	}

	/* function to clear the organism */
	this.clearOrginism = function(){

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