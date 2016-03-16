angular.module('app.directives').directive('stickyOnScroll', function() {

  return {
    restrict: 'A',

    scope: {
      stickyOnScroll: '@'
    },

    link: function(scope, element, attrs) {
      var props = JSON.parse(scope.stickyOnScroll);
      element.sticky(_.extend(props, {getWidthFrom: element.parent()}));
    }
  }

});