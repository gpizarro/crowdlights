const socket = io();
let lastColorState = '';
const adminForm = document.getElementById('admin-form');
const redButton = document.getElementById('redButton');
const blueButton = document.getElementById('blueButton');
const togglesWhenPressed = document.getElementById('togglesWhenPressed');
const touchButton = document.getElementById('touchButton');
const touchButton2 = document.getElementById('touchButton2');

function changeToColor(color = 'orange')  {
  socket.emit('change_background_color', color);
}

function getCurrentColor() {
  socket.emit('request_current_color');
}

socket.on('send_current_color', (currentColor) => {
  lastColorState = currentColor;
});


// Simple Color Changes
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) { // eslint-disable-line
    changeToColor(input.value); // eslint-disable-line 
  }
});

redButton.addEventListener('click', () => {
  changeToColor('red');
});

blueButton.addEventListener('click', () => {
  changeToColor('blue');
});





// Toggle Tests
togglesWhenPressed.addEventListener('mousedown', () => {
  getCurrentColor();
  changeToColor('orange');
});

togglesWhenPressed.addEventListener('mouseup', () => {
  changeToColor(lastColorState);
});


// Touch Tests
touchButton.addEventListener('touchstart', () => {
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

export {changeToColor, socket};