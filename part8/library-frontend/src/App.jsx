import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { LoginForm } from './components/LoginForm'
import { Link, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { Notification } from './components/Notification.jsx'
import { Recommendations } from './components/Recommendations.jsx'

const App = () => {
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem('libraryAppUser'))
  )
  const client = useApolloClient()

  const logout = () => {
    localStorage.removeItem('libraryAppUser')
    setToken(null)
    client.resetStore()
  }
  return (
    <div>
      <Notification setMessage={setMessage} message={message} />
      <div>
        <Link to="/authors">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>
        {token ? (
          <>
            <Link to="/recommendations">
              <button>recommended</button>
            </Link>
            <Link to="/addBook">
              <button>add book</button>
            </Link>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>login</button>
          </Link>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route
          path="login"
          element={<LoginForm setToken={setToken} setMessage={setMessage} />}
        />
        <Route path="authors" element={<Authors />} />
        <Route path="books" element={<Books />} />
        <Route path="addBook" element={<NewBook setMessage={setMessage} />} />
        <Route path="recommendations" element={<Recommendations />} />
      </Routes>
    </div>
  )
}

export default App
