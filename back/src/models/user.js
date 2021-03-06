const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Chat = require('./chat');

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  friends: [{
    fullName: {
      type: String,
      required: true,
    },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }
  }],
  avatar: {
    type: String,
    default: "https://firebasestorage.googleapis.com/v0/b/vue-elbrus-crm.appspot.com/o/avatar%2Fpetr.jpg?alt=media&token=2b1660a7-5133-411f-9da1-7012eeb2cecf"
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '5h' })
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

userSchema.statics.findByCredentials = async function (login, password) {
  const user = await this.findOne({ login })
  if (!user) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  return user
}

module.exports = new mongoose.model('User', userSchema);
