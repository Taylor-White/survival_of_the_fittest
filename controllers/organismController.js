/*
Organism: Organism
View: OrganismView 
File owner: Jared
*/

/* Constructor */
function organismController(org){
	alert("Making an orgCtr");
	this.org = org;
	this.x = x;

	this.y = y;
	this.aoeu = function myFunction(){
	    document.getElementById("demo").innerHTML = this.x + ", " + this.y;
	};
}

/*
OBSERVER FUNCTIONS
- receiveMessage(observable, msg): parses the message passed and decides how to handle it
*/

/* function for when user chooses random */
function userRandState()
{
	Organism.randomize();
}

/* function for when the user clicks on the canvas, records the coordinates */
function userClick(int x, int y)
{
	Organism.toggleCell(x,y);
}

/* function for when the user wants to clear the canvas */
function userClear()
{
	Organism.clear();
}

/* function for when the user wants to change the organism they are using */
function changeSelectedOrg(Organism org)
{
	this.Organism == org;
}

/* function for when the organism changes from alive or dead */
function stateChanged()
{
	matrix = State.getMatrix();
	OrganismView.updateOrgCanvas(matrix);
}
