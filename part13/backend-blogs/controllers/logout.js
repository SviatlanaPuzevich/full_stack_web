const router = require('express').Router()
const { Session } = require('../models')
const { userExtractor } = require('../utils/middleware')

router.delete('/', userExtractor, async (request, response) => {
  const userId = request.user.id
  const token = request.get('authorization').substring(7)
  const session = await Session.destroy({
    where: {
      userId,
      token
    }
  })
  response.status(204).end()
})

module.exports = router