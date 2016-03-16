//==== DIRECTIVES
app.directive('dhxScheduler', function() {
    return {
        restrict: 'A',
        templateUrl: '../partials/dhxcalendar.tpl.html',
        scope: false, //no scope is created for the directive
        transclude: true,
        link: function(scope, element, attrs, controller) {
            //default state of the scheduler
            if (!scope.scheduler) {
                scope.scheduler = {};
            }
            scope.scheduler.mode = scope.scheduler.mode || "week";
            scope.scheduler.date = scope.scheduler.date || new Date();

            //watch data collection, reload on changes
              scope.$watch(attrs.data, function(collection){
                scheduler.clearAll();
                scheduler.load(collection, "json");
              }, true);

              //mode or date
              scope.$watch(function(){
                return scope.scheduler.mode + scope.scheduler.date.toString();
              }, function(nv, ov) {
                var mode = scheduler.getState();
                if (nv.date != mode.date || nv.mode != mode.mode)
                  scheduler.setCurrentView(scope.scheduler.date, scope.scheduler.mode);
              }, true);

              //size of scheduler
              scope.$watch(function() {
                return element[0].offsetWidth + "." + element[0].offsetHeight;
              }, function() {
                scheduler.setCurrentView();
              });

              //styling for dhtmlx scheduler
              element.addClass("dhx_cal_container");
              scheduler.config.xml_date="%Y-%m-%d %H:%i";


              //init scheduler
              scheduler.init(element[0], scope.scheduler.date, scope.scheduler.mode);
        }
    };
});

app.directive('dhxTemplate', ['$filter', function($filter){
  scheduler.aFilter = $filter;

  return {
    restrict: 'AE',
    terminal:true,

    link:function(scope, element, attrs, controller){
      element[0].style.display = 'none';

      var template = element[0].innerHTML;
      template = template.replace(/[\r\n]/g,"").replace(/"/g, "\\\"").replace(/\{\{event\.([^\}]+)\}\}/g, function(match, prop){
        if (prop.indexOf("|") != -1){
          var parts = prop.split("|");
          return "\"+scheduler.aFilter('"+(parts[1]).trim()+"')(event."+(parts[0]).trim()+")+\"";
        }
        return '"+event.'+prop+'+"';
      });
      var templateFunc = Function('sd','ed','event', 'return "'+template+'"');
      scheduler.templates[attrs.dhxTemplate] = templateFunc;
    }
  };
}]);

app.directive('myNgClick', function() {
  return function(scope, element, attributes) {
    element.on('click', function() {
      scope.$eval(attributes.myNgClick);
      //scope.$apply();
      console.log('Counter is ' + scope.counter);
    });
  };
});
//Carousel
app.directive('myBgImage', function() {
  return function(scope, element, attributes) {
    scope.$watch(attributes.myBgImage, function(newVal, oldVal) {
      element.css('background-image', 'url(' + newVal + ')');
    });
  };
});

app.directive('ngSwipeLeft', function() {
  return function(scope, element, attributes) {
    Hammer(element).on('swipeleft', function() {
      scope.$eval(attributes.ngSwipeLeft);
      scope.$apply();
    });
  };
});

app.directive('ngSwipeRight', function() {
  return function(scope, element, attributes) {
    Hammer(element).on('swiperight', function() {
      scope.$eval(attributes.ngSwipeRight);
      scope.$apply();
    });
  };
});

app.directive('toggleButton', function() {
  return function(scope, element, attributes) {
    //watch and update
    scope.$watch(attributes.toggleButton, function(v) {
      element.val(!v ? 'Disable' : 'Enable');
    });
    //event handler
    element.on('click', function() {
      scope[attributes.toggleButton] = !scope[attributes.toggleButton];
      scope.$apply(); //always call $apply when you deal with event handlers
    });
  };
});

app.directive('imageCarousel', function() {
  return {
    templateUrl: '../partials/imageCarousel.tpl.html',
    controller: 'CarouselController',
    restrict: 'E',
    scope: {
      images: '=', //refers to the html attribute that the scope variable images should be bound to.
      carouselTitle: '@',
      onChange: '&'
    }
  };
});

app.directive('ngGreetingA', function() {
  return {
    restrict: 'E',
    transclude: true, //pull any HTMl you put into the directive element (there in e.g template.html) into the directive's template below inside span.
    scope: {},
    template: 'Hi, my name is' + '<span ng-transclude></span>', //So pull whatever is there and put it into this directive's template;
    link: function(scope) {
      scope.lastName  = 'Manoila';
    }
  };
});

app.directive('ngGreetingB', function() {
  return {
    restrict: 'E',
    transclude: 'element', //pull any HTMl you put into the directive element (there in e.g template.html) into the directive's template below inside span.
    replace: true,
    scope: {},
    template: '<section><h1 ng-transclude></h1></section>', //So pull whatever is there and put it into this directive's template;
    link: function(scope) {
      scope.lastName  = 'Manoila';
    }
  };
});

app.directive('ngRepeatOnce', function() {
  return {
    restrict: 'A',
    transclude: 'element', //pull any HTMl you put into the directive element (there in e.g template.html) into the directive's template below inside span.
    replace: true,
    compile: function(originalEl, attributes, transcludeFn) {
      return function(scope, element, attributes) {
        var loop = attributes.ngRepeatOnce.split(' in ');
        var elementScopeName = loop[0]; //the name that I should assign each array element to like 'item in ' or 'person in persons'
        var arr = scope.$eval(loop[1]); //the array 'persons or items' to loop over

        for (var i = 0; i < arr.length; ++i) {
          var childScope = scope.$new(); //create a new childScope
          childScope['$index'] = i;
          childScope[elementScopeName] = arr[i];
          //transcludeFn is given us by the compile function: allows us to create new DOM elements with
          //corrected transcluded scopes.
          transcludeFn(childScope, function(clone) {
            originalEl.parent().append(clone);
          });
        }
      };
    }
  };
});
