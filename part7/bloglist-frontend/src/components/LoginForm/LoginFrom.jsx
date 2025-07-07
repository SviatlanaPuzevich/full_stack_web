import { useState } from 'react'
import styles from './LoginForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, logout } from '../../reducers/userReducer.js'

export const LoginFrom = () => {
  const user = useSelector((state) => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(password, username))
    setUsername('')
    setPassword('')
  }
  const handleLogout = () => dispatch(logout())

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
