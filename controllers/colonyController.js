/*
Colony: Colony
View: ColonyView 
File owner: Kat
*/

var colony;/*This may be totally unnecessary but it all depends on how we import files*/

/* function for when user chooses an organism*/
function userSelectOrg(int orgID)
{
	/*orgID = get orgModel*/
	organismController.changeOrg(orgID);
}

/* function for when the user chooses to step the simulation */
function userStepAll()
{
	colony.stepAll();
}

/* function for when the user wants to run the whole simulation out */
function userRunAll()
{
	colony.runAll();
}

/* function for when the user wants to stop the simulation from stepping */
function UserStepEndAll()
{
	colony.stepEndAll();
}

/* function for when the user wants to pause the simulation */
function userPause()
{
	colony.pause();
}
