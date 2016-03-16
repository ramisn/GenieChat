angular.module('app').classy.controller({
  name: 'RoomsController',

  inject: ['$scope', '$rootScope', '$modal', 'Room'],

  init: function() {
    this.fetchRooms();
    this.$rootScope.$on('room:created', this.fetchRooms.bind(this));
  },

  showRoomForm: function() {
    this.$modal.open({
      templateUrl: '/assets/app/templates/rooms/new.html',
      controller: 'NewRoomController'
    });
  },

  fetchRooms: function() {
    var $scope = this.$scope;

    this.Room.fetchAll().then(function(response) {
      $scope.rooms = angular.copy(response);
    });
  },

  confirmDelete: function(room) {
    alertify.confirm('Are you sure?', function(e) {
      if (e) {
        this.Room.destroy(room.id).then(function(response) {
          alertify.log('Room deleted');
          this.fetchRooms();
        }.bind(this));
      }
    }.bind(this));
  },

  showInvitationForm: function(room) {
    // TODO: make this a shared function between this controller and the chat room controller
    this.$modal.open({
      templateUrl: '/assets/app/templates/invitations/new.html',
      controller: 'NewInvitationController',
      resolve: {
        room: function() {
          return room;
        }
      }
    });
  }
});

angular.module('app').classy.controller({
  name: 'NewRoomController',

  inject: ['$scope', '$rootScope', 'Room'],

  init: function() {
    this.$scope.room = {};
  },

  createRoom: function() {
    var $scope = this.$scope;
    var $rootScope = this.$rootScope;

    this.Room.create(this.$scope.room).then(function(response) {
      alertify.success('Room created');
      $rootScope.$emit('room:created', response);
      $scope.$dismiss();
    });
  }
});