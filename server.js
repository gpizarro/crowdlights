const express = require('express');
const fs = require('fs');
const privateKey = fs.readFileSync('./key.pm');
const certificate = fs.readFileSync('./cert.pem');
const app = express();
const https = require('https');

const httpsServer = https.createServer({
  cert: certificate,
  key: privateKey
}, app);

const { Server } = require("socket.io");
const io = new Server(httpsServer);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/admin.html');
});

const CrowdLights = (() => {
  
  let currentColor = 'not set';
  
  const setCurrentColor = (color) => {
    currentColor = color
  }
  
  const getCurrentColor = () => {
    return currentColor;
  }
  2
  const init = () => {
    io.on('connection', (socket) => {
    console.log('user connected');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    socket.on('change_background_color', (color) => {
      setCurrentColor(color);
      io.emit('change_background_color', color);
    });
    
    socket.on('request_current_color', () => {
      io.emit('change_background_color', currentColor);
    })
    
    socket.onAny((event, args) => {
      console.log('*** EVENT DETECTED ******');
      console.log(event, args);
      console.log(' ');
      console.log('Current color is ' + getCurrentColor());
      console.log('***********');
    });
  });
  }
  
return {
  init: init
}
})();

CrowdLights.init();

httpsServer.listen(3000, () => {
  console.log(' https server listening on *:3000');
});