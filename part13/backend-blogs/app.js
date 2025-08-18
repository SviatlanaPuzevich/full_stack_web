const blogsRouter = require('./controllers/blogs.js')
const middleware = require('./utils/middleware')
const express = require('express')

const app = express()
app.use(express.json())
app.use('/api/blogs', blogsRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app