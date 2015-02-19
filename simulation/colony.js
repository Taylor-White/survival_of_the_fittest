/*
Organisms: list of Organisms
File owner: Xi
*/
boolean run = true;
int lifeTime = 20;
var organisms;


// create an empty list of organism objs
function OrganismList(){
  organisms = [];
}
 
// add new obj to the list
OrganismList.add = function( organism_obj ){
  return this.organisms.push( organism_obj );
};
 
// OrganismList.prototype.count = function(){
//   return this.OrganismList.length;
// };
 
// OrganismList.prototype.get = function( index ){
//   if( index > -1 && index < this.OrganismList.length ){
//     return this.OrganismList[ index ];
//   }
// };
 
// OrganismList.prototype.indexOf = function( obj, startIndex ){
//   var i = startIndex;
 
//   while( i < this.OrganismList.length ){
//     if( this.OrganismList[i] === obj ){
//       return i;
//     }
//     i++;
//   }
 
//   return -1;
// };
 
// OrganismList.prototype.removeAt = function( index ){
//   this.OrganismList.splice( index, 1 );
// };

/* function for when the simulation should step all the parts of the simulation*/
function stepAll()
{
	for( i=0; i<OrganismList.length; i++){
		OrganismList[i].step();
	}
}

/* function for when the simulation should continue to run out the simulation*/
function runAll()
{
	run = true;
	while(run){

		for(i=0; i<OrganismList.length; i++){
			OrganismList[i].step();
		}
	}

}

/* function for when the simulation should stop stepping the simulation*/
function stepEndAll()
{
	for(i=0; i< lifeTime; i++){
		for(i=0; i<OrganismList.length; i++){
			OrganismList[i].step();
		}
		if(run == false)
		{
			i = lifeTime;
			run = true;
		}
	}	
}

/* function for the simulation to pause */
function pause()
{
	run = false;
}