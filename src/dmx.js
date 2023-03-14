import { changeToColor, mergeColors, rgbState, setRgbState } from "./newEmiters.js";

class Fader {
  constructor() {
    this.testIfLoaded();
    this.loadFaderWrap()
  }

  loadFaderWrap() {
    this.faderWrap = document.createElement('div')
    this.faderWrap.className = 'fader_wrap';
    document.body.appendChild(this.faderWrap);
  }
  
  createFader(faderName) {
    this.faderName = faderName
    // Element Label
    this.elementLabel = document.createElement('label');
    this.elementLabel.setAttribute('for', faderName);
    this.elementLabel.innerText = faderName;
    this.elementLabel.className = 'fader_label';
    
    // Fader Console
    this.elementConsole = document.createElement('label');
    this.elementConsole.innerText = '-';
    this.elementConsole.className = 'fader_console';
    this.elementConsole.id = faderName + 'Label'
     
    // Fader
    this.element = document.createElement('input');
    this.element.type = 'range';
    this.element.setAttribute('orient', 'vertical');
    this.element.setAttribute('name', faderName);
    this.element.id = faderName + '_fader';
    this.element.className = 'fader';
    let faderLocation = this.faderWrap;
    
    faderLocation.appendChild(this.element);
    faderLocation.insertBefore(this.elementConsole, this.element);
    faderLocation.appendChild(this.elementLabel);
  }
  
  testIfLoaded() {
    console.log('Fader instantiated !');
    this.testElement = document.querySelector('#testElement');
    this.testElement.innerText = 'DMX scripts loaded'
  }

  listen() {
    this.element.addEventListener('input', () => {
      let rgb;
      this.elementConsole.innerText = this.element.value;
      setRgbState(this.faderName, this.element.value);
      console.log(rgbState);
      rgb = mergeColors(rgbState)
      changeToColor(rgb);
    })
  }
}

const faderRed = new Fader();
faderRed.createFader('R');
faderRed.listen()

const faderGreen = new Fader();
faderGreen.createFader('G')
faderGreen.listen();

const faderBlue = new Fader();
faderBlue.createFader('B');
faderBlue.listen();