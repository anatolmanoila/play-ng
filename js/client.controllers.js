//==== CONTROLLERS
app.controller('NavController', ['$scope','$location', '$routeParams', function($scope, $location, $routeParams ) {
    $scope.isActive = function(route) {
        var params = $routeParams.days;
        if ($location.path() === route || $location.path() === route + '/' + params) {
            return true;
        }
    };
}]);

app.controller('MainController', ['$scope', function( $scope ) {

}]);