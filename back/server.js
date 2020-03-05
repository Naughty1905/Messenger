const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

// Routs dir
const rout = require('./routs/rout');


// Server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Actions
const {
  DISCONNECT,
  CONNECTION,
  JOIN,
  MESSEGE
} = require('./actions/io-actions');

// Sockets
io.on(CONNECTION, (socket) => {
  console.log('Connection on socket is started!!!');

  socket.on(JOIN, ({ name }, callback) => {
    console.log(name)
    socket.on(MESSEGE, ({ messege }, callback) => {
      console.log(messege)
    })
  })



  socket.on(DISCONNECT, () => {
    console.log('User has disconnected!!!');
  });
});
// Routs
app.use(rout);

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));


module.exports = {
  server
}
