/*****************
Model for storing the list of saved seeds
*****************/
function saved(numOrgs){
	/* should use a seed ID? */
	var seeds = [];

	/* returns index seed was put in */
	this.addSeed = function(seed){
		// alert("saving seed \n" + seed);
		console.log("Saving Seed ");
		seeds.push(seed);
		return seeds.length;
	}
	/* should we use a seed id instead of index
			so we can remove later? */
	this.getSeed = function(index){
		return seeds[index];
	}
}
