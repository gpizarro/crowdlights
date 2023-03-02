import { log } from './utilities.js';
import emmiters from './emmiters.js';
import midiScripts from './midiScripts.js'
import nanoKontrolScripts from './nanoKontrolScripts.js';

const serverAddressElement = document.getElementById('serverAddress');
const serverPortElement = document.getElementById('port');

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
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
});
