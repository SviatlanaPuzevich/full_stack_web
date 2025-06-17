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
  let authorMap = new Map()
  blogs.forEach(blog => authorMap.set(blog.author, (authorMap.get(blog.author) || 0) + 1))
  let result = {blogs: 0};
  for (let [author, blogs] of authorMap.entries()) {
    if (blogs > result.blogs) {
      result = { author, blogs }
    }
  }
  return result
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) return null
  let authorMap = new Map()
  blogs.forEach(blog => authorMap.set(blog.author, blog.likes + (authorMap.get(blog.author) || 0)))
  let result = {likes: -1}
  for (let [author, likes] of authorMap.entries()) {
    if (likes > result.likes) {
      result = { author, likes }
    }
  }
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}