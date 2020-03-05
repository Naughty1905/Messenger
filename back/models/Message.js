const { Schema, model } = require('mongoose');



const MessageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
    unique: true
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    require: true
  },
  content: {
    type: String
  },
  type: {
    type: String,
    enum: ['text', 'audio', 'img'],
    default: 'text'
  }
})


module.exports = model('Message', MessageSchema)
