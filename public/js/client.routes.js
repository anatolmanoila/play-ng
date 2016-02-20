app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeController'
    });
});