import { log } from './utilities.js';
import emmiters from './emmiters.js';
import midiScripts from './midiScripts.js'
import nanoKontrolScripts from './nanoKontrolScripts.js';
import QRCode from 'qrcodejs2';

const serverAddressElement = document.getElementById('serverAddress');
const serverPortElement = document.getElementById('port');


// Server Data
async function getServerAddress() {
  const res = await fetch('/api');
  const data = await res.json();
  return data;
}

// QR Code Generator
function generateQRCode(url = '') {
  new QRCode(document.getElementById('qrCodeElement'), {
    text: url 
  });
}


document.addEventListener("DOMContentLoaded", async () => {
  let data;
  
  try {
    data = await getServerAddress();
    serverAddressElement.innerHTML = data.ipAddress;
    serverPortElement.innerHTML = data.port;
    let qrUrl = 'https://' + data.ipAddress + ':' + data.port;
    generateQRCode(qrUrl);
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
});

