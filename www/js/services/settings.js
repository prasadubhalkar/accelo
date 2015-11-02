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

    return {
        geoOptions  : _getOptions(),
        earthRadius : _getRadius(),
        milSecToHr  : _getMiliToHr(),
        kmToMile    : _getKmToMi(),
    }
})();