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

app.controller('HomeController', ['$scope', '$http', function( $scope, $http) {
    'use strict';

    $scope.testMsg = 'Works from Ctrl!';
    var self = this;
    var start_hr = 1455980088000;
    var end_hr = 1455990888000;

    //with promises I get back an object
    //that I can call methods on
    //to give it diferent functions based on success/failure
    $http.get('http://localhost:3000/api/bookings')
    .success(function(bookings) {
        //$scope.bookings = bookings;
        //console.log($scope.bookings);
    })
    .error(function(err) {
      console.log('Look, an err happend. Promise not resolved. ');
    });

    $scope.addBooking = function() {
        if ($scope.bookingText) {
            $http.post('/api/bookings', {
                text: $scope.bookingText,
                start_date: new Date(2016, 1, 21),
                end_date: new Date(2016, 1, 21)
            });
        }
    };

    console.log(new Date(start_hr).getHours());
    console.log(new Date(end_hr).getHours());

    $scope.bookings = [
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
    //console.log($scope.bookings);
    $scope.scheduler = { date: new Date() };

}]);

app.controller('TestDemosController', ['$scope', function( $scope) {
    'use strict';
    $scope.pageTitle = 'Test demos';

}]);


//=================Admin Ctrls===================
app.controller('AdminLoginController', ['$scope', '$location', '$cookies', 'AuthService', '$log', function($scope, $location, $cookies, AuthService, $log) {
    'use strict';

    $scope.credentials = {
        username: '',
        password: ''
    };

    $scope.login = function(credentials) {
        AuthService.login(credentials)
        .then(function(res, err) {
            $cookies.loggedInUser = res.data;
            $location.path('/admin/bookings');
        }, function(err) {
            $log.error(err);
        });
    };
}]);

app.controller('AdminBookingsController', ['$scope', '$log', 'bookingsFactory', function( $scope, $log, bookingsFactory) {
    'use strict';
    bookingsFactory.getBookings()
        .then(function(res) {
            $scope.allBookings = res.data;
        }, function(err) {
            $log.error(err);
    });

    $scope.deleteBooking = function(id) {
        bookingsFactory.deleteBooking(id);
    };
}]);

app.controller('AddEditBookingController', ['$scope', function($scope) {
    'use strict';


}]);

//=================Various Test Demos Ctrls ===================
app.controller('CarouselController', ['$scope', function( $scope) {
    'use strict';

    $scope.images = [
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/b/b1/Meanstack-624x250.jpg",
        "https://upload.wikimedia.org/wikipedia/en/9/9e/JQuery_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/7/76/Jaguar_Logo_Text.png"
    ];

    $scope.currentIndex = 0;
    $scope.next = function() {
        $scope.currentIndex = ($scope.currentIndex + 1) % $scope.images.length;
    };

    $scope.previous = function() {
        $scope.currentIndex = $scope.currentIndex == 0 ? $scope.images.length - 1 : $scope.currentIndex - 1;
    };

}]);