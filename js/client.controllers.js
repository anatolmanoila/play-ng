//==== CONTROLLERS
app.controller('NavController', ['$scope','$location', '$routeParams', function($scope, $location, $routeParams ) {
    $scope.isActive = function(route) {
        var params = $routeParams.days;
        if ($location.path() === route || $location.path() === route + '/' + params) {
            return true;
        }
    };
}]);

app.controller('HomeController', ['$scope', '$location', 'cityService', function( $scope, $location, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });

    $scope.submit = function() {
        $location.path("/forecast");
    };

}]);

app.controller('ForecastController', ['$scope', '$routeParams','cityService', 'weatherService', function( $scope, $routeParams, cityService, weatherService) {
    $scope.city = cityService.city;

    $scope.days = $routeParams.days || '2';

    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);

    $scope.convertToCelsius = function(degK) {
        return Math.round(degK - 273);
    };

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    };
}]);