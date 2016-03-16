angular.module('app').classy.controller({
  name: 'NewInvitationController',

  inject: ['$scope', 'room', 'Invitation'],

  init: function() {
    this.$scope.invitation = {
      subject: 'GenieChat Invitation',
      message: _.template("Please click on the link below to join the chat room\n\n<%= url %>")(this.room)
    };
  },

  createInvitation: function() {
    var attrs = this.$scope.invitation;
    attrs.emails = _.pluck(attrs.emails, 'text');

    this.Invitation
        .create({invitation: attrs})
        .then(function(response) {
          alertify.success('Invitation sent');
          this.$scope.$dismiss();
        }.bind(this));
  }
});