function settingsController($scope,$cordovaGeolocation,$cordovaNetwork,$state){
	var self = this;

	self.swipeRight = function() {
		$state.go("home")
	}
}