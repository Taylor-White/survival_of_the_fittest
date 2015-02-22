/*
Organisms: list of Organisms
File owner: Xi
*/

/* represents the colony class */
function colony(pop){
	alert("Making a colony");

	this.organism_list = [];
	this.lifetime = 20;
	this.run = false;

	/* fill list of orgs */
	for (i=0; i<pop; i++){
		this.organism_list.push( new organism() );
	}

	/* method for when the simulation should step 
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

	/*	OBSERVABLE METHODS

	*/

}


