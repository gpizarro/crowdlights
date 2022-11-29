import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import https from 'https';
import { Server } from "socket.io";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const privateKey = fs.readFileSync(path.resolve(__dirname, '../cert/key.pem'));
const certificate = fs.readFileSync(path.resolve(__dirname, '../cert/cert.pem'));
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

app.use((req,res, next) => {
  if (req.protocol == 'http') {
    console.log('http heard!');
  }
})
const appState = {
  currentColor: '',
}

httpsServer.listen(3000, () => {
  console.log('https server listening on *:3000');
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