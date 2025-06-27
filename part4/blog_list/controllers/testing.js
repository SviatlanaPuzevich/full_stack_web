const Blog = require('../models/Blogs')
const User = require('../models/User')
const router = require('express').Router()

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router