/*****************
Displays information about saved simulations

Registers click handlers for 
internal save and load functions

*****************/



function saveloadView(){
	console.log("creating saveload View");

	/* TEMPORARILY initializing to 0
			decide best way later */
	var selected = 0;

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
		console.log(this + " notifying that " + msg);
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}};

	this.prepAfterLoad = function(slv){

		$( "#save" ).click(function(event){
			slv.notifyObservers("UserSave");
		});
		$( "#load" ).click(function(event){
			// alert("UserLoad" + slv.getSelected());
			slv.notifyObservers("UserLoad" + slv.getSelected());
		});	
		$( "#delete" ).click(function(event){
		//	slv.notifyObservers("UserLoad" + selected);
		});		
		slv.canvas = document.getElementById( "savedMatrix" ).getContext("2d");
	};
	this.updateSavedList = function(numSaved){
		console.log("numsaved: " + numSaved);
		savedSeedLinks.innerText = " ";
		if(numSaved === 0){
			savedSeedLinks.innerText = "No saved seeds";
		}else{

			for(var i=0; i<numSaved; i++){
				//Display saved seeds
				$( "#savedSeedLinks" ).append("<p><a href='#' id='"+i+"'>Saved" + [i] + "</a></p>");
				var savedSeedLink = $( "#savedSeedLinks #" + i);

				savedSeedLink.click(
					function(slv, i){
						return function(){
							slv.setSelected(i);
							// alert("UserSelectSaved" + slv.getSelected());
							slv.notifyObservers("UserSelectSaved" + i);
						};
					}(this, i));
			}
		}	
	};
	this.selectedSavedSeed = function(numseeds, current){
		for(var i=0; i<numseeds; i++){
			if(i == current){
				$( "#savedSeedLinks #" + current ).css("background-color", "yellow");
			}else{
				$( "#savedSeedLinks #" + i ).css("background-color", "white");
			}
		}
	};
	/* takes a printable string version of the matrix */
	this.updateSelectedSavedMatrix = function(matState){
		c = this.canvas;
		c.fillStyle = 'black';
		c.lineWidth = 1;
		c.strokeStyle = "#eee";
		for (var row = 0; row < 50; row++) {
			for (var column = 0; column < 50; column++) {
				c.beginPath();
				var x = column * 5;
				var y = row * 5;
				if(matState[row][column] == 1){
					c.fillStyle = COLOR_ALIVE;
				} else if(matState[row][column] == 2){
					c.fillStyle = COLOR_EXPLORED;
				}else{
					c.fillStyle = COLOR_DEAD;
				}				
				c.rect(x, y, 5, 5);
				c.fill();
				c.stroke();
				c.closePath();
			}
		}		
	};

	this.getSelected = function(){
		return selected;
	};


	this.setSelected = function(index){
		selected = index;
	};

	this.toString = function(){
		return "The Save/Load View";
	};

	
	$(document).ready(this.prepAfterLoad(this));
	this.updateSavedList(0);
}
