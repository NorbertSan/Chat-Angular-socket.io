import express = require('express');
import http = require('http');
import socketIo = require('socket.io');

const app = express();
const server = new http.Server(app);
const io = new socketIo.Server(server);

const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
  socket.emit('connection', 'success connection !');
});

server.listen(PORT, () => {
  // tslint:disable-next-line
  console.log(`Server running on port ${PORT}`);
});
