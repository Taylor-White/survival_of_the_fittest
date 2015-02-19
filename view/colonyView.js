/*
View: Colony View
File owner: Taylor White
*/


/* function to highlight the selected organism to be displayed on canvas */
function select(i)
{
	$( "btn-group").css('border', '3px solid red');
	$( "btn-group:nth-child("i")").css('border', '3px solid red');
}