const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to the database')
  })
  .catch((err) => {
    logger.error('error connection to MongoDB:', err.message)
  })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs',  blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app