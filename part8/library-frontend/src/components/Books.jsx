import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries.js'
import { useState } from 'react'
import { BookTable } from './BookTable.jsx'

const Books = () => {
  const [filter, setFilter] = useState('')
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: filter,
    },
  })
  const genresResult = useQuery(ALL_GENRES)
  if (result.loading || genresResult.loading) {
    return <div>Loading...</div>
  }

  const genres = genresResult.data.allGenres
  const books = result.data.allBooks
  return (
    <div>
      <h2>books</h2>
      <p>in genre {filter ? filter : 'all genres'}</p>
      <BookTable books={books} />
      <div>
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => {
              setFilter(genre)
              result.refetch({genre})
            }}
          >
            {genre}
          </button>
        ))}
        <button
          key="all genres"
          onClick={() => {
            setFilter('')
            result.refetch({genre: ''})
          }}
        >
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
