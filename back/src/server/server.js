const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const Chat = require('../models/chat')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 5000;

// DB conncetion
const DB = require('../DB/dbConnection');
DB()
  .then(() => console.log('DB connected'))
  .catch(() => console.error('Errors'));

// Routs dir
const rout = require('./routes/rout');
const usersRouter = require('./routes/users');
const chatsRouter = require('./routes/chats');

// Server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload());

// Actions
const {
  DISCONNECT,
  CONNECTION,
  JOIN,
  MESSAGE,
  SEND_MESSAGE,
  CHECK_READ_MESSAGE
} = require('../actions/io-actions');

// Sockets
io.on(CONNECTION, (socket) => {
  console.log('Connection on socket is started!!!');
  socket.on(JOIN, ({ chat }, callback) => {
    // console.log(user);
    socket.on(MESSAGE + chat, async ({ message }, callback) => {
      if (!message.owner || !message.content) return
      const currentChat = await Chat.findOne({ _id: chat })
      currentChat.messages.push({
        ...message
      });
      await currentChat.save();
      io.emit(SEND_MESSAGE + chat, { message })
    });
    socket.on(CHECK_READ_MESSAGE + chat, async ({ chat, isAuth }, callback) => {
      console.log(chat);
      console.log(isAuth)
      const userId = jwt.decode(isAuth)._id;
      const { login } = await User.findOne({ _id: userId });
      let currentChat = await Chat.findOne({ _id: chat });
      let { messages } = currentChat;
      messages = messages.map(message => message.toObject()).map(message => {
        if (message.owner !== login) {
          return { ...message, isSeen: true }
        } else {
          return message
        }
      })
      currentChat.messages = messages;
      await currentChat.save();
    })
  });



  socket.on(DISCONNECT, () => {
    console.log('User has disconnected!!!');
  });
});


// Routs
app.use(rout);
app.use('/users', usersRouter);
app.use('/chats', chatsRouter);

server.listen(PORT, () => console.log(`Server has started on ${PORT}`));
