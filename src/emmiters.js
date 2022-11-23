const socket = io();
let lastColorState = '';
const button = document.getElementById('button');
const adminForm = document.getElementById('admin-form');
const redButton = document.getElementById('redButton');
const togglesWhenPressed = document.getElementById('togglesWhenPressed');
const touchButton = document.getElementById('touchButton');
const touchButton2 = document.getElementById('touchButton2');

function changeToColor(color = 'orange')  {
  socket.emit('change_background_color', color);
}

redButton.addEventListener('click', function(e) {
  socket.emit('change_background_color', 'red');
});

blueButton.addEventListener('click', function(e) {
  socket.emit('change_background_color', 'blue');
});

function getCurrentColor() {
  console.log('getCurrentColor called');
  socket.emit('request_current_color');
}

socket.on('send_current_color', function(currentColor) {
  lastColorState = currentColor;
  console.log('Current Color is: ' + currentColor);
});

togglesWhenPressed.addEventListener('mousedown', function(e) {
  getCurrentColor();
  socket.emit('change_background_color', 'orange')
});

togglesWhenPressed.addEventListener('mouseup', function() {
  socket.emit('change_background_color', lastColorState);
})

adminForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('change_background_color', input.value);
  }
});

touchButton.addEventListener('touchstart', function(e) {
  console.log('touched');
  getCurrentColor();
  changeToColor('cyan');
});

touchButton.addEventListener('touchend', () => {
  console.log('touchend detected');
  changeToColor(lastColorState);
});

touchButton2.addEventListener('touchstart', () => {
  getCurrentColor();
  touchButton2.classList.add('touching');
  changeToColor('olive');
})

touchButton2.addEventListener('touchend', () => {
  touchButton2.classList.remove('touching');
  changeToColor(lastColorState);
})