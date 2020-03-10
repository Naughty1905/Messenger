const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Models
const Chat = require('../../models/chat');
const User = require('../../models/user');

// isAuth
const auth = require('../../middleware/auth');

// Google api
const googleApiSpeechToText  = require('../../utils/googleApiSpeechToText')

router.get('/', async (req, res) => {
  const { id } = req.query;
  console.log(id);
  try {
    const chat = await Chat.findOne({ _id: id });
    const { messages } = chat;
    res.status(200).json({ messages, chat: chat._id });
  } catch (err) {
    res.status(404).send('Not found!');
  }
})

router.post('/', async (req, res) => {
  const { fullName, login, number, isAuth } = req.body;
  try {
    const userId = jwt.decode(isAuth)._id;
    const currentUser = await User.findOne({ _id: userId });
    const newContact = await User.findOne({ login });
    const chat = new Chat({
      members: [userId, newContact._id]
    })
    await chat.save()
    currentUser.friends.push({
      fullName,
      friendId: newContact._id,
      chat: chat._id
    })
    await currentUser.save()
    newContact.friends.push({
      fullName: currentUser.fullName,
      friendId: currentUser._id,
      chat: chat._id
    })
    await newContact.save();
    res.status(201).json({ chatId: chat._id });
  } catch (error) {
    res.status(404).send(error);
  }
})

router.get('/conversations', async (req, res) => {
  const { isAuth } = req.query;
  try {
    const userId = jwt.decode(isAuth)._id;
    const { fullName } = await User.findOne({ _id: userId });
    let chats = await Chat.find({ members: userId }).populate("members");
    chats = chats.map(chat => chat.toObject());
    chats = chats.map(chat => {
      return {
        _id: chat._id,
        members: [chat.members.map(member => member.fullName).filter(currentName => currentName !== fullName)],
        messages: chat.messages
      }
    })
    res.status(200).json(chats);
  } catch (error) {
    res.status(404).send(error);
  }
})

router.post('/audio-message', (req, res) => {
  const { audioMessage: {
    data: buffer
  } } = req.files

  googleApiSpeechToText(buffer)
  .catch(console.error)
});


router.post('/seen', async (req, res) => {
  const { chat, isAuth } = req.body;
  try {
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
    res.status(200).json(true);
  } catch (err) {
    res.status(404).send(err);
  }
})


module.exports = router;
