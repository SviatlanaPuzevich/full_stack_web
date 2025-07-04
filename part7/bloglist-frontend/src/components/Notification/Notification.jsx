import styles from './Notification.module.css'

export const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }
  return <div className={notification.type ? styles[notification.type] : styles.error}>{notification.message}</div>
}
