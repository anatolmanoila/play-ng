app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeController'
    })
    .when('/forecast', {
        templateUrl: '/views/forecast.html',
        controller: 'ForecastController'
    })
    .when('/forecast/:days', {
        templateUrl: '/views/forecast.html',
        controller: 'ForecastController'
    });
});