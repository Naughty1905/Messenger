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
      content: {
        type: String,
        require: true
      },
      owner: {
        type: String,
        require: true
      },
      date: {
        type: String,
        default: Date.now()
      }
    }
  ]
});

chatSchema.static.createChat = function (members) {
  this.create({ members });
};

module.exports = new mongoose.model('Chat', chatSchema)
