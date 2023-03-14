import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import https from 'https';
import { Server } from "socket.io";
import os from 'os';
import colors from 'colors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const privateKey = fs.readFileSync(path.resolve(__dirname, '../cert/key.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem'));
const port = 3000;

function getIpAddress () {
  let ipAddress;
  const networkInterfaces = os.networkInterfaces()['en0'];
  
  networkInterfaces.filter( item => {
    let condition = item.address.indexOf('f') === 0;
    if(condition === false) {
      ipAddress = item.address;
    }
  })
  return ipAddress;
}

const app = express();

const httpsServer = https.createServer({
  cert: certificate,
  key: privateKey
}, app);

const io = new Server(httpsServer);

app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/admin.html'));
});

app.get('/dmx', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/dmx.html'));
});

app.get('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ 
    ipAddress: getIpAddress(),
    port: port }));
})

app.use((req, res, next) => {
  if (req.protocol == 'http') {
    console.log('http heard!');
  }
})
const appState = {
  currentColor: '',
}

httpsServer.listen(port, () => {
  console.log('https server listening on ' + getIpAddress().green + ':' + colors.green(port));
  console.log(' ');
});

const Crowdlights = () => {
  
  io.on('connection', (socket) => {
    console.log('user connected');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    socket.on('change_background_color', (color) => {
      appState.currentColor = color;
      io.emit('change_background_color', color);
    });
    
    socket.on('request_current_color', () => {
      io.emit('send_current_color', appState.currentColor);
    });

    socket.on('toggleDebug', (state) => {
      console.log('toggleDebug: ' + state);
      if(state === true) {
        io.emit('showDebug');
      }

      if (state === false) {
        io.emit('hideDebug');
      }
    });
    
    socket.onAny((event, args) => {
      console.log(' ');
      console.log('*** EVENT DETECTED ******');
      console.log(event, args);
      console.log('*************************');
      console.log(' ');
    });
    
  });
};

Crowdlights();

console.log(' ');
console.log('Crowdlights Server is live'.blue);
console.log('--------------------------'.blue);

process.env.NODE_ENV === 'development'?
  console.log('Development Environment'.yellow):
  console.log('Production Environment'.yellow);
     