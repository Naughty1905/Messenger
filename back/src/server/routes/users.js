const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../models/user');

const router = express.Router();
const auth = require('../../middleware/auth');

// Create new user
router.post('/', async (req, res) => {
  const { login, email, password, fullName } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ login, email, password: hashedPassword, fullName });
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
    res.send({
      login,
      token
    });
  } catch (error) {
    res.status(400).send(error);
  }

})

router.get('/contacts/new', async (req, res) => {
  const { login } = req.body;
  try {
    const newContact = await User.findOne({ login });
    console.log(newContact)
    res.status(200).json(newContact);
  } catch (error) {
    res.status(404).send(error);
  }
})

router.delete('/', (req, res) => {
  const { messeges } = req.body;
})


module.exports = router;
