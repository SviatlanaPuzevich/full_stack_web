const Blog = require('./Blogs')
const User = require('./User')
const Session = require('./Sessions')
const ReadingList = require('./ReadingLists')


User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, {through: ReadingList, as: 'readingList'})
Blog.belongsToMany(User, {through: ReadingList, as: 'usersWithAccess'})

Session.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Session, { foreignKey: 'user_id' })

module.exports = {
  Blog, User, ReadingList, Session
}