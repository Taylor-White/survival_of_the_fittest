function main(){
	settCtr = new settingsController();
	statsCtr = new statsController();
	orgCtr = new organismController();
	colCtr = new colonyController(orgCtr, statsCtr, settCtr);
	// create orgcontroller
}
