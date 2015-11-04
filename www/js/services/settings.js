/**
 * [Global Service will hold constants]
 * @return {[object]} [settings,radius,milesToHr,kmToMile]
 */
var settings = (function(){
    var _gOpts  = { 
        timeout : 1000, 
        enableHighAccuracy : false
    },
    _eR     = 6378,
    _msToHr = 0.000277778,
    _kTom   = 0.62137;

    _getOptions = function(){
        return _gOpts;
    }

    _getRadius = function() {
        return _eR;
    }

    _getMiliToHr = function() {
        return _msToHr;
    }

    _getKmToMi = function(){
        return _kTom;
    }

    _startImage = function() {
        var image = {
            url: 'http://maps.google.com/mapfiles/kml/pal4/icon49.png',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new google.maps.Size(25, 35),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(0, 32)
        };

        return image;
    }

    return {
        geoOptions  : _getOptions(),
        earthRadius : _getRadius(),
        milSecToHr  : _getMiliToHr(),
        kmToMile    : _getKmToMi(),
        getImage    : _startImage()
    }
})();