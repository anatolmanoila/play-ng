//==== CONTROLLERS
app.controller('NavController', ['$scope','$location', '$routeParams', function($scope, $location, $routeParams ) {
    'use strict';

    $scope.isActive = function(route) {
        var params = $routeParams.days;
        if ($location.path() === route || $location.path() === route + '/' + params) {
            return true;
        }
    };
}]);

app.controller('HomeController', ['$scope', '$location', function( $scope, $location) {
    'use strict';

    var start_hr = 1455980088000;
    var end_hr = 1455990888000;

    console.log(new Date(start_hr).getHours());
    console.log(new Date(end_hr).getHours());

    $scope.events = [
    {
        id:1,
        text:"Meeting: Intro",
        start_date: new Date(start_hr),
        end_date: new Date(end_hr)
    },
    {
        id:2,
        text:"Meeting: Business rules",
        start_date: new Date(2016, 2, 18 ),
        end_date: new Date(2016, 2, 18 )
    }
    ];

    $scope.scheduler = { date: new Date() };

}]);

