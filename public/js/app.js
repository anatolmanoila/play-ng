'use strict';

var app = angular.module( 'schedulerApp', ['ngRoute', 'ngResource', 'ngAnimate', 'ngCookies', 'hmTouchEvents'] );
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
    })
    .when('/about', {
        templateUrl: 'partials/testdemos.html',
        controller: 'TestDemosController'
    })
    .when('/admin/login', {
        templateUrl: 'partials/admin/login.html',
        controller: 'AdminLoginController'
    })
    .when('/admin/bookings', {
        templateUrl: 'partials/admin/bookings.html',
        controller: 'AdminBookingsController'
    })
    .when('/admin/add-edit-booking/:id', {
        templateUrl: 'partials/admin/add-edit-booking.html',
        controller: 'AddEditBookingController'
    })
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
}]);