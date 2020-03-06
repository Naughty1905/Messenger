
const express = require('express');
const User = require('../models/user')

const router = express.Router()


// Create new user
router.post('/', async (req, res) => {
  const { login, email, password } = req.body;
  console.log(login)
  try {
    const user = new User({ login, email, password });
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Wrong password or email' })
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }

})

module.exports = router
