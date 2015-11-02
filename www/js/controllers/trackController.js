/**
 * [Call the geolocation service and display speed]
 * $scope               [Object]  Controller scope
 * $cordovaGeolocation  [Factory] Apache Cordova Factory Wrapper around navigator geolocation
 */
accelo.controller("trackController",function($scope,$cordovaGeolocation){
    $scope.count    = 0;
    $scope.speed    = 0;
    $scope.distance = 0;
    $scope.inGreen  = false;
    $scope.inYellow = false;
    $scope.inRed    = false;
    $scope.pos      = [];    
    $scope.speeds   = [];
    $scope.watch    = {};
    google.maps.event.addDomListener(window,'load',$scope.init);

    $scope.init = function(){
        var latLng = new google.maps.LatLng(0,0);
        var mapOptions = {
            center : latLng,
            zoom : 16,
            mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        $scope.map          = new google.maps.Map(document.getElementById("map"),mapOptions);
        $scope.infoWindow   = new google.maps.InfoWindow({map:$scope.map});
        $scope.watchLocation();
    }

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

    $scope.updateLocation = function(result){
        $scope.count    += 1;

        positions.setCords(result.coords.latitude,result.coords.longitude);
        
        var pos = {
            lat : result.coords.latitude,
            lng : result.coords.longitude
        };

        $scope.pos.push(pos);

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
            var path = new google.maps.Polyline({
                path : $scope.pos,
                geodesic : true,
                strokeColor : '#0000FF',
                strokeOpacity : 1, 
                strokeWeight : 4
            });

            path.setMap($scope.map);
        }
        
        $scope.result   = calculator.calculate();
        $scope.speed    = $scope.result.speed;

        $scope.speeds.push($scope.speed);

        $scope.distance += $scope.result.distance;
        $scope.distance = Math.round($scope.distance);

        if($scope.speed < 40){
            $scope.inGreen = true;
            $scope.inYellow = false;
            $scope.inRed = false;
        } else if($scope.speed > 40 && $scope.speed < 70) {
            $scope.inGreen = false;
            $scope.inYellow = true;
            $scope.inRed = false;
        } else if($scope.speed > 70){
            $scope.inGreen = false;
            $scope.inYellow = false;
            $scope.inRed = true;
        }
    }

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

    $scope.init();
});
