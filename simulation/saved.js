/*****************
Model for storing the list of saved seeds
*****************/
function saved(numOrgs){
	/* should use a seed ID? */
	var seeds = [];

	/* returns index seed was put in */
	this.addSeed = function(seed){
		// alert("saving seed \n" + seed);
		console.log("Saving Seed " + seed);
		var tempState = createMatrix(50,50,0);
		copyMatrix(tempState, seed);
		seeds.push(tempState);
		return seeds.length;
	};
	/* should we use a seed id instead of index
			so we can remove later? */
	this.getSeed = function(index){
		return seeds[index];
	};
	this.delSeed = function(index){
		/* TODO */
	};
	/* returns index seed was put in */
	this.numSeeds = function(){
		return seeds.length;
	};
}
