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
		} else if (msg.substring(0,10) == "spawnWidth"){
			var sWidth = parseInt(msg.substring(10, msg.length));
			// console.log("spawnWidth: " + sWidth)
			this.settings.setSpawnWidth(sWidth);
		} else if (msg.substring(0,11) == "spawnHeight"){
			var sHeight = parseInt(msg.substring(11, msg.length));
			// console.log("spawnHeight: " + sHeight)
			this.settings.setSpawnHeight(sHeight);
		} else if (msg.substring(0,12) == "spawnDensity"){
			var sDensity = parseInt(msg.substring(12, msg.length));
			// console.log("spawnDensity: " + sDensity)
			this.settings.setSpawnDensity(sDensity);
		} else if (msg.substring(0,12) == "spawnCenterX"){
			var sCenterX = parseInt(msg.substring(12, msg.length));
			// console.log("spawnCenterX: " + sCenterX)
			this.settings.setSpawnCenterX(sCenterX);
		} else if (msg.substring(0,12) == "spawnCenterY"){
			var sCenterY = parseInt(msg.substring(12, msg.length));
			// console.log("spawnCenterY: " + sCenterY)
			this.settings.setSpawnCenterY(sCenterY);
		} else if (msg.substring(0,8) == "lifetime"){
			var sLifetime = parseInt(msg.substring(8, msg.length));
			 //console.log("Lifetime: " + sLifetime);
			this.settings.setLifetime(sLifetime);
		} else if (msg.substring(0,12) == "mutRate"){
			var sMutation = parseInt(msg.substring(7, msg.length));
			// console.log("mutRate: " + sMutation)
			this.settings.setMutRate(sMutation);
		} else if (msg.substring(0,12) == "fitnessBirth"){
			var sFitBirth = parseInt(msg.substring(12, msg.length));
			// console.log("fitnessBirth: " + sCenterX)
			this.settings.setFitBirth(sFitBirth);
		} else if (msg.substring(0,12) == "fitnessDeath"){
			var sFitDeath = parseInt(msg.substring(12, msg.length));
			// console.log("fitnessDeath: " + sFitDeath)
			this.settings.setFitDeath(sFitDeath);
		} else if (msg.substring(0,8) == "fitnessExplore"){
			var sFitExplore = parseInt(msg.substring(14, msg.length));
			 //console.log("fitnessExplore: " + sFitExplore);
			this.settings.setFitExplore(sFitExplore);
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