const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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


router.post('/contacts/', async (req, res) => {
  const { fullName, login, number, isAuth } = req.body;
  try {
    const user = jwt.decode(isAuth)._id;
    const currentUser = await User.findOne({ _id: user });
    const newContact = await User.findOne({ login });
    currentUser.friends.push(newContact._id)
    await currentUser.save()
    // let { friends } = currentUser;
    // const friendPromises = [];
    // friends = friends.map(async (friend) => {
    //   friendPromises.push(User.findOne({ _id: friend }))
    // });
    // friends = await Promise.all(friendPromises);
    // friends = friends.map(friend => friend.fullName)
    res.status(200).json(true);
  } catch (error) {
    res.status(404).send(error);
  }
})

router.post('/contacts/all', async (req, res) => {
  const { isAuth } = req.body;
  try {
    const user = jwt.decode(isAuth)._id;
    const currentUser = await User.findOne({ _id: user });
    let { friends } = currentUser;
    const friendPromises = [];
    friends = friends.map(async (friend) => {
      friendPromises.push(User.findOne({ _id: friend }))
    });
    friends = await Promise.all(friendPromises);
    friends = friends.map(friend => {
      return {
        fullName: friend.fullName,
        _id: friend._id
      }
    })
    res.status(200).json(friends);
  } catch (error) {
    res.status(404).send(error);
  }
})



module.exports = router;
