/*
State: State
File owner:
*/

var DEAD = 0;
var ALIVE = 1;

/* represents the organism "class" */
function organism(numCols, numRows, initial){
	alert("Making an org");

	this.numCols = numCols;
	this.numRows = numRows;
	this.state = createMatrix(numCols, numRows, initial);
	this.birthArray = [0, 0, 0, 1, 0, 0, 0, 0, 0];
	this.sustainArray = [0, 0, 1, 1, 0, 0, 0, 0, 0]

	this.age = 0;

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
		return;

		function CalcNeighbours(r, c){
			var total = 0;
			if(state[r][c] == 1)
				total--;
			for (var h = -1; h <= 1; h++) {
    		    for (var w = -1; w <= 1; w++) {
				  if((r+h >= ROWS) || (c+w >= COLUMNS) || (r+h < 0) || (c+w < 0)){
				  }	else{
					  if (state[r+h][c+w] !== DEAD) {
						total++;
					  }
				  } 
    		    }
			}
			return total;
		}
	}

	this.randomize = function(numLive){
		for (var row = 0; row < this.numRows; row++) {
			for (var col = 0; col < this.numCols; col++) {
				var i = Math.floor(Math.random() * numLive);
				if(i == 0)
					state[row][col] = 1; 
			}
		}
	}

	this.toggleCell = function(row, col){
		state[row][col] = !state[row][col];
	}

	this.clearState = function(){
		for (var row = 0; row < this.numRows; row++){
			for (var col = 0; col < this.numCols; col++){
				state[row][col] = 0;
			}
		}
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
}

/* Creates and returns a matrix filled with a passed in value. Usually 0 */
function createMatrix(m, n, initial){
	var a, i, j, mat = [];
	for (i = 0; i < m; i += 1) {
		a = [];
		for (j = 0; j < n; j += 1) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
}