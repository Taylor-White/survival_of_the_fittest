/*
Organisms: list of Organisms
File owner: Xi
*/
boolean run = true;
int lifeTime = 20;
var organism_list;


// create an empty list of organism objs
function OrganismList(){
  organism_list = [];
}
 
// add new obj to the list
function OrganismList_add( organism_obj ){
  return this.organism_list.push( organism_obj );
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
	for( i=0; i<organism_list.length; i++){
		organism_list[i].step();
	}
}

/* function for when the simulation should continue to run out the simulation*/
function runAll()
{
	run = true;
	while(run){
		stepEndAll();
		// for(i=0; i<OrganismList.length; i++){
		// 	OrganismList[i].step();
		// }
	}
}

/* function for when the simulation should stop stepping the simulation*/
function stepEndAll()
{
	run = true;
	for(i=0; i< lifeTime; i++){
		for(i=0; i<organism_list.length; i++){
			organism_list[i].step();
		}
		if(run == false)
		{
			i = lifeTime;
		}
	}	
}

/* function for the simulation to pause */
function pause()
{
	run = false;
}