/*****************
Displays information about settings
*****************/


function settingsView(){
	console.log("creating Organism Stats View");

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
		console.log(this + " notifying that " + msg);
		var numObs = this.observers.length;
		for (var i=0; i<numObs; i++){
			this.observers[i].receiveMessage(this, msg);
		}};

	
	/* Setters */
	this.setBirthArrayVal = function(neighbs, bool){
		$("#life-settings #birth  #" + neighbs + " :checkbox").prop("checked", bool);	};
	this.setSustainArrayVal = function(neighbs, bool){
		$("#life-settings #sustain  #" + neighbs + " :checkbox").prop("checked", bool);};
	this.setWidthVal = function(val){
		$("#widthDisplay").text(val);
		$(".spawnWidth").slider( "option", "value", val);
	};
	this.setHeightVal = function(val){
		$("#heightDisplay").text(val);
		$(".spawnHeight").slider( "option", "value", val);		
	};
	this.setDensityVal = function(val){
		$("#densityDisplay").text(val);
		$(".spawnDensity").slider( "option", "value", val);		
	};	
	this.setSpawnCenterYVal = function(val){
		$("#spawnCenterYDisplay").text(val);
		$(".spawnCenterY").slider( "option", "value", val);		
	};	
	this.setSpawnCenterXVal = function(val){
		$("#spawnCenterXDisplay").text(val);
		$(".spawnCenterX").slider( "option", "value", val);			
	};	
	this.setLifetimeVal = function(val){
		$("#lifetimeDisplay").text(val);
		$(".lifetime").slider( "option", "value", val);
	};	
	this.setMutRateVal = function(val){
		$("#mutDisplay").text(val);
		$(".mutRate").slider( "option", "value", val);
	};	
	this.setFitnessBirthVal = function(val){
		$("#fitnessBirthDisplay").text(val);
		$(".fitnessBirth").slider( "option", "value", val);
	};	
	this.setFitnessDeathVal = function(val){
		$("#fitnessDeathDisplay").text(val);
		$(".fitnessDeath").slider( "option", "value", val);
	};		
	this.setFitnessExploredVal = function(val){
		$("#fitnessExploredDisplay").text(val);
		$(".fitnessExplore").slider( "option", "value", val);
	};						
	this.toString = function(){
		return "The Settings View";
	};

	this.prepAfterLoad = function(sv){
		/* Loop through checkboxes to add onclick handlers */
		for (var i = 0; i < 9; i++){
			var cb = $( "#life-settings #birth #" + i).children(":checkbox");
			cb.change(function(sv,i){
				return function(){
					sv.notifyObservers("UserToggleBirth" + i);
				};
			}(sv,i));

			cb = $( "#life-settings #sustain #" + i).children(":checkbox");
			cb.change(function(sv,i){
				return function(){
					sv.notifyObservers("UserToggleSustain" + i);
				};
			}(sv,i));
		}
		//Initialize sliders
        $(".spawnWidth").slider({step: 1}).slider("pips", {step: 10}).slider("float");
        $(".spawnHeight").slider({step: 1}).slider("pips", {step: 10}).slider("float");
		$(".spawnDensity").slider({step: 1}).slider("pips", {step: 10}).slider("float"); 
		$(".spawnCenterY").slider({step: 1}).slider("pips", {step: 10}).slider("float");
		$(".spawnCenterX").slider({step: 1}).slider("pips", {step: 10}).slider("float");		
		$(".lifetime").slider({step: 1, min: 0, max: 200}).slider("pips", {step: 10}).slider("float");
		$(".mutRate").slider({min:0, max: 100}).slider("pips", {step: 10}).slider("float");
		$(".fitnessBirth").slider({min:-20, max: 20, step: .5}).slider("pips", {step: 2}).slider("float");	
		$(".fitnessDeath").slider({min:-20, max: 20, step: .5}).slider("pips", {step: 2}).slider("float");
		$(".fitnessExplore").slider({min:-20, max: 20, step: .5}).slider("pips", {step: 2}).slider("float");


		$(".lifetime").change(function(sv, i){
			return function(){
				sv.notifyObservers("lifetime" + i);
			};
		});
		$("#slow").change(function(){
			sv.notifyObservers("UserSpeed4");
		});
		$("#medium").change(function(){
			sv.notifyObservers("UserSpeed8");
		});
		$("#fast").change(function(){
			sv.notifyObservers("UserSpeed100");
		});
		$( ".spawnWidth" ).on("slidestop", function(event, ui){
			// console.log("spawn width: " + $('.spawnWidth').val());
			sv.notifyObservers("spawnWidth" + ui.value);
		});
		$( ".spawnHeight" ).on("slidestop", function(event, ui){
			console.log("spawn height" + $('.spawnHeight').val());
			sv.notifyObservers("spawnHeight" + ui.value);
		});			
		$( ".spawnDensity" ).on("slidestop", function(event, ui){
			console.log("spawn density: " + $('.spawnDensity').val());
			sv.notifyObservers("spawnDensity" + ui.value);
		});		              
		$( ".spawnCenterX" ).on("slidestop", function(event, ui){
			console.log("spawn centerX: " + $('.spawnCenterX').val());
			sv.notifyObservers("spawnCenterX" + ui.value);
		});	
		$( ".spawnCenterY" ).on("slidestop", function(event, ui){
			console.log("spawn centerY: " + $('.spawnCenterY').val());
			sv.notifyObservers("spawnCenterY" + ui.value);
		});
		$( ".lifetime" ).on("slidestop", function(event, ui){
			console.log("lifetime: " + $('.lifetime').val());
			sv.notifyObservers("lifetime" + ui.value);
		});
			
		$( "#rand" ).click("slidestop", function(event, ui){
			sv.notifyObservers("UserRand");
		});		
		$( ".mutRate" ).on("slidestop", function(event, ui){
			// console.log("mutation rate: " + $('#mutRate').val());
			sv.notifyObservers("mutRate" + ui.value);
		});
			

		$( ".fitnessBirth" ).on("slidestop", function(event, ui){
			// console.log("fitness births" + $('#fitnessBirth').val());
			sv.notifyObservers("fitnessBirth" + ui.value);
		});

		$( ".fitnessDeath" ).on("slidestop", function(event, ui){
			// console.log("fitness deaths: " + $('#fitnessDeath').val());
			sv.notifyObservers("fitnessDeath" + ui.value);
		});	
	

		$( ".fitnessExplore" ).on("slidestop", function(event, ui){
			// console.log("fitness explore: " + $('#fitnessExplore').val());
			sv.notifyObservers("fitnessExplore" + ui.value);
		});
		
	};

	$(document).ready(this.prepAfterLoad(this));
}