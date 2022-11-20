const express = require('express');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../cert/key.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem'));
const app = express();
const https = require('https');

const httpsServer = https.createServer({
  cert: certificate,
  key: privateKey
}, app);

const { Server } = require("socket.io");
const io = new Server(httpsServer);

app.use('/dist', express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/admin.html'));
});

app.use((req,res, next) => {
  if (req.protocol == 'http') {
    console.log('http heard!');
  }
})
const appState = {
  currentColor: ''
}

const CrowdLights = (() => {
  
  const init = () => {
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
        // io.emit('change_background_color', currentColor);
      })
      
      socket.onAny((event, args) => {
        console.log(' ');
        console.log('*** EVENT DETECTED ******');
        console.log(event, args);
        console.log('*******');
        console.log(' ');
      });
      
    });
  }
  
  
  return {
    init: init
  }
})();

CrowdLights.init();

httpsServer.listen(3000, () => {
  console.log('https server listening on *:3000');
});