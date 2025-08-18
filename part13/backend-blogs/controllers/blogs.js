const Blog = require('../models/Blogs')
const { blogFinder } = require('../utils/middleware')
const blogsRouter = require('express').Router()


blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll()
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

blogsRouter.post('/', async (req, res, next) => {
  try {
    const savedBlog = await Blog.create(req.body)
    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', blogFinder, async (req, res, next) => {
  try {
    const blog = req.blog
    await blog.destroy()
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