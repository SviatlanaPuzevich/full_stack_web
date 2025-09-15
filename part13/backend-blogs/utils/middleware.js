const Blog = require('../models/Blogs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted parameter' })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const blogFinder = async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findByPk(id)
  if (!blog) {
    return response.status(400).json({ error: 'blogId missing or not valid' })
  }
  request.blog = blog
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const id = request.decodedToken.id
  const user = await User.findByPk(id)
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }
  request.user = user
  next()
}


module.exports = { unknownEndpoint, errorHandler, blogFinder, userExtractor, tokenExtractor }