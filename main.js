function main(){
	statsCtr = new statsController();
	orgCtr = new organismController();
	colCtr = new colonyController(orgCtr, statsCtr);
	// create orgcontroller
}