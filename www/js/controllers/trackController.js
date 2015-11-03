/**
 * [Call the geolocation service and display speed]
 * $scope               [Object]  Controller scope
 * $cordovaGeolocation  [Factory] Apache Cordova Factory Wrapper around navigator geolocation
 */
accelo.controller("trackController",function($scope,$cordovaGeolocation,$rootScope, $cordovaNetwork){
    $scope.count    = 0;        
    $scope.speed    = 0;        
    $scope.currDist = 0;        
    $scope.distance = 0;        
    $scope.inGreen  = false;    
    $scope.inYellow = false;    
    $scope.inRed    = false;    
    $scope.speeds   = [];
    $scope.watch    = {};
    $scope.path     = {};
    google.maps.event.addDomListener(window,'load',$scope.init);

    /**
     * [init function will initiate the map]
     * @return {[type]} [description]
     */
    $scope.init = function(){
        var latLng = new google.maps.LatLng(0,0);

        var mapOptions = {
            center : latLng,
            zoom : 16,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        $scope.map          = new google.maps.Map(document.getElementById("map"),mapOptions);

        $scope.path = new google.maps.Polyline({
            path : [],
            geodesic : true,
            strokeColor : '#0000FF',
            strokeOpacity : 1, 
            strokeWeight : 4
        });

        $scope.watchLocation();
    }

    /**
     * [watchLocation When the watch location is been clicked]
     * @return {[type]} [description]
     */
    $scope.watchLocation = function(){
        $scope.watch = $cordovaGeolocation.watchPosition(settings.geoOptions);
        $scope.watch.then(
            null,
            function(error) {
              alert(error.message);
            },
            $scope.updateLocation
        );
    }

    /**
     * [updateLocation is a callback for the watchlocation event]
     * @param  {[type]} result [latitude and longitude from navigator geolocation]
     * @return {[type]}        [description]
     */
    $scope.updateLocation = function(result){
        var arr = $scope.path.getPath(),
            pos = { 
                lat : result.coords.latitude, 
                lng : result.coords.longitude 
            };

        positions.setCords(result.coords.latitude,result.coords.longitude);
        
        arr.push(new google.maps.LatLng(pos.lat, pos.lng));

        $scope.count    += 1;
        $scope.map.setCenter(pos);

        if($scope.count == 1) {
            var image = {
                url: 'http://maps.google.com/mapfiles/kml/pal4/icon49.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(25, 35),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };

            $scope.marker   = new google.maps.Marker({
                position    : pos,
                icon        : image,
                draggable   : false,
                map         : $scope.map
            });    

        } else {
            path.setPath(arr);
            path.setMap($scope.map);
        }
        
        $scope.result   = calculator.calculate();
        $scope.speed    = $scope.result.speed;

        $scope.speeds.push($scope.speed);

        $scope.currDist += $scope.result.distance;
        $scope.distance = $scope.currDist.toFixed(2);

        $scope.updateSpeedDisplay($scope.speed)
    }

    /**
     * [updateSpeedDisplay will update the speed color]
     * @param  {[type]} speed [description]
     * @return {[type]}       [description]
     */
    $scope.updateSpeedDisplay = function(speed){
        if(speed < 40){
            $scope.inGreen = true;
            $scope.inYellow = false;
            $scope.inRed = false;
        } else if(speed > 50 && speed < 70) {
            $scope.inGreen = false;
            $scope.inYellow = true;
            $scope.inRed = false;
        } else if(speed > 70){
            $scope.inGreen = false;
            $scope.inYellow = false;
            $scope.inRed = true;
        }
    }

    /**
     * [stopWatching will clear the watch for the current geolocation watch]
     * @return {[type]} [description]
     */
    $scope.stopWatching = function(){
        try {
            $scope.watch.clearWatch();
            var length = $scope.speeds.length - 1,
                sum = 0, avg = 0;
            for (var i = length; i >= 0; i--) {
                sum += $scope.speeds[i];
            }
            
            if($scope.count > 0) {
                avg = sum / $scope.count;
            }
            alert(avg);    
        } catch(e){
            alert(e.message);
        }
        $scope.count = 0;
        $scope.distance = 0;
    }

    document.addEventListener("deviceready", function () {
        var isOnline = $cordovaNetwork.isOnline();

        if(isOnline) {
            $scope.init();    
        } else {
            alert("Device is offline");
        }
        
    },false);
});
