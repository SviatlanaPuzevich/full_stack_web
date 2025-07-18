const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const { GraphQLError } = require('graphql/error')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser,
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => {
      return Book.collection.countDocuments()
    },
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        filter.author = author._id
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] }
      }
      const books = await Book.find(filter)
      return books
    },
    allAuthors: async () => {
      const authors = await Author.find({})
      return authors
    },
    allGenres: async () => {
      const genres = await Book.distinct('genres')
      return genres
    }
  },
  Author: {
    bookCount: async (root, args, context) => {
      return context.loaders.book.load(root._id)
    }
  },
  Book: {
    author: async (root) => {
      return await Author.findById(root.author)
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      let user = await User.create({ ...args })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'qwerty') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        author = await newAuthor.save()
      }
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      author.born = args.setBornTo

      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Update author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: async () => (pubsub.asyncIterableIterator('BOOK_ADDED'))
    }
  }
}

module.exports = resolvers