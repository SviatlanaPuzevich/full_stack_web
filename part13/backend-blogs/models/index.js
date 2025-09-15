const Blog = require('./Blogs')
const User = require('./User')


User.hasMany(Blog)
Blog.belongsTo(User)

module.exports = {
  Blog, User
}