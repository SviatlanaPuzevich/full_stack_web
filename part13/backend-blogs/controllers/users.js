const {User, Blog} = require('../models')
const usersRouter = require('express').Router()

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll(
      {
        include: {
          model: Blog
        }
      }
    )
    res.json(users)
  } catch (error) {
    next(error)
  }
})


usersRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})


usersRouter.put('/:username', async (req, res, next) => {
  const username = req.params.username
  try {
    const user = await User.findOne( {
      where: {
        username
      }
    })
    if (!user){
      return res.status(400)
    }
    user.name = req.body.name
    const updatedUser = await user.save()
    res.json(updatedUser)
  } catch (error) {
    return next(error)
  }
})

module.exports = usersRouter