import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Link, Route, Routes } from 'react-router-dom'

const App = () => {
  // const [page, setPage] = useState('authors');

  return (
    <div>
      <div>
        <button>
          <Link to="/authors">authors</Link>
        </button>
        <button>
          <Link to="/books">books</Link>
        </button>
        <button>
          <Link to="/addBook">add book</Link>
        </button>
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="authors" element={<Authors />} />
        <Route path="books" element={<Books />} />
        <Route path="addBook" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
