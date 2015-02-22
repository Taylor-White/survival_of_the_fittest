/*
View: Colony View
File owner: Taylor White
*/


/* function to highlight the selected organism to be displayed on canvas */

function colonyView(){
	console.log("creating Colony View");

	this.selectOrg = function(orgID){
		console.log("ORG " + orgID + " SELECTED");
		$( "btn-group").css('border', '3px solid red');
		$( "btn-group:nth-child("+ orgID + ")" ).css('border', '3px solid red');
	}
	this.deselectOrg = function(orgID){
		$( "btn-group").css('border', '');
		$( "btn-group:nth-child("+ orgID + ")" ).css('border', '');
	}
	$( "#rand" ).click(function(event){
		alert("BOO");
		console.log("rand clicked! Event Target: " + event.target);
	});
}