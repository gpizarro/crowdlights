const socket = io();
const infoCard = document.querySelector('#appInfo');
const infoCardContainer = document.querySelector('#infoCardContainer');

const body = document.getElementById('body');


function setColor(color) {
  document.body.style.backgroundColor = color;
}

function getCurrentColor() {
  let initialColor = getInitialColor();
  console.log('Initial Color is: ' + initialColor) ; 
  logColorState(initialColor);
  socket.emit('request_current_color', function(color) {
    document.body.style.backgroundColor = color;
    console.log('requested color should be ' + color);
  });
}
      
socket.on('send_current_color', function(message) {
  setColor(message);
  logColorState(message);
})

function getInitialColor(initialColor) {
  initialColor = window.getComputedStyle(body);
  console.log(initialColor.backgroundColor);
  return initialColor.backgroundColor;
}
      
socket.on('change_background_color', function(color) {
  document.body.style.backgroundColor = color;
  console.log('Color has changed to ' + color);
  logColorState(color);
});

socket.on('showDebug', function() {
  infoCardContainer.classList.remove('invisible'); 
});

socket.on('hideDebug', function() {
  infoCardContainer.classList.add('invisible');
});

(function() {
  getCurrentColor();
})();


function logColorState(color) {
  infoCard.innerHTML = color;
}