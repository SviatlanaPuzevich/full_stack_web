const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  return blogs.reduce((fav, blog) => blog.likes > (fav.likes || 0) ? blog : fav)
}

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorBlogs = _.map(groupedByAuthor, (blogs, author) => ({
    author,
    blogs: blogs.length
  }))
  return _.maxBy(authorBlogs, 'blogs')
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorLikes = _.map(groupedByAuthor, (blogs, author) =>
    ({
      author,
      likes: _.sumBy(blogs, 'likes')
    }))
  return _.maxBy(authorLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}