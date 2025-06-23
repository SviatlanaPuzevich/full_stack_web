import loginService from '../services/login.js'
import blogService from '../services/blogs.js'
import { useState } from "react";

const LOGGED_USER_ITEM_NAME = 'loggedBlogAppUser'

export const LoginFrom = ({user, setUser, setErrorMessage}) => {
   const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem( LOGGED_USER_ITEM_NAME
        , JSON.stringify(user)
      )
      blogService.setToken(user.token)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(LOGGED_USER_ITEM_NAME)
    setUser(null)
  }
  if (!user) {
    return (
      <>
        <h2>Login into application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }
  return (<div>{`${user.name} logged in `} <button onClick={handleLogout}>logout</button></div>)
}