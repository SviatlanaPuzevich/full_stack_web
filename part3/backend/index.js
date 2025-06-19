require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()
app.use(express.static('dist'))
app.use(express.json())
morgan.token('person', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time :person'))


app.get('/api/persons', (request, response, next) => {
  Person.find({}).then((result) => {
    if (result) {
      response.send(result)
    } else {
      response.status(404).send('person by id Not Found')
    }
  })
    .catch(error => next(error))
})


app.get('/api/info', (request, response, next) => {
  Person.countDocuments().then((count) => {
    response.send(`<p>phonebook has info for ${count} people</p><p>${new Date()}</p>`)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then((result) => {
    response.send(result)
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.deleteOne({ _id: id } ).then(() => {
    response.status(204).end()
  }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  Person.findOne({ name: body.name }).then(existing => {
    if (existing) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    const person = new Person({
      name: body.name, number: body.number,
    })
    return person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  Person.findById (request.params.id)
    .then((person) => {
      if (!person) {
        return response.status(404).end()
      }
      person.name = request.body.name
      person.number = request.body.number
      return person.save().then(updatedPerson => response.json(updatedPerson))
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})