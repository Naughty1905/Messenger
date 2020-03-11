const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Chat = require('../../models/chat')

const router = express.Router();
const auth = require('../../middleware/auth');

// Create new user
router.post('/', async (req, res) => {
  const { login, email, password, name, avatar } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ login, email, password: hashedPassword, fullName: name, avatar });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
})

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findByCredentials(login, password);
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Wrong password or login' });
    }
    const token = await user.generateAuthToken();
    res.json({
      login,
      token
    });
  } catch (error) {
    res.status(400).send(error);
  }

})

// Не используется
// router.get('/contacts/new', async (req, res) => {
//   const { login } = req.body;
//   try {
//     const newContact = await User.findOne({ login });
//     console.log(newContact)
//     res.status(200).json(newContact);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// })

router.post('/contacts/all', async (req, res) => {
  const { isAuth } = req.body;
  try {
    const user = jwt.decode(isAuth)._id;
    const currentUser = await User.findOne({ _id: user });
    let { friends } = currentUser;
    res.status(200).json(friends);
  } catch (error) {
    res.status(404).send(error);
  }
})



module.exports = router;
