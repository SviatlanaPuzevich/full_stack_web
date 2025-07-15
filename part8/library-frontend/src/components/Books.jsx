import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries.js'
import { useState } from 'react'
import { BookTable } from './BookTable.jsx'

const Books = () => {
  const [filter, setFilter] = useState('all genres')
  const result = useQuery(ALL_BOOKS)
  if (result.loading) {
    return <div>Loading...</div>
  }

  const books = result.data.allBooks
  const genres = [
    'all genres',
    ...Array.from(new Set(books.flatMap((book) => book.genres))),
  ]
  const filteredBooks =
    filter === 'all genres'
      ? books
      : books.filter((book) => book.genres.includes(filter))
  return (
    <div>
      <h2>books</h2>
      <p>in genre {filter}</p>

      <BookTable books={filteredBooks} />
      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => {
              setFilter(genre)
            }}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
