import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser} from '../../reducers/userReducer.js'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export const LoginFrom = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    const loggedUser = await dispatch(loginUser(password, username))

    setUsername('')
    setPassword('')
    if (loggedUser) {
      navigate('/blogs')
    }
  }


  return (
    <>
      <h2>Login into application</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label column={1}>user name</Form.Label>
          <Form.Control data-testid="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder="Enter username"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label column={1}>password</Form.Label>
          <Form.Control data-testid="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        placeholder="Enter password"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </>
  )
}
