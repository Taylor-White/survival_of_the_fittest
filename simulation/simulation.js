/*****************
Contains information about the simulation, including the step() function
File owner: Taylor
*****************/


	var HEIGHT = 3;
	var WIDTH = 3;	
	var DEAD = 0;
	var ALIVE = 1;
	var LIFE = 3;
	var SUSTAIN = 2;
	var DEATH = 4;

// Takes a state and moves one turn forward following Conways rules
function step() {
	//For tests
	console.log("step()");
	var currentGenerationGrid = Array.matrix(HEIGHT, WIDTH, 0);
	for (var h = 0; h < HEIGHT; h++) {
		for (var w = 0; w < WIDTH; w++) {
			currentGenerationGrid[h][w] = Math.floor(Math.random() * 2)
		}
	}
	//For tests
	var current = 'current matrix \n';
	for(var i = 0; i < HEIGHT; i++){
		for(var k = 0; k < HEIGHT; k++){
			current = current + currentGenerationGrid[i][k] + ' ';
		}
		current = current + '\n';
	}console.log(current);
	
	var nextGenerationGrid = Array.matrix(HEIGHT, WIDTH, 0);/*
	for (var h = 0; h < HEIGHT; h++) {
		for (var w = 0; w < WIDTH; w++) {
			nextGenerationGrid[h][w] = currentGenerationGrid[h][w];
		}
	}*/	
	for (var h = 0; h < HEIGHT; h++) {
		for (var w = 0; w < WIDTH; w++) {
			neighbours = CalcNeighbours(h,w);
			if(currentGenerationGrid[h][w] !== DEAD){
				if((neighbours >= SUSTAIN) && (neighbours <= DEATH)) {
						
					nextGenerationGrid[h][w] = ALIVE;
				}
			} else {
				if (neighbours === LIFE){
					
					nextGenerationGrid[h][w] = ALIVE;
				}
			}
			console.log('nextGen: ' + nextGenerationGrid[h][w]);	
		}
	}
	var matrix = 'Next matrix \n';
	for(var i = 0; i < HEIGHT; i++){
		for(var k = 0; k < HEIGHT; k++){
			matrix = matrix + nextGenerationGrid[i][k] + ' ';
		}
		matrix = matrix + '\n';
	}
	console.log(matrix);

	create();
	
	function CalcNeighbours(r, c){
	var total = 0;
	if(currentGenerationGrid[r][c] == 1)
		total--;
	for (var h = -1; h <= 1; h++) {
        for (var w = -1; w <= 1; w++) {

		  if((r+h >= HEIGHT) || (c+w >= WIDTH) || (r+h < 0) || (c+w < 0)){

		  }	else{
			  if (currentGenerationGrid[r+h][c+w] !== DEAD) {

				total++;
			  }
		  } 
			
        }
      }
	  				console.log('row: ' + r + ' ' + 'col: ' + c);
				console.log('total: ' + total);	
	return total;
	}
}


