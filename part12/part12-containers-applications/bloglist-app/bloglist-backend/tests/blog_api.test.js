const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const Blog = require('../models/Blogs')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/User')

const api = supertest(app)

const getToken =  async () => {
  await helper.createUserInDb()
  let response = await api.post('/api/login')
    .send({ username: 'testUser', password: 'secretPassword' })
  return response.body.token
}

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await Blog.insertMany(helper.initBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initBlogs.length)
  })

  test('a specific blog is within the returned titles', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(e => e.title)
    assert.strictEqual(titles.includes('React patterns'), true)
  })

  test('a blog has property id ', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]

    assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, 'id'), true)
    assert.ok(!('_id' in blog))
  })

  describe('addition of a new blog', () => {

    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      }
      const token = await getToken()
      console.log(token)
      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      const title = blogs.map(r => r.title)

      assert.strictEqual(blogs.length, helper.initBlogs.length + 1)

      assert(title.includes(newBlog.title))
    })

    test('a valid blog can not be added by an unauthorized user', async () => {
      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
      }
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogs = await helper.blogsInDb()

      assert.strictEqual(blogs.length, helper.initBlogs.length)
    })

    test('blog without title or url is not added', async () => {
      const blogWithoutTitle = {
        author: 'X',
        likes: 0,
        url: 'http://localhost'
      }

      const blogWithoutURL = {
        title: 'test title',
        author: 'X',
        likes: 0,
      }
      const token = await getToken()

      await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      let blogsInDBAfterSave = await helper.blogsInDb()
      assert.strictEqual(blogsInDBAfterSave.length, helper.initBlogs.length)

      await api
        .post('/api/blogs')
        .send(blogWithoutURL)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)

      blogsInDBAfterSave = await helper.blogsInDb()

      assert.strictEqual(blogsInDBAfterSave.length, helper.initBlogs.length)
    })


    test('blog without likes is added with likes value 0', async () => {
      const blogWithoutTitle = {
        title: 'Lorem Ipsum',
        author: 'X',
        url: 'https://react.dev/learn/queueing-a-series-of-state-updates'
      }
      const token = await getToken()

      const response = await api
        .post('/api/blogs')
        .send(blogWithoutTitle)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)

      assert.strictEqual(response.body.likes, 0)
    })
  })

  describe('viewing a specific blog', () => {
    test('a specific blog can be viewed', async () => {
      const blogsInDB = await helper.blogsInDb()
      const blog = blogsInDB[0]

      const responseBlog = await api
        .get(`/api/blogs/${blog.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(responseBlog.body, blog)
    })
  })

  describe('updating of a blog', () => {
    test('likes in a specific blog can be updated', async () => {
      const blogsInDBAtStart = await helper.blogsInDb()
      const blog = blogsInDBAtStart[0]
      const expectedLikes = blog.likes + 1
      blog.likes = expectedLikes

      const updatedBlog = await api
        .put(`/api/blogs/${blog.id}`)
        .send(blog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(updatedBlog.body.likes, expectedLikes)
    })
  })

  describe('deletion of a blog', () => {
    test('a blog can be deleted', async () => {
      const blogToDelete = {
        title: 'Deleting',
        author: 'Author',
        url: 'http://delete.com',
        likes: 0,
      }
      const token = await getToken()

      const savedBlogResponse = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogToDelete)

      const blogsAtStart = await helper.blogsInDb()
      await api
        .delete(`/api/blogs/${savedBlogResponse.body.id}`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(n => n.title)
      assert(!titles.includes(blogToDelete.title))

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    })
  })
})


after(async () => {
  await mongoose.connection.close()
})
