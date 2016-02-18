//==== SERVICES
app.service('cityService', function() {
    this.city = 'New York, NY';
});

app.service('weatherService', ['$resource', function($resource) {
    this.getWeather = function(city, days) {
        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily/?q=Bucharest,us&appid=44db6a862fba0b067b1930da0d769e98",
                    {callback: 'JSON_CALLBACK'},
                    {get: { method: 'JSONP' }});

        return weatherAPI.get({ q: city, cnt: days });
    };
}]);