const blogsRouter = require('express').Router()
const Blog = require('../models/Blogs')
const Comment = require('../models/Comments')
const { userExtractor, blogExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', { username: 1, name: 1 })
      .populate('comments', { text: 1 })
    res.json(blogs)
  } catch (err) {
    next(err)
  }
})


blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('/', userExtractor, async (req, res, next) => {
  const body = req.body
  try {
    const user = req.user
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    const updatedUser = await user.save()
    savedBlog.user = updatedUser
    res.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    const user = req.user
    const blog = await Blog.findById(req.params.id)
    if (blog && blog.user.toString() !== user._id.toString() ) {
      return res.status(403).json({ error: 'forbidden to delete blog' })
    }
    await Blog.findByIdAndDelete(req.params.id)
    user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
    await user.save()
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).end()
    }
    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes
    const updatedBlog = await blog.save()
    res.json(updatedBlog)
  } catch (err) {
    next(err)
  }
})


blogsRouter.post('/:id/comments', blogExtractor, async (req, res, next) => {
  const body = req.body
  try {
    const blog = req.blog
    const comment = new Comment({
      text: body.text,
      blog: blog._id,
    })
    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    const updatedBlog = await blog.save()
    savedComment.blog = updatedBlog
    res.status(201).json(savedComment)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter