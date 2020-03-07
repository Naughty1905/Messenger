const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  members: [
    { type: String }
  ],
  messages: [
    {
      type: String,
      owner: String,
      date: Date,
    }
  ]
});

chatSchema.static.createChat = function (members) {
  this.create({ members });
};

module.exports = new mongoose.model('Chat', chatSchema)
