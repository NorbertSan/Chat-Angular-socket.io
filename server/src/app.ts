import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter';

const app = express();
app.use(bodyParser.json());
const server = new http.Server(app);
const io = new socketIo.Server(server);

const PORT = process.env.PORT || 3000;

app.use(cors());

// ROUTES
app.use('/user', userRouter);

io.on('connection', (socket) => {
  socket.emit('connection', 'success connection !');
});

server.listen(PORT, () => {
  // tslint:disable-next-line
  console.log(`Server running on port ${PORT}`);
});
