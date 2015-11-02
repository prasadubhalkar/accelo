/**
 * [Speed and Distance Calculator]
 * @return {[function as object]} [calculate speed and distance]
 *  $scope.coords.pLat = 38.878048;
 *  $scope.coords.pLon = -94.662651;
 *  $scope.coords.cLat = 38.882108;
 *  $scope.coords.cLon = -94.665655;
 * 
 */
var calculator = (function(){
    compute = function() {
        var pCords = positions.hCords(),
            cCords = positions.cCords(),    
            pLat = 0,
            cLat = 0,
            dLat = 0,
            dLon = 0,
            a = 0,
            c = 0,
            dist = 0,
            speed = 0;

        if(pCords.latitude != 0 && pCords.longitude != 0) {
            pLat = toRad(pCords.latitude);
            cLat = toRad(cCords.latitude);

            dLat = toRad(cCords.latitude - pCords.latitude);
            dLon = toRad(cCords.longitude - pCords.longitude);

            a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(pLat) * Math.cos(cLat) *
                Math.sin(dLon/2) * Math.sin(dLon/2);

            c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            dist = settings.earthRadius * c;
            dist = dist * settings.kmToMile;

            speed = Math.ceil(dist / settings.milSecToHr);
        } 
        
        return {
            distance : dist,
            speed    : speed    
        }    
    }

    return {
        calculate : compute
    }
})();