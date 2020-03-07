const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
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
