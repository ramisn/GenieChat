angular.module('app.services').service('Message', function(Restangular) {

  var Message = {}

  Message.create = function(roomId, content) {
    return Restangular.one('rooms', roomId).all('messages').post({
      room_id: roomId,
      content: content
    });
  }

  Message.fetchAll = function(roomId) {
    return Restangular.one('rooms', roomId).all('messages').getList();
  }

  return Message;

});