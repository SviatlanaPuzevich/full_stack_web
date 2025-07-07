import loginService from '../../services/login.js'
import { useContext, useState } from 'react'
import styles from './LoginForm.module.css'
import { useNotificationDispatch } from '../contextes/NotificationContext.jsx'
import userContext from '../contextes/UserContext.jsx'

export const LoginFrom = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notificationDispatch = useNotificationDispatch()
  const [user, userDispatch] = useContext(userContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      userDispatch({ type: 'LOGIN', user })
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({
        type: 'SHOW',
        notification: { message: 'Wrong credentials', type: 'error' },
      })
    }
  }

  const handleLogout = () => userDispatch({ type: 'LOGOUT' })

  if (!user) {
    return (
      <>
        <h2>Login into application</h2>
        <form onSubmit={handleLogin} className={styles.formGrid}>
          <div className={styles.formRow}>
            <label>
              username
              <input
                data-testid="username"
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div className={styles.formRow}>
            <label>
              password
              <input
                data-testid="password"
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
  return (
    <div>
      <span>{`${user.name} logged in`}</span>
      <button data-testid="logout" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}
