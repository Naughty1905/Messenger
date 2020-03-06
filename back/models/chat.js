const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Messege'
    }
  ]
})

module.exports = new mongoose.model('Chat', chatSchema)
