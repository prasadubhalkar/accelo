function settingsController($scope,$cordovaGeolocation,$cordovaNetwork,$state){
	var self 			= this;
		self.kmMode 	= false;
		self.saveMode	= true;
		self.walkMode	= false;
		self.avgMode	= true;

	self.changeKM = function() {
		console.log(self.kmMode);
	}

	self.changeSaveMode = function() {
		console.log(self.saveMode);
	}

	self.changeWalkMode = function(){
		console.log(self.walkMode);
	}

	self.changeAvgMode = function() {
		console.log(self.avgMode);	
	}

}