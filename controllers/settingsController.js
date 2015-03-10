/*****************
Sends information to the settings file
*****************/

function settingsController(){
	console.log("Creating Settings Controller");


	/* DECLARATIONS */
	this.settingsView = new settingsView();
	this.settingsView.addObserver(this);

	/*	OBSERVABLE METHODS */
	this.observers = [];
	this.addObserver = function(observer){
		this.observers.push(observer);	};
	this.removeObserver = function(observer){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			if (this.observers[i] === observer){
				this.observers.splice(i,1);	}}};
	this.notifyObservers = function(msg){
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}};

	/*	OBSERVER METHODS */
	/* parses the message passed and decides how to handle it */
	this.receiveMessage = function(observable, msg){
		// console.log("SettCtr received "+ msg + " from " + observable);
		// alert("SettCtr received "+ msg + " from " + observable);
		if (msg.substring(0,15) == "UserToggleBirth"){
			var birthVal = parseInt(msg.substring(15,msg.length));
			this.settings.toggleBirthArrayVal(birthVal);
			this.updateSettingsView();
			// this.orgStateChanged(observable.orgID);
		} else if (msg.substring(0,17) == "UserToggleSustain"){
			var susVal = parseInt(msg.substring(17,msg.length));
			this.settings.toggleSustainArrayVal(susVal);
			this.updateSettingsView();
			// this.orgStateChanged(observable.orgID);
		} else if (msg.substring(0,9) == "UserSpeed"){
			var speedVal = parseInt(msg.substring(9,msg.length));
			this.settings.setSpeed(speedVal);
			this.updateSettingsView();
		} 
	};

	/* Setter */
	this.setSettings = function(settings){
		this.settings = settings;
		this.updateSettingsView();
	};

	this.updateSettingsView = function(){
		// console.log(" --- Updating Settings View --- ")
		var ba = this.settings.getBirthArray();
		var sa = this.settings.getSustainArray();
		var len = ba.length;
		for (var i = 0; i < len; i++){
			this.settingsView.setBirthArrayVal(i, ba[i]==1);
			this.settingsView.setSustainArrayVal(i, sa[i]==1);
		}
	};
}