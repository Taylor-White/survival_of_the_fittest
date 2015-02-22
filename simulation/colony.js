/*
Organisms: list of Organisms
File owner: Xi
*/

/* represents the colony class */
function colony(numOrgs){
	console.log("creating Colony");

	this.numOrgs = numOrgs;
	this.organism_list = [];
	this.lifetime = 20;
	this.run = false;

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
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}}


	/* STEPPING & RUNNING METHODS */

	/* 	method for when the simulation should step 
		all the organisms in the simulation one time */
	this.stepAll = function(){
		for( i=0; i<this.organism_list.length; i++){
			this.organism_list[i].step();
		}
	}

	/* method for when the simulation should continue to run out the simulation*/
	this.runAll = function(){
		this.run = true;
		while(this.run){
			this.stepEndAll();
		}
	}

	/* method for when the simulation should
	continue stepping untill the organisms have reached lifetime */
	this.stepEndAll = function(){
		this.run = true;
		for(i=0; i< lifeTime; i++){
			// step each organism
			for(i=0; i<this.organism_list.length; i++){
				this.organism_list[i].step();
			}
			if(this.run == false)
			{
				break		
			}
		}	
	}

	/* method for the simulation to pause */
	function pause(){
		this.run = false;
	}


	/* SETUP */
	/* fill list of orgs */
	for (var i=0; i<numOrgs; i++){
		var org = new organism();
		this.organism_list.push( org );
		// org.addObserver(this);
	}

}


