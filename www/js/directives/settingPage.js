function settingPage() {
	return {
    	restrict: 'E',
    	templateUrl: 'templates/settings.html',
    	controller:settingsController,
    	controllerAs : 'sc',
    	link: function(scope, elem, attrs) {
    	}
  	};
}