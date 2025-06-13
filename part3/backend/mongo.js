const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log("gibe password as argument")
  process.exit(1)
}

const password = encodeURIComponent(process.argv[2])
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://Phonebook:${password}@cluster0.uit4qao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({name, number})

Person.find({}).then((result) => {
  console.log("phonebook:")
  result.forEach(person => {
    console.log(person.name)
  })
  mongoose.connection.close()
})

person.save().then((result) => {
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  mongoose.connection.close()
})