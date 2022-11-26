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

redButton.addEventListener('click', () => {
  changeToColor('red');
});

blueButton.addEventListener('click', () => {
  changeToColor('blue');
});

socket.on('send_current_color', (currentColor) => {
  lastColorState = currentColor;
});

togglesWhenPressed.addEventListener('mousedown', () => {
  getCurrentColor();
  changeToColor('orange');
});

togglesWhenPressed.addEventListener('mouseup', () => {
  changeToColor(lastColorState);
});

adminForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    changeToColor(input.value);
  }
});

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

export {changeToColor};