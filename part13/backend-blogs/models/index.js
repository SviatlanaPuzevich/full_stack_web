const Blog = require('./Blogs')
const User = require('./User')
const ReadingList = require('./ReadingLists')


User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: ReadingList, as: 'readingList'})
Blog.belongsToMany(User, {through: ReadingList, as: 'usersWithAccess'})

module.exports = {
  Blog, User, ReadingList
}