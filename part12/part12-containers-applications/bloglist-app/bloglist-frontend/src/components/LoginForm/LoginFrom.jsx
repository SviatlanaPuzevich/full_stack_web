import loginService from '../../services/login.js'
import blogService from '../../services/blogs.js'
import { useState } from 'react'
import styles from './LoginForm.module.css'

const LOGGED_USER_ITEM_NAME = 'loggedBlogAppUser'

export const LoginFrom = ({ user, setUser, setErrorMessage }) => {
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
      window.localStorage.setItem(LOGGED_USER_ITEM_NAME
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
        <form onSubmit={handleLogin} className={styles.formGrid}>
          <div className={styles.formRow}>
            <label>username
              <input  data-testid='username'
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}/>
            </label>
          </div>
          <div className={styles.formRow}>
            <label>
              password
              <input  data-testid='password'
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }
  return (<div><span>{`${user.name} logged in`}</span>
    <button data-testid="logout" onClick={handleLogout}>logout</button>
  </div>)
}