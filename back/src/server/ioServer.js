const socketio = require('socket.io');

// Actions
const {
  DISCONNECT,
  CONNECTION,
  JOIN,
  MESSAGE,
  SEND_MESSAGE,
  CHECK_READ_MESSAGE
} = require('../actions/io-actions');

// Models
const Chat = require('../models/chat')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const startIoServer = (server) => {
  const io = socketio(server);
  io.on(CONNECTION, (socket) => {
    console.log('Connection on socket is started!!!');
    socket.on(JOIN, ({ chat }, callback) => {
      socket.on(MESSAGE + chat, async ({ message }, callback) => {
        if (!message.owner || !message.content) return
        const currentChat = await Chat.findOne({ _id: chat })
        currentChat.messages.push({
          ...message
        });
        await currentChat.save();
        io.emit(SEND_MESSAGE + chat, { message })
      });
      //   socket.on(CHECK_READ_MESSAGE + chat, async ({ chat, isAuth }, callback) => {
      //     const userId = jwt.decode(isAuth)._id;
      //     const { login } = await User.findOne({ _id: userId });
      //     let currentChat = await Chat.findOne({ _id: chat });
      //     let { messages } = currentChat;
      //     messages = messages.map(message => message.toObject()).map(message => {
      //       if (message.owner !== login) {
      //         return { ...message, isSeen: true }
      //       } else {
      //         return message
      //       }
      //     })
      //     currentChat.messages = messages;
      //     await currentChat.save();
      //   })
    });
    socket.on(DISCONNECT, () => {
      console.log('User has disconnected!!!');
    });
  });

}

module.exports = startIoServer;
