//==== SERVICES
'use strict';

app.factory('AuthService', ['$http', function($http) {
  return {
    login: function(credentials) {
      return $http.post('/api/login', credentials);
    },
    logout: function() {
      return $http.get('/api/logout');
    }
  };
}]);
app.factory('bookingsFactory', ['$http', function($http) {
    return {
        getBookings: function() {
            return $http.get('/api/bookings');
        },
        saveBooking: function(pageData) {
            var id = pageData._id;

            if(id === 0) {
                return $http.post('/api/bookings/add', pageData);
            } else {
                return $http.post('/api/bookings/update', pageData);
            }
        },
        deleteBooking: function(id) {
            return $http.get('/api/bookings/delete/' + id);
        },
        getAdminBookingContent: function(id) {
            return $http.get('/api/bookings/admin-details/' + id);
        },
        getBookingContent: function(url) {
            return $http.get('/api/bookings/details/' + url);
        }
    };
}]);