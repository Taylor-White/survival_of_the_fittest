/*
View: canvas
File owner:
*/

var CANVAS_WIDTH = 600; //Width of Canvas
var CANVAS_HEIGHT = 600; //Height of Canvas

var ROWS = 50; //Number of cells in a row
var COLUMNS = 50; //Number of cells in a column

var COLOR_DEAD = "white"; //Color of dead cells, (0 on the matrix)
var COLOR_ALIVE = "black"; //Color of dead cells, (1 on the matrix)

var CELL_WIDTH = 10; //Pixel width of cell
var CELL_HEIGHT = 10; //Pixel height of cell

function organismView(){
	console.log("creating Organism View");

	/* function to update the organism on the canvas */
	this.update = function(callback, context, state){
		console.log("updating org view canvas");
		// console.log("state[0][0]: " + state[0][0]);

		var c = this.canvas;
		c.fillStyle = COLOR_ALIVE;
		c.lineWidth = 1;
		c.strokeStyle = COLOR_ALIVE;
		for (var row = 0; row < ROWS; row++) {
			for (var column = 0; column < COLUMNS; column++) {
				c.beginPath();
				var x = column * CELL_WIDTH;
				var y = row * CELL_HEIGHT;
				if(state[row][column] == 1){
					c.fillStyle = COLOR_ALIVE;
				} else{
					c.fillStyle = COLOR_DEAD;
				}
				c.rect(x, y, CELL_WIDTH, CELL_HEIGHT);
				c.fill();
				c.stroke();
				c.closePath();
			}
		}

		callback(context);
	}

	this.updateAge = function(age){
		$("#age").html("AGE: " + age);
	}

	/* Register OnClicks */

	this.prepAfterLoad = function(ov){
		ov.canvas = $("canvas")[0].getContext("2d");
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
	    var sust = document.forms[0];
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
