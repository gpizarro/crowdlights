const socket = io();

function getCurrentColor() {
  socket.emit('request_current_color', function(color) {
  document.body.style.backgroundColor = color;
  });
}
      
socket.on('send_current_color', function(message) {
  console.log('send_current_color received');
  console.log(message);
})
      
socket.on('change_background_color', function(color) {
  document.body.style.backgroundColor = color;
  console.log('Color has changed to ' + color);
});

(function() {
    getCurrentColor();
})();