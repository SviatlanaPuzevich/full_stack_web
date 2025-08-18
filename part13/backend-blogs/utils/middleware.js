const Blog = require('../models/Blogs')


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
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

module.exports = { unknownEndpoint, errorHandler, blogFinder }