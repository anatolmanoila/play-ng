//==== DIRECTIVES
app.directive('weatherPanel', function() {
    return {
        restrict: 'E',
        templateUrl: '../views/partials/panel.html',
        replace: true,
        //to be safe, isolate the scope
        scope: {
            weatherObject: '=',
            convertToStandartFn: '&',
            convertToDateFn: '&',
            dateFormat: '@'
        }
    };
});