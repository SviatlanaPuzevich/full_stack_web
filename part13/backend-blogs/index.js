const {PORT} = require ('./utils/config');
const sequelize = require('./utils/db');
const app = require('./app')

const start = async () => {
  try {
    await sequelize.authenticate()
    console.log('✅ DB connected')

    await sequelize.sync()

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('DB error:', err)
  }
}

start()
