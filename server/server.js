import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import https from 'https';
import { Server } from "socket.io";
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const privateKey = fs.readFileSync(path.resolve(__dirname, '../cert/key.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem'));
const port = 3000;

function getIpAddress () {
  const networkInterfaces = os.networkInterfaces;
  const nInterfaces = networkInterfaces();
  return nInterfaces['en0'][2]['address'];
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

app.use((req,res, next) => {
  if (req.protocol == 'http') {
    console.log('http heard!');
  }
})
const appState = {
  currentColor: '',
}

httpsServer.listen(port, () => {
  console.log('https server listening on ' + getIpAddress() + ':' + port);
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
    })
    
    socket.onAny((event, args) => {
      console.log(' ');
      console.log('*** EVENT DETECTED ******');
      console.log(event, args);
      console.log('*******');
      console.log(' ');
    });
    
  });
};

Crowdlights();




