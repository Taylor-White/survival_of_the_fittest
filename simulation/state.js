/*
Grid: 2D Array
Life Logic
File owner: Taylor White
*/
	
	var DEAD = 0;
	var ALIVE = 1;
	
	var BIRTH = [0, 0, 0, 1, 0, 0, 0, 0, 0];
	var SUSTAIN = [0, 0, 1, 1, 0, 0, 0, 0, 0];
/*	
function matrix(mat){
	this.matrix = mat;
}	*/
	
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

/* Creates and returns a matrix filled with a passed in value. Usually 0 */
function getMatrix(){
	return mat;
}	

/* function for when the simulation should step the simulation */
function step()
{
	var nextState = createMatrix(ROWS, COLUMNS, 0);
	for (var h = 0; h < ROWS; h++) {
		for (var w = 0; w < COLUMNS; w++) {
			neighbours = CalcNeighbours(h,w);
			if(state[h][w] === ALIVE){
				if(SUSTAIN[neighbours] == 1) {
					nextState[h][w] = ALIVE;
				}
			} else {
				if (BIRTH[neighbours] === 1){
					nextState[h][w] = ALIVE;
				}
			}
		}
	}
	for(var i = 0; i < ROWS; i++){
		for(var k = 0; k < ROWS; k++){
		}
	}
	state = nextState;
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

/* 
 *function for choosing random number of dead and alive cells 
 * Value passed in represents the chance of a cell being alive.  
 * Example: numLive = 10 means one in ten cells will be alive.
 */
function randomize(numLive)
{
	clearState();
	for (var h = 0; h < ROWS; h++) {
		for (var w = 0; w < COLUMNS; w++) {
			var i = Math.floor(Math.random() * numLive);
			if(i == 0)
				state[h][w] = 1; 
		}
	}
}

/* function for toggling the coordinates of the organism */
function toggleCell(h, w)
{
	if(state[h][w] == 0){
		state[h][w] = 1;
	}else{
		state[h][w] = 0;
	}	
}

/* function to clear the organism state */
function clearState()
{
	for (var h = 0; h < ROWS; h++) {
		for (var w = 0; w < COLUMNS; w++) {
			state[h][w] = 0;
		}
	}
}
