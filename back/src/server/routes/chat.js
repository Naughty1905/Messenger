const express = require('express');
const router = express.Router();

const Chat = require('../../models/chat')

router.post('/', (req, res) => {
  const { members } = req.body;

  try {
    Chat.createChat(members);
    res.status(201).send()
  } catch (err) {
    res.status(400).send('Such a chat has alredy exists')
  }

})
