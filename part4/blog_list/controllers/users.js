const User = require('../models/User')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body
  if(!password || password.length < 3) {
    return res.status(400).json({ error: 'Password must be at least 3 characters' })
  }
  try {
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
      username,
      name,
      passwordHash
    })
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({})
      .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
})

module.exports = usersRouter