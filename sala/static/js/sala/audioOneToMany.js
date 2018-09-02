var clik = false;

document.getElementById('join-room').onclick = function() {
 if(!clik){
   if(salas.length > 1){
    joinBroadcastLooper($("#select_salas_id").val());
   }
   $("#list-host").show();
   $("#div_select_id").hide();
   clik = !clik;
 }else{
   location.reload();
 }
};

function beforeJoiningARoom(callback) {
    connection.extra.broadcaster = false;
    connection.dontCaptureUserMedia = true;
    connection.session.oneway = true;
    callback();
}

var connection = new RTCMultiConnection();

connection.socketURL = 'https://sputnikcv.ddns.net/';
connection.socketMessageEvent = 'multi-broadcasters-demo';
connection.userid = nome + " " + sobrenome;



connection.session = {
    audio: true,
    video: false,
    broadcast: true
};

connection.mediaConstraints = {
    audio: true,
    video: false,
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: false
};


    connection.preferSCTP = false;


var countConnect = 0;
connection.audiosContainer = document.getElementById('audios-container');
connection.onstream = function(event) {
    var width = parseInt(connection.audiosContainer.clientWidth / 2) - 20;
    var mediaElement = getHTMLMediaElement(event.mediaElement, {
        title: event.userid,
    });

    connection.audiosContainer.appendChild(mediaElement);
    countConnect += 1;
    if(countConnect >  0){
      $("#icon-cloud").html("cloud_queue");
      $("#join-room").removeClass("red");
      $("#join-room").addClass("green pulse");

      $("#div_nav_id").removeClass("red");
      $("#div_nav_id").addClass("green");


      $("#status-cliente").html("OnLine");
      $("#status-cliente").removeClass("red-text text-darken-2");
      $("#status-cliente").addClass("green-text text-darken-2");
    }

    setTimeout(function() {
        mediaElement.media.play();
    }, 5000);

    mediaElement.id = event.streamid;

    connection.preferSCTP = false;

};

connection.onstreamended = function(event) {
    var mediaElement = document.getElementById(event.streamid);
    if (mediaElement) {
        mediaElement.parentNode.removeChild(mediaElement);
        countConnect -= 1;
        if(countConnect < 1){
          location.reload();

         $("#status-cliente").html("OffLine");
         $("#status-cliente").removeClass("green-text text-darken-2");
         $("#status-cliente").addClass("red-text text-darken-2");
       }
    }
};

function joinBroadcastLooper(roomid) {

    (function reCheckRoomPresence() {
        connection.checkPresence(roomid, function(isRoomExist) {
            if (isRoomExist) {
                beforeJoiningARoom(function() {
                    connection.join(roomid, function() {
                    });
                });
                return;
            }
            setTimeout(reCheckRoomPresence, 5);
        });
    })();

}

var clik = false;
$(function() {
    if(salas.length == 1){
      joinBroadcastLooper(salas[0]);
      $("#list-host").show();
      clik = !clik;
    }
})
