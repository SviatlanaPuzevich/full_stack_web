const { DATABASE_URL } = require('./config')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {},
});

module.exports = sequelize;