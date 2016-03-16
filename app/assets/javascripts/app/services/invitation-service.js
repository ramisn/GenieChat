angular.module('app.services').service('Invitation', function(Restangular) {

  var Invitation = {};

  Invitation.create = function(attrs) {
    return Restangular.all('invitations').post(attrs);
  }

  return Invitation;

});