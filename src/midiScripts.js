import {WebMidi} from 'webmidi';
import { changeToColor } from './emmiters.js';
const webMidiStatus = document.getElementById('webMidiStatus');
const webMidiSection = document.getElementById('webMidiSection');
const webMidiContainer = document.getElementById('webMidiContainer');
const tableHead = document.createElement('thead');
const tableBody = document.createElement('tbody');
const tableElement = document.createElement('table');



WebMidi
  .enable()
  .then(onEnabled)
  .catch(err => console.log('error: ' + err));

function onEnabled() {
  console.log('webMidi enabled');
  if (WebMidi.inputs.length < 1) {
      // webMidiStatus.innerHTML += "No Device Detected"
    } else {
      webMidiStatus.innerHTML += "Midi Devices found:"
      webMidiContainer.classList.remove('invisible');
      webMidiContainer.classList.add('visible');
      addInputTable();
      listenToMidi();
  }
  // logInputs();
}

function logInputs() {
  console.log('logInputs called:');
  console.log('------------------')
  WebMidi.inputs.map((item)=> {
    console.log(item);
    console.log(item.id)
  })
  // console.log(WebMidi)
}

function logMidiMessageData(device, event) {
  console.log('logging midiMessageData');
  device.addListener('midimessage', event => {
    console.log('**** Begin Message ******');
    console.log('Device: ' + device.name);
    console.log('Type: ' + event.type);
    console.log('Type: ' + event.message.type);
    console.log('Data: ' + event.data);
    console.log('Channel: '+ event.message.channel);
    // log(event.message);
    // log('RawData:');
    // log(event);
    console.log('**** END Message ******');
    console.log(' ');
  })
}

function addTableWithHeaders() {
  let headerHTML = ''
  tableElement.insertAdjacentElement('afterbegin', tableHead);
  tableHead.classList.add('table-dark');
  headerHTML += 
  `<tr><th>#</th><th>Device</th></tr>`
  tableHead.innerHTML = headerHTML;
}

function addTableData() {
  let dataHTML = '';
  WebMidi.inputs.forEach( (device, index) => {
    dataHTML += 
    `<tr>
      <td>${index}</td>
      <td>${device.name}</td>
    </tr>`
  });
  tableBody.innerHTML = dataHTML;
}

function addInputTable() {
  
  tableElement.classList.add('table');
  tableElement.classList.add('table-striped');
  webMidiSection.insertAdjacentElement('beforeend', tableElement);
  tableElement.insertAdjacentElement('beforeend', tableBody);
  webMidiSection.insertAdjacentElement('beforeend', document.createElement('hr'));
  
  addTableWithHeaders();
  addTableData();
}


function listenToMidi() {
  console.log('listening...');
  const nanoKontrol = WebMidi.getInputByName("nanoKONTROL2 SLIDER/KNOB");
  const digitalPiano = WebMidi.getInputByName('Digital Piano');
  const CrowdLights = WebMidi.getInputByName('IAC Driver CrowdLightsOut');

  if (CrowdLights) {
     CrowdLights.addListener('noteon', noteEvent => {
      switch (noteEvent.note.identifier) {
        case 'C1':
          console.log('C1 heard from switch statement');
          changeToColor('red');
        break;

        case 'C#1':
          console.log('C#1 heard');
          changeToColor('blue');
        break;

        case 'D1':
          console.log('D1 heard');
          changeToColor('cyan');
        break;

        case 'D#1':
          console.log('D#1 heard');
          changeToColor('yellow');
        break;

        default:
          console.log('no more notes registered to log');
      }
      // log(noteEvent.note.identifier);
     })

  }
  

  // if (nanoKontrol) { 
  //   console.log('NanoKontrol found');
  //   // nanoKontrolScripts();
  //   // nanoKontrol.addListener('midimessage', event => {
  //   //   console.log(event);
  //   //   console.log('*** Event from nanoKontrol***');
  //   //   console.log('Type:' + event.type);

  //   });
  // }
  
  if (digitalPiano) {
    digitalPiano.addListener('noteon', event => {
      console.log(event);
    });
  }
}