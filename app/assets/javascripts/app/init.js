angular
  .module('app', [
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'truncate',
    'classy',
    'restangular',
    'angularMoment',
    'chieffancypants.loadingBar',
    'ui.bootstrap',
    'mediaPlayer',
    'angularFileUpload',
    'pasvaz.bindonce',
    'app.directives',
    'app.services',
    'app.filters'
  ])
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  })
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setErrorInterceptor(function(error) {
      if (!error.data.message) {
        Messenger().post({
          message: 'Oops, looks like an error occured on our end. Sorry about that',
          type: 'error'
        });
        return false;
      }

      var msg = _.isArray(error.data.message) ? error.data.message.join('<br />') : error.data.message;

      alertify.error(msg);

      return false;
    });
  });

angular.module('app.directives', []);
angular.module('app.services', []);
angular.module('app.filters', []);