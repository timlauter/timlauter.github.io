angular.module('forecastCtrl', ['weatherService'])
.controller('forecastController', ["$http", "$scope", "Weather", function($http, $scope, Weather) {

    /************************************************
         gets executed onload and on submission
    /************************************************/
    $scope.initialize = function(defaultLocation) {

        var preloader = document.getElementById('preloader');
        var degree = document.getElementById('temp');

        Weather.init(defaultLocation)
            .success(function(data) {

                // remove preloader
                preloader.style.display = 'none';

                if (data.query.results === null) {
                    $scope.error = 'Bummer, we don\'t know where that is. Sounds great though.';
                    $scope.location = undefined;
                    $scope.temp = undefined;
                    $scope.description = undefined;
                    $scope.message = undefined;
                    degree.style.visibility = 'hidden';

                } else {
                    var city = data.query.results.channel.location.city;
                    var region = ', ' + data.query.results.channel.location.region;
                    $scope.location = city + region;
                    $scope.temp = data.query.results.channel.item.condition.temp;
                    $scope.description = data.query.results.channel.item.condition.text;
                    $scope.error = undefined;
                    message($scope.temp);
                    degree.style.visibility = 'visible';
                }

            })
            .error(function(data) {
                preloader.style.display = 'none';
                $scope.error = 'Ahh shoot, we are encountering some technical difficulties.';
            });
    };

    function displayDefault(location) {
        $scope.initialize(location);
    }

    function message(temp) {
        parseInt(temp);
        if (temp <= 50) { $scope.message = 'Save\'em for another day.'; }
        if (temp > 50 && temp <= 60) { $scope.message = 'It\'s still a bit cold'; }
        if (temp > 60 && temp <= 70) { $scope.message = 'Nice and temperate, your call.'; }
        if (temp > 70 && temp <= 80) { $scope.message = 'It\'s warm, you know what to do.'; }
        if (temp > 80 && temp <= 90) { $scope.message = 'It\'s perfect. Get those jhorts.'; }
        if (temp > 90 && temp <= 100) { $scope.message = 'Jhorts? It\'s bathing suit weather.'; }
        if (temp >= 100) { $scope.message = 'Get the jhorts and the tank'; }

    }

    /********************************
     *    get current position      *
    /********************************/
    function decodeLatLng(pos) {
        var crd = pos.coords;
        var geocoder = new google.maps.Geocoder();
        var lat = crd.latitude;
        var lng = crd.longitude;
        var latlng = new google.maps.LatLng(lat, lng);
        if (geocoder) {
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        currentLocation = results[1].address_components[1].long_name + ', ' + results[1].address_components[2].short_name;
                        displayDefault(currentLocation);
                    } else {
                        alert("No results found");
                    }
                } else {
                    alert("Our geolocation failed due to: " + status);
                }
            });
        }
    }

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function error(err) {
        preloader.style.display = 'none';
        $scope.error = "Ahh shoot, we couldn\'t find you. Try entering your location.";
        $scope.$apply();
    }

    navigator.geolocation.getCurrentPosition(decodeLatLng, error, options);
}]);
