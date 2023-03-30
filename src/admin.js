import emmiters from './emmiters.js';
// import midiScripts from './midiScripts.js'
// import nanoKontrolScripts from './nanoKontrolScripts.js';
import { QRCodeCreator } from './qrCodeCreator.js';

const initialVenueData = {
  sections: 0
}

const socket = io();
const serverAddressElement = document.getElementById('serverAddress');
const serverPortElement = document.getElementById('port');
const debugButton = document.getElementById('flexSwitchCheckDefault');


// Server Data
async function getServerAddress() {
  const res = await fetch('/api');
  const data = await res.json();
  return data;
}

document.addEventListener("DOMContentLoaded", async () => {
  let data;
  
  try {
    data = await getServerAddress();
    serverAddressElement.innerHTML = data.ipAddress;
    serverPortElement.innerHTML = data.port;
    new QRCodeCreator(initialVenueData.sections, data.ipAddress, data.port);
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
});

debugButton.addEventListener('change', (e)=> {
  socket.emit('toggleDebug', e.target.checked);
})

