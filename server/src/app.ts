import express = require('express');
import http = require('http');
import socketIo = require('socket.io');
import cors = require('cors');

import userRouter = require('./routes/userRouter');

const app = express();
const server = new http.Server(app);
const io = new socketIo.Server(server);

const PORT = process.env.PORT || 3000;

app.use(cors());

// ROUTES
app.use('/user', userRouter.default);

io.on('connection', (socket) => {
  socket.emit('connection', 'success connection !');
});

server.listen(PORT, () => {
  // tslint:disable-next-line
  console.log(`Server running on port ${PORT}`);
});
