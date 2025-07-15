import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries.js'
import { useNavigate } from 'react-router-dom'

export const LoginForm = ({ setToken, setMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage(error.graphQLErrors[0].message)
    },
  })
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('libraryAppUser', JSON.stringify(token))
      navigate('/books')
    }
  }, [result.data])
  const handleLogin = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username:
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password:
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}
