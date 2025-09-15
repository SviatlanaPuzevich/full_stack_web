const {PORT} = require ('./utils/config');
const {sequelize, runMigrations} = require('./utils/db');
const app = require('./app')

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    console.log(err)
    return process.exit(1)
  }

  return null
}

const start = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ DB connected')
    await runMigrations()

    await sequelize.sync()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('DB error:', err)
  }
}

start()
