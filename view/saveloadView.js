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
			slv.notifyObservers("UserLoad" + selected);
		});	
		$( "#delete" ).click(function(event){
		//	slv.notifyObservers("UserLoad" + selected);
		});		
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
							slv.notifyObservers("UserSelectSaved" + i);
						};
					}(this, i));
			}
		}	
	};

	/* takes a printable string version of the matrix */
	this.updateSelectedSavedMatrix = function(matString){
		$( "#savedMatrix" ).html(matString);
	};

	this.toString = function(){
		return "The Save/Load View";
	};

	this.updateSavedList(0);
	$(document).ready(this.prepAfterLoad(this));
}
