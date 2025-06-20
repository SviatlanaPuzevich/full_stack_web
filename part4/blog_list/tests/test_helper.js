const Blog = require('../models/Blogs')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const initBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com',
    likes: 2
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 10
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const createUserInDb = async () => {
  const passwordHash = bcrypt.hashSync('secretPassword', 10)
  const user = new User({ username: 'testUser', name: 'userName',  passwordHash })
  await user.save()
}

module.exports = { initBlogs, blogsInDb, usersInDb, createUserInDb }