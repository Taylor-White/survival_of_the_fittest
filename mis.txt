/*
Module interface specifications
v0
*/

// organismView.js
Global variables:
	None

Functions:
	function update()
		Purpose:

	function handleClick(e)
		Purpose:


// colonyView.js
Global variables:
	None

Functions:
	function select(i)
		Purpose: to highlight the selected organism to be displayed on canvas


// colonyController.js

Global variables:
	var colony
		Purpose: How the hell is this working? Colony is acting like a class member in several functions, but its not 

Functions:
	function userSelectOrg(int orgID)
		Purpose: when the user chooses an organism

	function userStepAll()
		Purpose: for when the user chooses to step the stimulation

	function userRunAll()
		Purpose: for when the user wants to run the whole simulation out

	function UserStepEndAll()
		Purpose:

	function userPause()
		Purpose: when the user wants to pause the simulation
		

// organismController.js
Global variables:
	None

Functions:
	function userRandState()
		Purpose: when the user chooses random

	function userClick(int x, int y)
		Purpose: when the user clicks on the canvas, records the coordinates

	function userClear()
		Purpose: when the user wants to clear the canvas

	function changeSelectedOrg(Organism org)
		Purpose: when the user wants to change the organism displayed on the canvas

	function stateChanged()
		Purpose: when the organisms state changes from alive or dead


// colony.js

Global variables:
	None

Functions:
	function OrganismList()
		Purpose: create an empty list of organism objects

	function OrgamismList_add(orgamism_obj)
		Purpose: to add a new object to the organism list

	function stepAll()
		Purpose: 

	function runAll()
		Purpose: 

	function stepEndAll()
		Purpose: 

	function pausse()
		Purpose: 


// state.js

Global variables:
	None

Functions:
	function createMatrix(m, n, initial)
		Purpose: creates and returns a matrix filled with a passed in values, usually 0 

	function getMatrix()
		Purpose: to return the filled matrix

	function step()
		Purpose: 

	function CalcNeighbors(r, c)
		Purpose: 

	function randomize(numLive)
		Purpose: chooses random number of alive and dead cells

	function toggleCell(h, w)
		Purpose: switches the coordinates of the organism

	function clearState()
		Purpose: clears the organism s state