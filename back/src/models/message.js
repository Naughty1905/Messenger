const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chate: {
    type: mongoose.Schema.ObjectId,
    ref: 'Chat'
  },
  constent: {
    type: String,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date
  }
});

module.exports = new mongoose.model('Messege', messageSchema);
