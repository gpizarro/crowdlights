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

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('change_background_color', (color) => {
    io.emit('change_background_color', color);
    console.log('change_background_color requested');
    console.log(color);
  })
  
});



httpsServer.listen(3000, () => {
  console.log(' https server listening on *:3000');
});