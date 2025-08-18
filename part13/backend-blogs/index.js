const {PORT} = require ('./utils/config');
const sequelize = require('./utils/db');
const blogsRouter = require('./controllers/blogs.js')
const express = require('express')

const app = express()
app.use(express.json())
app.use('/api/blogs', blogsRouter);

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
