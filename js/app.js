var app = angular.module( 'weatherApp', ['ngRoute', 'ngResource', 'ngAnimate'] );

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/views/main.html',
        controller: 'MainController'
    })
    .when('/second/', {
        templateUrl: '/views/second.html',
        controller: 'SecondController'
    })
    .when('/second/:num', {
        templateUrl: '/views/second.html',
        controller: 'SecondController'
    });
});

//==== SERVICES
app.service('nameService', function() {

});

//==== CONTROLLERS
app.controller('NavController', ['$scope','$location',function($scope, $location) {
    $scope.isActive = function(route) {
        if ($location.path() === route) {
            return true;
        }
    };
}]);

app.controller('MainController', ['$scope', '$filter', '$http', '$log', 'nameService',function( $scope, $filter, $http, $log) {

}]);

app.controller('SecondController', ['$scope', '$filter', '$http', '$log', '$routeParams', 'nameService', function( $scope, $filter, $http, $log, $routeParams) {

}]);

//==== DIRECTIVES
