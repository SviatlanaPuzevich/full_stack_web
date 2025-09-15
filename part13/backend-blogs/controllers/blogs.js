const {Blog, User} = require('../models')
const { blogFinder, userExtractor } = require('../utils/middleware')
const models = require('../models')
const blogsRouter = require('express').Router()


blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
        include: {
          model: User,
          attributes: { exclude: ['userId'] }
        }
      }
    )
    res.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', blogFinder, async (req, res, next) => {
  try {
    res.json(req.blog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', userExtractor, async (req, res, next) => {
  try {
    const userId = req.user.id
    const savedBlog = await Blog.create({ userId, ...req.body })
    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    const userId = req.user.id
    const blogId = req.params.id
    const deleted = await Blog.destroy( {
      where: {
        id: blogId,
        userId: userId
      }
    })
    if (deleted === 0) {
      return res.status(400).json({ error: `Blog not found or you don't have permission` })
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', blogFinder, async (req, res, next) => {
  const { likes } = req.body
  try {
    const blog = req.blog
    blog.likes = likes
    const updatedBlog = await blog.save()
    res.json(updatedBlog)
  } catch (error) {
    return next(error)
  }
})

module.exports = blogsRouter