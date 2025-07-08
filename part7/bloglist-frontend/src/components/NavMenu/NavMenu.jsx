import { NavLink } from 'react-router-dom'
import styles from './NavMenu.module.css'
import { LoginFrom } from '../LoginForm/LoginFrom.jsx'

export const NavMenu = () => {
  return (
    <div className={styles.navContainer}>
      <NavLink
        to="/blogs"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        blogs
      </NavLink>
      <NavLink
        to="/users"
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        users
      </NavLink>
      <LoginFrom />
    </div>
  )
}
