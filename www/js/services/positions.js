/**
 * [Keeps the previous and current coordinates]
 * @return {[object]} [previous latitude longitude, current latitude longitude]
 */
var positions = (function(){
    var _pLon = 0,_pLat = 0,
        _cLon = 0,_cLat = 0;

    _cLatLon = function(Lat, Lon){
        _pLatLon(_cLat,_cLon);
        _cLat = Lat;
        _cLon = Lon;
    }

    _pLatLon = function(Lat, Lon){
        _pLat = Lat;
        _pLon = Lon;
    }

    _gCurrentCords = function(){
        return {
            latitude : _cLat,
            longitude : _cLon
        }
    }

    _gHistoryCords = function() {
        return {
            latitude : _pLat,
            longitude : _pLon   
        }
    }   

    return {
        setCords : _cLatLon,
        cCords   : _gCurrentCords,
        hCords   : _gHistoryCords
    }
})();