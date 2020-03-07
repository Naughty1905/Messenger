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
    const messages = chat.messages;
    res.send(200).json(messages);
  } catch (err) {
    res.status(404).send('Not found!');
  }
})

router.post('/', auth, async (req, res) => {
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
    await currentUser.save();
    res.status(201).json({ chatId: chat._id });
  } catch (error) {
    res.status(404).send(error);
  }
})


module.exports = router;
