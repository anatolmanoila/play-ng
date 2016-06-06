//==== CONTROLLERS
app.controller('NavController', ['$scope','$location', '$routeParams', function($scope, $location, $routeParams ) {
    $scope.isActive = function(route) {
        var params = $routeParams.days;
        if ($location.path() === route || $location.path() === route + '/' + params) {
            return true;
        }
    };
}]);

app.controller('LanguagesController', ['$scope', '$location', function( $scope, $location) {
    $scope.languages = [
        { name: 'English', greeting: 'Hello' },
        { name: 'Spanish', greeting: 'Hola' },
        { name: 'Romanian', greeting: 'Salut'}
    ];

    $scope.greet = function(language, name) {
        return language.greeting + ' ' + language.name;
    };
}]);

app.controller('HelloController', ['$scope', '$location', function( $scope, $location) {

    $scope.username = '';

}]);