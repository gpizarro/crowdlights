const socket = io();

function changeToColor(color = 'orange')  {
  socket.emit('change_background_color', color);
}

const rgbState = {
  red:   '0',
  green: '0',
  blue:  '0'
}

function setRgbState(color, state) {
  let c = color.toLowerCase();
  if (c === 'r') { rgbState.red = state}
  if (c === 'red') { rgbState.red = state}
  
  if (c === 'g') { rgbState.green = state}
  if (c === 'green') { rgbState.green = state}

  if (c === 'b') { rgbState.blue = state}
  if (c === 'blue') { rgbState.blue = state}
}

function mergeColors(colors) {
  let newState = '';
  newState = `rgb(${colors.red}%, ${colors.green}%, ${colors.blue}%)`;
  return newState;
}

export {rgbState, changeToColor, setRgbState, mergeColors}