angular.module('app').classy.controller({
  name: 'ChatRoomController',

  inject: ['$scope', '$timeout', '$modal', '$upload', 'Message', 'Room'],

  setupRoom: function() {
    this.$scope.messages = [];
    this.setupPusher().fetchMessages(false).fetchUploadedFiles();
  },

  setupPusher: function() {
    var roomName = gon.room.slug;

    // TODO: create a pusher service
    this.pusher = new Pusher(gon.pusher_key);
    this.channel = this.pusher.subscribe('presence-' + roomName);

    this.channel
        .bind('client-message', function(messageObject) {
          this.$scope.messages.push(messageObject);
          this.$scope.$apply();
          this.scrollToBottom().playSound();
        }.bind(this))
        .bind('pusher:subscription_succeeded', this.detectOnlineMembers.bind(this))
        .bind('pusher:member_added', this.detectOnlineMembers.bind(this))
        .bind('pusher:member_removed', this.detectOnlineMembers.bind(this))

    return this;
  },

  detectOnlineMembers: function() {
    var $scope = this.$scope;

    $scope.onlineMembersCount = this.channel.members.count;
    $scope.onlineMembers = this.channel.members.members;
    $scope.$apply();
  },

  postMessage: function() {
    this.Message
        .create(gon.room.id, this.$scope.message)
        .then(function(response) {
          this.$scope.messages.push(response);
          this.scrollToBottom();
          this.channel.trigger('client-message', response);
        }.bind(this));

    this.$scope.message = '';
  },

  fetchMessages: function(sound) {
    this.Message
        .fetchAll(gon.room.id)
        .then(function(response) {
          this.$scope.messages = angular.copy(response);
          if (sound) this.playSound();
          this.scrollToBottom();
        }.bind(this));

    return this;
  },

  fetchUploadedFiles: function() {
    this.Room.fetchUploadedFiles(gon.room.id).then(function(response) {
      this.$scope.files = angular.copy(response);
    }.bind(this));
  },

  scrollToBottom: function() {
    this.$timeout(function() {
      $.scrollTo(document.body.offsetHeight, 400);
    });
    return this;
  },

  playSound: function() {
    this.$scope.messageSound.play();
    return this;
  },

  showInvitationForm: function() {
    this.$modal.open({
      templateUrl: '/assets/app/templates/invitations/new.html',
      controller: 'NewInvitationController',
      resolve: {
        room: function() {
          return gon.room;
        }
      }
    });
  },

  onFileSelect: function(files) {
    var $upload = this.$upload;
    var $scope = this.$scope;

    _.each(files, function(f) {
      $scope.upload = $upload.upload({
        url: '/api/rooms/' + gon.room.id + '/upload',
        file: f
      })
      .success(function(data, status, headers, config) {
        alertify.success('File uploaded');
      })
      .error(function() {
        alertify.error('Oops, an error occured during file upload');
      });
    });
  }
});