const { Blog, ReadingList } = require('../models')
const { userExtractor } = require('../utils/middleware')
const User = require('../models/User')
const readingListsRouter = require('express').Router()


readingListsRouter.post('/', async (request, response, next) => {
  try {
    const { userId, blogId } = request.body
    const blog = await Blog.findByPk(blogId)
    if (!blog) {
      return response.status(404).json({ error: 'blog is not found' })
    }
    const user = await User.findByPk(userId)
    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }
    const record = await ReadingList.create({ userId, blogId })
    response.status(201).json(record)
  } catch (error) {
    next(error)
  }
})

readingListsRouter.put('/:id', userExtractor, async (request, response, next) => {
  try {
    const record = await ReadingList.findByPk(request.params.id)
    if (!record) {
      return response.status(404).json({ error: 'no such blog in the reading list' })
    }
    if (record.userId !== request.user.id) {
      return response.status(400).json({ error: 'the blog is not in your reading list' })
    }
    if (!record.read) {
      const updatedRecord = await record.save()
      response.json(updatedRecord)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = readingListsRouter