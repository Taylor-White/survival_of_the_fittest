/*****************
Displays the canvas
*****************/

var Canvas{}

Canvas.WIDTH;
Canvas.HEIGHT;

Canvas.COLOR_DEAD;
Canvas.COLOR_ALIVE;

//Retrieves Organism object to be displayed
function getOrganism(){
	
	
}

//Creates a canvas based on width, height, number of cells, and colors
function create(){
	
}

function update(){
	
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

