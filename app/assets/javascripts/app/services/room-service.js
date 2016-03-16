angular.module('app.services').service('Room', function(Restangular) {

  var Room = function() {}

  Room.createInstance = function() {
    return new Room;
  }

  Room.create = function(attrs) {
    return Restangular.all('rooms').post(attrs);
  }

  Room.fetchAll = function() {
    return Restangular.all('rooms').getList();
  }

  Room.fetchUploadedFiles = function(id) {
    return Restangular.one('rooms', id).all('attachments').getList();
  }

  Room.destroy = function(id) {
    return Restangular.one('rooms', id).remove();
  }

  return Room;

});