/*****************
Displays the canvas
*****************/

var WIDTH = 3;
var HEIGHT = 3;

var COLOR_DEAD = "white";
var COLOR_ALIVE = "black";

console.log('canvas.js');
function create() {
	console.log('canvas is working');
	//var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d");
	//canvas.addEventListener('click', handleClick);
	drawBox();	
	
}

	



function drawBox() {
	//test
	var currentGenerationGrid = Array.matrix(HEIGHT, WIDTH, 0);
	var matrix = 'Viewable matrix \n';
	for (var h = 0; h < HEIGHT; h++) {
		for (var w = 0; w < WIDTH; w++) {
			
			currentGenerationGrid[h][w] = Math.floor(Math.random() * 2)
			matrix = matrix + currentGenerationGrid[h][w] + ' ';
			//console.log(currentGenerationGrid[h][w])
		}
	matrix = matrix + '\n';
	}
	console.log(matrix);	
	//test end
	//c.beginPath();
	c.fillStyle = COLOR_ALIVE;
	c.lineWidth = 1;
	c.strokeStyle = COLOR_ALIVE;
	for (var row = 0; row < HEIGHT; row++) {
		for (var column = 0; column < WIDTH; column++) {
			c.beginPath();
			var x = column * 10;
			var y = row * 10;
			if(currentGenerationGrid[row][column] == 1){
				c.fillStyle = COLOR_ALIVE;
			} else{
				c.fillStyle = COLOR_DEAD;
			}
			c.rect(x, y, 10, 10);
			c.fill();
			c.stroke();
			c.closePath();
		}
	}
	//c.closePath();
}	

/*
function handleClick(e) {
    c.fillStyle = "black";

    c.fillRect(Math.floor(e.offsetX/10)*10,
               Math.floor(e.offsetY/10)*10,
               10, 10);
}



/*
$( document ).ready(function() {
    console.log( "ready!" );

var canvas = document.getElementById("canvas"),
    c = canvas.getContext("2d");
canvas.addEventListener('click', handleClick);

function drawBox() {
    c.beginPath();
    c.fillStyle = "white";
    c.lineWidth = 1;
    c.strokeStyle = 'black';
    for (var row = 0; row < 56; row++) {
        for (var column = 0; column < 56; column++) {
            var x = column * 10;
            var y = row * 10;
            c.rect(x, y, 10, 10);
            c.fill();
            c.stroke();
        }
    }
    c.closePath();
}

function handleClick(e) {
    c.fillStyle = "black";

    c.fillRect(Math.floor(e.offsetX/10)*10,
               Math.floor(e.offsetY/10)*10,
               10, 10);
}

drawBox();
});
*/

