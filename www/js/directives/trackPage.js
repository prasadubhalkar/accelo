function trackPage() {
	return {
    	restrict: 'E',
    	templateUrl: 'templates/track.html',
    	controller:trackController,
    	controllerAs : 'tc',
    	link: function(scope, elem, attrs) {
    		//initiatlizing google maps api on window load
			google.maps.event.addDomListener(window,'load',scope.tc.init);
    	}
  	};
}