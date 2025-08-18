const Blog = require( '../models/Blogs')
const blogsRouter = require('express').Router()


blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      res.json(blog)
    } else {
      return res.status(404).end()
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const savedBlog = await Blog.create( req.body)
    res.status(201).json(savedBlog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const blogId = req.params.id;
    await Blog.destroy({
      where: {
        id: blogId
      }
    });
    res.status(204).end()
  } catch (error) {
    return res.status(400).json({ error })
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
      return res.status(404).end()
    }
    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes
    const updatedBlog = await blog.save()
    res.json(updatedBlog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = blogsRouter