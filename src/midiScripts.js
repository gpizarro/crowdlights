import {WebMidi} from 'webmidi';

const webMidiStatus = document.getElementById('webMidiStatus');
const webMidiSection = document.getElementById('webMidiSection');
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
      webMidiStatus.innerHTML += "No Device Detected"
    } else {
      webMidiStatus.innerHTML += "Midi Devices found:"
      addInputTable();
      listenToMidi();
  }
  // logInputs();
};

function logInputs() {
  console.log('logInputs called:');
  console.log('------------------')
  WebMidi.inputs.map((item)=> {
    console.log(item);
    console.log(item.id)
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
  
  addTableWithHeaders();
  addTableData();
}


function listenToMidi() {
  console.log('listening...');
  const nanoKontrol = WebMidi.getInputByName("nanoKONTROL2 SLIDER/KNOB");
  const digitalPiano = WebMidi.getInputByName('Digital Piano')

  if (nanoKontrol) { 
    console.log('NanoKontrol found');
  
    nanoKontrol.addListener('midimessage', event => {
      console.log(event);
      console.log('*** Event from nanoKontrol***');
      console.log('Type:' + event.type);
      
    });
  }
  
  digitalPiano.addListener('noteon', event => {
    console.log(event);
  });
}