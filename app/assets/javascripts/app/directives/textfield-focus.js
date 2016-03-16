// Copied with modification from http://angulartutorial.blogspot.com/2014/04/angular-js-auto-focus-for-input-box.html
angular.module('app.directives').directive('textfieldFocus', function($timeout) {

  return {
    scope: {
      trigger : '@textfieldFocus'
    },

    link: function(scope, element) {
      scope.$watch('trigger', function(value) {

        if (value === "true") {
          $timeout(function() {
            element.focus();
          });
        }
      });
    }
  }
});
