const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const PORT = process.env.PORT || 5000;

// DB conncetion
const DB = require('./dbConnection');
DB();

// Routs dir
const rout = require('./routes/rout');
const usersRouter = require('./routes/users');

// Server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Actions
const {
  DISCONNECT,
  CONNECTION,
  JOIN,
  MESSAGE,
  SEND_MESSAGE
} = require('./actions/io-actions');

// Sockets
io.on(CONNECTION, (socket) => {
  console.log('Connection on socket is started!!!');

  socket.on(JOIN, ({ name }, callback) => {
    console.log(name)
    socket.on(MESSAGE, ({ message }, callback) => {
      if (!message.owner || !message.content) return
      console.log(message)
      io.emit(SEND_MESSAGE, { message })
    });
  });



  socket.on(DISCONNECT, () => {
    console.log('User has disconnected!!!');
  });
});


// Routs
app.use(rout);
app.use('/users', usersRouter);

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));


