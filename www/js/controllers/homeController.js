function homeController($scope,$cordovaGeolocation,$cordovaNetwork,$state){
	var self = this;
		self.showTrack = true;
		self.showSettings = false;
		self.header = "Home";

	self.swipeLeft = function(){
		self.showTrack = false;
		self.showSettings = true;		
		self.header = "Settings";
	}

	self.swipeRight = function(){
		self.showTrack = true;
		self.showSettings = false;
		self.header = "Home";
	}
}