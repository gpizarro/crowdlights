import QRCode from 'qrcodejs2';

const qrCodeSection = document.querySelector('#qrCodeSection');

class QRCodeCreator {
  constructor(venueSections, server, port = '') {
    // this.numberOfCodes = numberOfCodes;
    this.venueSections = venueSections;
    this.server = server;
    this.port = port;
    
    this.createCardCols();
    this.createCodes();
  }
  
  createCardCols() {
    // const qrCodeCol = document.getElementById('qrCodeCol');
    qrCodeSection.innerHTML +=  
      `<div class='row gy-3' id='qrCodeCol' ></div>`;
    
    for(let i = 0; i <= this.venueSections; i++) {
      document.getElementById('qrCodeCol').innerHTML += 
      
      `<div class='col'>
        <div class='card p-3' id='qrCode${i}' style='width: 18rem;'></div>
      </div>`;
    }
  }
  
  createUrl(url) {
    let scheme = window.location.protocol;
    let data;
    if (this.port) { data = scheme + '//' + this.server + ':' + this.port + '?' + url}
    else { data = scheme + '//' + this.server + ':' + this.port + '?' + url; }
    return data;
  }
  
  createCodes() {
    for(let i = 0; i <= this.venueSections; i++) {
      let section = `section=${i + 1}`;
      let elementId = `qrCode${i}`;
      let text = this.createUrl(section);
      new QRCode(elementId, {text});
    }
  }
}

export {QRCodeCreator};