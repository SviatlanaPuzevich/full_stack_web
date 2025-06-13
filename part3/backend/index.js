require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

app.use(express.json())
morgan.token('person', (req) => {
  return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :response-time :person'))

app.use(express.static('dist'))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    response.send(result)
  })
})


app.get('/api/info', (request, response) => {
  Person.countDocuments().then((count) => {
    response.send(`<p>phonebook has info for ${count} people</p><p>${new Date()}</p>`)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person.findById(id).then((result) => {
    response.send(result)
  })
    .catch(error => {
      console.error(error);
      response.status(404).end();
    })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person.deleteOne({_id: id}).then(() => {
    response.status(204).end();
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  Person.findOne({name: body.name}).then(existing => {
    if (existing) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    }

    const person = new Person({
      name: body.name, number: body.number,
    })
    person.save().then(result => {
      console.log('saved')
      response.json(result)
    })
  })


})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})