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

var lVideo = document.getElementById("localVideo");
var oVideo = document.getElementById("remoteVideo1");

var inputSlider = document.querySelector("#inputSlider");
var inputMic = document.querySelector("#inputMic");

inputSlider.addEventListener('input', function(){
  var v = parseFloat(inputSlider.value)/100.0;
  console.log(v);
  
  lVideo.volume=v;
  oVideo.volume=v;
});