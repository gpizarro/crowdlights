import { WebMidi } from 'webmidi';
import { changeToColor } from './emmiters.js';
import {log} from './utilities.js'

const nkSection = document.getElementById('nanoKontrolSection');
const nkFaderList = document.getElementById('nkFaderUl');
const nkFaderValue1 = document.getElementById('nkFaderValue1');
const nkFaderValue2 = document.getElementById('nkFaderValue2');
const nkFaderValue3 = document.getElementById('nkFaderValue3');
const nkFaderValue4 = document.getElementById('nkFaderValue4');

const rgbState = {
  red:   '0',
  green: '0',
  blue:  '0'
  
}

function setRgbState(color, state) {
  if (color == 'red') { rgbState.red = state; }
  if (color == 'green') { rgbState.green = state; }
  if (color == 'blue') { rgbState.blue = state; }
}

function mergeColors(colors) {
  let newState = '';
  newState = `rgb(${colors.red}%, ${colors.green}%, ${colors.blue}%)`;
  return newState;
}
WebMidi
.enable()
.then(nanoKontrolScripts)
.catch(err => console.log('error: ' + err));

function logNKMidiEvents(nk, e) {
  nk.addListener('midimessage', e => {
    log('Event from nanoKontrol:');
    log('Type: ' + e.message.type);
    log('Value: ' + e.message.value);
    log('Channel: ' + e.message.channel);
    log(e);
  });
}

function logCCEvents(nk, e) {
  nk.addListener('controlchange', e => {
    log('Controller: ')
    log(e.controller);
    log(e.subtype);
    log(e.value)
    log(e.rawValue);
    log(' ');
  })
}

function logDevice(device) {
  log(device);
}

function logger(device) {
  logDevice(device);
  logCCEvents(device);
}

function nanoKontrolScripts() {
  const nanoKontrol = WebMidi.getInputByName("nanoKONTROL2 SLIDER/KNOB");
  if (nanoKontrol) {
    nkSection.classList.remove('hidden');
    // logger(nanoKontrol);
    addFaderData(nanoKontrol);
  }
}

function assignColor(color, value) {
  const R = document.getElementById('R');
  const G = document.getElementById('G');
  const B = document.getElementById('B');
  let rgb;
  value = Math.round(value * 100 );
  value = value.toFixed(0);

  if (color === 'R') { 
    R.innerHTML = value;
    setRgbState('red', value);
  }
  if (color === 'G') { 
    G.innerHTML = value;
    setRgbState('green', value);
  }
  if (color === 'B') {
    B.innerHTML = value 
    setRgbState('blue', value);
  }
  
  rgb = mergeColors(rgbState);
  changeToColor(rgb);
  
}

function addFaderData(nk) {
  nk.addListener('controlchange', e => {
    switch(e.controller.number) {
      case 0:
        nkFaderValue1.innerHTML = e.value;
        assignColor('R', e.value);
      break;
      
      case 1:
        nkFaderValue2.innerHTML = e.value;
        assignColor('G', e.value);
      break;

      case 2:
        nkFaderValue3.innerHTML = e.value;
        assignColor('B', e.value);
      break;

      case 3:
        nkFaderValue4.innerHTML = e.value;
      break;

    }
  })

}
