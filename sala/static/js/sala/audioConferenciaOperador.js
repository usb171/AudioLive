
var connection = new RTCMultiConnection();
connection.socketURL = 'https://sputnikcv.ddns.net/';


$("#abrir_sala").click( function() {
    desativarComponentes();
    var tipoConexao = $("#select_conexao_id").val()
    var nomeSala = $('#sala_id').val()

    if(tipoConexao == "REPORTER"){
        initOneToMany();
        connection.openOrJoin(nomeSala)

    }else if(tipoConexao == "CINEGRAFISTA"){
        initManyToMany();
        connection.open(nomeSala);
    }

});


function initManyToMany(){

    connection.socketMessageEvent = 'ManyToMany';
    connection.session = {
        audio: true,
        video: false,
    };

    connection.mediaConstraints = {
        audio: true,
        video: false,
    };

    connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: false
    };

    connection.audiosContainer = $('#audios-container-ul')[0];

    connection.onstream = function(event) {
        var width = parseInt(connection.audiosContainer.clientWidth / 2) - 20;
        var mediaElement = getHTMLMediaElement(event.mediaElement, {
            title: event.userid,
        });

        connection.audiosContainer.appendChild(mediaElement);

        setTimeout(function() {
            mediaElement.media.play();
        }, 5000);

        mediaElement.id = event.streamid;
    };

    connection.onstreamended = function(event) {
        var mediaElement = document.getElementById(event.streamid);
        if (mediaElement) {
            mediaElement.parentNode.removeChild(mediaElement);
    }
};

}


function initOneToMany(){

    connection.socketMessageEvent = 'multi-broadcasters-demo';


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



    connection.audiosContainer = $('#audios-container-ul')[0];
    connection.onstream = function(event) {
        var width = parseInt(connection.audiosContainer.clientWidth / 2) - 20;
        var mediaElement = getHTMLMediaElement(event.mediaElement, {
            title: event.userid,
        });

        connection.audiosContainer.appendChild(mediaElement);

        setTimeout(function() {
            mediaElement.media.play();
        }, 5000);

        mediaElement.id = event.streamid;

//        if (event.type === 'remote' && connection.isInitiator) {
//            var participants = [];
//            connection.getAllParticipants().forEach(function(pid) {
//                participants.push({
//                    pid: pid,
//                    broadcaster: connection.peers[pid].extra.broadcaster === true
//                });
//            });
//            connection.socket.emit(connection.socketCustomEvent, {
//                participants: participants
//            });
//        } else if (event.type === 'remote' && checkbox.checked === false) {
//            connection.socket.emit(connection.socketCustomEvent, {
//                giveAllParticipants: true
//            });
//        }
    };




}


function desativarComponentes() {
  $("#abrir_sala").addClass('disabled');
  $("#select_conexao_id").attr('disabled','');
  $('select').material_select();
  $("#sala_id").attr('disabled','');
}




