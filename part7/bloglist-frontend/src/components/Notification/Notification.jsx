import styles from './Notification.module.css'
import NotificationContext from './NotificationContext.jsx'
import { useContext } from 'react'

export const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  if (!notification) return null
  setTimeout(() => {
    notificationDispatch({ type: 'HIDE' })
  }, 3000)
  return <div className={notification.type ? styles[notification.type] : styles.error}>{notification.message}</div>
}
