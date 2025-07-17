const Book = require('../models/Book')
const DataLoader = require('dataloader')


const batchBooksCount = async (authorIds) => {
  const books = await Book.find({
      author: {
          $in: authorIds,
      },
  })
  return authorIds.map(authorId => books.filter(book => book.author.toString() === authorId.toString()).length)
}

module.exports = new DataLoader(authorIds =>  batchBooksCount(authorIds))