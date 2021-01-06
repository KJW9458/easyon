//  오디오 음량 설정
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = audioContext.createGain();
navigator.mediaDevices.getUserMedia({
        audio: true
    })
    .then((stream) => {
        console.log('got stream', stream);
        window.orginalStream = stream;
        return stream;
    })
    .then((stream) => {
        audioSource = audioContext.createMediaStreamSource(stream),
            audioDestination = audioContext.createMediaStreamDestination();
        audioSource.connect(gainNode);
        gainNode.connect(audioDestination);
        gainNode.gain.value = 1;
        window.localStream = audioDestination.stream;
    })
    .catch((err) => {
        console.error('Something wrong in capture stream', err);
    })

function changeMicrophoneLevel(value) {
    if (value && value >= 0 && value <= 2) {
        gainNode.gain.value = value;
    }
}

function vChange(t, v) {
    if (t == "sound") {
        document.querySelector("video").volume = v;
    } else if (t == "mic") {
        changeMicrophoneLevel(v);
    }

    // $('.test').text(t+" "+v);
}
