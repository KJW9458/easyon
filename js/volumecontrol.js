// // CHROME 만 ?
// var agent = navigator.userAgent.toLowerCase();
// // var chrome = (agent.indexOf("chrome") != -1) ? "chrome" : "";
// if (typeof chrome === 'undefined' && (typeof self === 'undefined' || typeof self.port === 'undefined')){
//     console.log('neither in chrome nor FF');
// } else {
//   window.onload = function (){
//     console.log('controlling volume');
//     var storage;
//     var inputslider = document.getElementById('inputSlider');
//   //   var sliderlabel = document.getElementById('sliderLabel');
//   storage = chrome.storage.local;
//     if (typeof chrome !== 'undefined' && chrome.storage){
//       storage = chrome.storage.local;
//       storage.get('mastervolume',function(result){
//         if (result && result.mastervolume){
//           // console.log('old value found', result);
//           inputslider.value = result.mastervolume;
//           // sliderlabel.innerHTML = result.mastervolume;
//           updateVolume(result.mastervolume/100.0);
//         } else {
//           // console.log('creating new storage', parseFloat(inputslider.value));
//           storage.set({'mastervolume':parseFloat(inputslider.value)});
//         }
//       });
//     }

//     inputslider.addEventListener('input', function(){
//       // sliderlabel.innerHTML = parseInt(inputslider.value);
//       var volume = parseFloat(inputslider.value)/100.0;
//       console.log(storage);
//       // console.log(volume);
//       if(typeof chrome !== 'undefined'){
//         storage.set({'mastervolume':parseFloat(inputslider.value)});
//       }

//       updateVolume(volume);
//     })
//   }
// }

// function updateVolume(volume){
//   if (typeof chrome !== 'undefined'){
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, {mastervolume: volume});
//     });
//   } else if (typeof self !== 'undefined' && self.port) {
//     console.log('emiting..', volume);
//     self.port.emit('mastervolume',volume);
//   }
// }
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain();
var inputSlider = document.querySelector('#inputSlider');
var source;

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia (
    // constraints - only audio needed for this app
    {
      audio: true
    },
 
    // Success callback
    function(stream) {
      source = audioCtx.createMediaStreamSource(stream);
 
    },
 
    // Error callback
    function(err) {
      console.log('The following gUM error occurred: ' + err);
    }
   );
 } else {
    console.log('getUserMedia not supported on your browser!');
 }
 
 source.connect(gainNode);
 gainNode.connect(audioCtx.destination);

 mute.onclick = voiceMute;

 function voiceMute() {
  if(mute.id == "") {
    // 0 means mute. If you still hear something, make sure you haven't
    // connected your source into the output in addition to using the GainNode.
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    mute.id = "activated";
    mute.textContent = "Unmute";
  } else {
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    mute.id = "";
    mute.textContent = "Mute";
  }
}