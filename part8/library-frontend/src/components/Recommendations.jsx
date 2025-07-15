import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries.js'
import { BookTable } from './BookTable.jsx'

export const Recommendations = () => {
  const result = useQuery(FAVORITE_GENRE)
  console.log(result.data)

  const favouriteGenre = result.data?.me?.favoriteGenre
  const booksResult = useQuery(ALL_BOOKS, {
    variables: {
      genre: favouriteGenre,
    },
    skip: !favouriteGenre,
  })
  console.log(booksResult, 'BOOK RESULT')
  if (result.loading || booksResult.loading) {
    return <div>loading...</div>
  }
  const recommendedBooks = booksResult.data.allBooks
  console.log(recommendedBooks, '  BOOKs')
  return (
    <>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{favouriteGenre}</b>
      </p>
      <BookTable books={recommendedBooks} />
    </>
  )
}
