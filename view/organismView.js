/*
View: canvas
File owner: Taylor White
*/

var CANVAS_WIDTH = 600; //Width of Canvas
var CANVAS_HEIGHT = 600; //Height of Canvas

var ROWS = 50; //Number of cells in a row
var COLUMNS = 50; //Number of cells in a column

var COLOR_DEAD = "white"; //Color of dead cells, (0 on the matrix)
var COLOR_ALIVE = "#3A619E"; //Color of alive cells, (1 on the matrix)
var COLOR_EXPLORED = "#ccefc8"; //Color of explored cells, (2 on the matrix)

var CELL_WIDTH = 10; //Pixel width of cell
var CELL_HEIGHT = 10; //Pixel height of cell

function organismView(){
	console.log("creating Organism View");

	this.fts = 0; // # updates this second (actual)
	this.fps = 0; // avg # updates per second

	/* function to update the organism on the canvas */
	this.update = function(state){
		console.log("updating org view canvas");
		// console.log("state[0][0]: " + state[0][0]);

		var c = this.canvas;
		c.fillStyle = COLOR_ALIVE;
		c.lineWidth = 1;
		c.strokeStyle = "#eee";
		for (var row = 0; row < ROWS; row++) {
			for (var column = 0; column < COLUMNS; column++) {
				c.beginPath();
				var x = column * CELL_WIDTH;
				var y = row * CELL_HEIGHT;
				if(state[row][column] == 1){
					c.fillStyle = COLOR_ALIVE;
				} else if(state[row][column] == 2){
					c.fillStyle = COLOR_EXPLORED;
				}else{
					c.fillStyle = COLOR_DEAD;
				}
				c.rect(x, y, CELL_WIDTH, CELL_HEIGHT);
				c.fill();
				c.stroke();
				c.closePath();
			}
		}
		// callback(context);
	}

	this.updateAge = function(age){
		$("#age").html("AGE: " + age);
	}
	this.updateFPS = function(fps){
		$("#fps").html("FPS: " + fps);
	}
	
	/* Register OnClicks */

	this.prepAfterLoad = function(ov){
		ov.canvas = $("canvas")[0].getContext("2d");
		$("#fps").html	("FPS: " + 0);
	}
	$(document).ready(this.prepAfterLoad(this));

}
/*
function handleClick(e) {
    c.fillStyle = "black";

    c.fillRect(Math.floor(e.offsetX/10)*10,
               Math.floor(e.offsetY/10)*10,
               10, 10);
} 
*/

  function birthInput() 
  {
	    var birth = document.forms[0];
	    var txt = "";
	    var i;
	    for (i = 0; i < birth.length; i++) 
	    {
	        if (birth[i].checked) 
	        {
	            txt = txt + birth[i].value + " ";
	        }
	    }
	    document.getElementById("resultB").value = txt;
  }

  function sustInput() 
  {
	    var sust = document.forms[1];
	    var txt = "";
	    var i;
	    for (i = 0; i < sust.length; i++) 
	    {
	        if (sust[i].checked) 
	        {
	            txt = txt + sust[i].value + " ";
	        }
	    }
	    document.getElementById("resultS").value = txt;
  }
