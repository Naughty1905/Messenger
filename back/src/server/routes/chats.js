const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Models
const Chat = require('../../models/chat');
const User = require('../../models/user');

// isAuth
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {
  const { id } = req.query;
  try {
    const chat = await Chat.findOne({ _id: id });
    const { messages } = chat;
    res.status(200).json({ messages, chat: chat._id });
  } catch (err) {
    res.status(404).send('Not found!');
  }
})

router.post('/', auth, async (req, res) => {
  const { fullName, login, _id } = req.user;
  const currentUser = await User.findOne({ _id });
  const newContact = await User.findOne({ login });
  const checkChat = await Chat.findOne({ members: [currentUser._id, newContact._id] })
  const checkChatReverse = await Chat.findOne({ members: [newContact._id, currentUser._id] })
  try {
    if ((checkChat === null) && (checkChatReverse === null)) {
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
      try {
        newContact.save()
      } catch (err) {

      }
      res.status(201).json({ chatId: chat._id });
    } else {
      const error = 'This user is already your friend!'
      res.json(error);
      return res.end();
    }

  } catch (e) {
    if (checkChat === null && checkChatReverse === null) {
      const error = 'User does not exist!'
      res.status(404).send(error);
    } else {
      const error = 'This user is already your friend!'
      res.status(404).send(error);
    }
  }
})

router.get('/conversations', auth, async (req, res) => {
  const { fullName, _id } = req.user;
  try {
    let chats = await Chat.find({ members: _id }).populate("members");
    const chatsStructure = {};
    chats = chats.map(chat => chat.toObject());
    chats = chats.map(chat => {
      chatsStructure[chat._id] = {
        _id: chat._id,
        members: chat.members.map(member => {
          return {
            name: member.fullName,
            avatar: member.avatar
          }
        }).filter(member => member.name !== fullName),
        // messages: chat.messages
      }
    })
    res.status(200).json(chatsStructure);
  } catch (error) {
    res.status(404).send(error);
  }
})


router.post('/seen', auth, async (req, res) => {
  const { login } = req.user
  const { chat } = req.body;
  try {
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
