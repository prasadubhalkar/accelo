/**
 * [Call the geolocation service and display speed]
 * $scope               [Object]  Controller scope
 * $cordovaGeolocation  [Factory] Apache Cordova Factory Wrapper around navigator geolocation
 */
function trackController($scope,$cordovaGeolocation,$cordovaNetwork,$state){
    var self          = this;
        self.count    = 0;        
        self.speed    = 0;        
        self.currDist = 0;        
        self.distance = 0;        
        self.speeds   = [];
        self.watch    = {};
        self.path     = {};
        self.arr      = [];

    /**
     * [init function will initiate the map]
     * @return {[type]} [description]
     */
    self.init = function(){
        var latLng = new google.maps.LatLng(0,0);
        var mapOptions = {
            center      : latLng,
            zoom        : 16,
            mapTypeId   : google.maps.MapTypeId.ROADMAP
        };

        self.state = true;
        self.map          = new google.maps.Map(document.getElementById("map"),mapOptions);

        self.path = new google.maps.Polyline({
            path : [],
            geodesic : true,
            strokeColor : '#0000FF',
            strokeOpacity : 1, 
            strokeWeight : 4
        });

        self.watchLocation();    
    }

    /**
     * [updateLocation is a callback for the watchlocation event]
     * @param  {[type]} result [latitude and longitude from navigator geolocation]
     * @return {[type]}        [description]
     */
    self.updateLocation = function(result){
        //get current lats and lngs from the polyline
        self.arr = self.path.getPath();

        //set current position from the navigation geolocation result
        //set the current position in our service
        //add positions in the polyline temp array
        self.curPos = { 
            lat : result.coords.latitude, 
            lng : result.coords.longitude 
        };
        positions.setCords(result.coords.latitude,result.coords.longitude);
        self.arr.push(new google.maps.LatLng(self.curPos.lat, self.curPos.lng));

        //set current position as center of map as it is the last known position 
        self.map.setCenter(self.curPos);
        
        //calculate the result speed, distance using calculator service
        //update speed and add to array of speeds
        self.result   = calculator.calculate();
        self.speed  = self.result.speed;
        self.speeds.push(self.speed);

        //update distance and format display
        self.currDist += self.result.distance;
        self.distance = self.currDist.toFixed(2);

        self.count    += 1;
    }

    /**
     * [updateSpeedDisplay will update the speed color]
     * @param  {[type]} speed [description]
     * @return {[type]}       [description]
     */
    self.updateSpeedDisplay = function(){
        if(self.count == 1) {
            self.marker   = new google.maps.Marker({
                position    : self.curPos,
                icon        : settings.getImage,
                draggable   : false,
                map         : self.map
            });    

        } else {
            self.path.setPath(self.arr);
            self.path.setMap(self.map);
        }

        $scope.speed    = self.speed;
        $scope.count    = self.count;
        $scope.distance = self.distance;
    }

    /**
     * [stopWatching will clear the watch for the current geolocation watch]
     * @return {[type]} [description]
     */
    self.stopWatching = function(){
        try {
            self.watch.clearWatch();
            var length = self.speeds.length - 1,
                sum = 0, avg = 0;
            for (var i = length; i >= 0; i--) {
                sum += self.speeds[i];
            }
            
            if(self.count > 0) {
                avg = sum / self.count;
            }
            alert(avg);    
        } catch(e){
            alert(e.message);
        }
        self.count = 0;
        self.distance = 0;
    }

    /**
     * [watchLocation When the watch location is been clicked]
     * @return {[type]} [description]
     */
    self.watchLocation = function(){
        self.watch = $cordovaGeolocation.watchPosition(settings.geoOptions);
        self.watch.then(
            null,
            function(error) {
              alert(error.message);
            },
            self.updateLocation
        );
    }

    self.swipeLeft = function(){
        $state.go("settings")
    }

    //watch for every update count and trigger update scope
    $scope.$watch(angular.bind(self,function(){
        return self.count;
    }),self.updateSpeedDisplay);

    //self.init(); //need this if developing using ionic serve

    //checking if the mobile device is ready
    document.addEventListener("deviceready", function () {
        var isOnline = $cordovaNetwork.isOnline();

        //is device online 
        if(isOnline) {
            self.init();    
        } else {
            alert("Device is offline");
        }
        
    },false);
}