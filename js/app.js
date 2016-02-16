var app = angular.module( 'myApp', ['ngRoute', 'ngAnimate'] );

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

    var that = this;
    this.name = 'John Doe';

    this.nameLength = function() {
        return that.name.length;
    };

});

//==== CONTROLLERS
app.controller('NavController', ['$scope','$location',function($scope, $location) {
    $scope.isActive = function(route) {
        if ($location.path() === route) {
            return true;
        }
    };
}]);

app.controller('MainController', ['$scope', '$filter', '$http', '$log', 'nameService',function( $scope, $filter, $http, $log, nameService) {

    $scope.peopleArray = [
        {
            name: 'Jane Maxwell Doe',
            address: '555 Main St',
            city: 'New York',
            state: 'NY',
            zip: '211222'
        },
        {
            name: 'Frank Sinatra',
            address: '2311 Wall St',
            city: 'Miami',
            state: 'FL',
            zip: '564222'
        },
        {
            name: 'Jason Statham',
            address: '77 England St',
            city: 'London',
            state: 'UK',
            zip: '168822'
        }

    ];

    $scope.formattedAddress = function(person) {
        return person.address + ',' + person.city + ', ' + person.state;
    };


}]);

app.controller('SecondController', ['$scope', '$filter', '$http', '$log', '$routeParams', 'nameService', function( $scope, $filter, $http, $log, $routeParams, nameService) {

    $scope.name = nameService.name;
    $scope.num = $routeParams.num || 1;

    $scope.$watch('name', function() {
        nameService.name = $scope.name;
    });
}]);

//==== DIRECTIVES

app.directive('searchResult', function() {
    //it will return an obj; this object will be my directive
    return {
        templateUrl:'views/partials/search-result.html',
        replace: true,
        //now this becomes the model of the directive; not the model of the ctrl that the directive sits in the view of; so that you could use the directive on various pages because it has its model;
        scope: {
            herPerson: '=', //two-way binding meaning that if I alter this object via the directive its gonna be changed in the model as well
            formattedAddressFunction: '&' //it's a Fn
        },
        transclude: true // i want to do transclusion
    };
});




// link: function(scope, elements, attrs) {
//     console.log('Linking...');
//     if (scope.herPerson.name === 'Frank Sinatra') {
//         elements.removeAttr('class');
//     }
//     console.log(scope);
//     console.log(elements);
// }