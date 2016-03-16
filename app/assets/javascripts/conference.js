onBistriConferenceReady = function() {
  BistriConference.init( {
    appId: gon.bistri_app_id,
    appKey: gon.bistri_app_key
  });

  if (!BistriConference.isCompatible()) {
    alertify.error('Your browser does not support WebRTC. Please use a browser like Google Chrome or Opera');
    return;
  }

  var videoOn = false;
  var videoStream;

  $('.js-video-start').click(function() {
    var selfie = $(this);
    var text = selfie.find('.text').eq(0);

    if (videoOn) {
      BistriConference.signaling.addHandler('onQuittedRoom', function(room) {
        BistriConference.stopStream(videoStream, function() {
          BistriConference.detachStream(videoStream);
          text.text(selfie.data('text-on'));
          videoOn = false;
        });
      });
      BistriConference.endCalls(gon.room.slug);
      BistriConference.quitRoom(gon.room.slug);
    } else {
      BistriConference.signaling.addHandler('onConnected', function() {
        BistriConference.startStream('webcamSD', function(localStream) {
          BistriConference.attachStream(localStream, document.querySelector('#videos-list'));
          BistriConference.joinRoom(gon.room.slug);
          text.text(selfie.data('text-off'));
          videoOn = true;
          videoStream = localStream;
        });
      });
    }
  });

  BistriConference.connect();
}