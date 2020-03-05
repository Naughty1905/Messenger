const { Schema, model } = require('mongoose');



const ChatSchema = new Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
      unique: true
    }]
})


module.exports = model('Chat', ChatSchema)
