import styles from './Message.module.css'

export const Message = ({ message }) => {
  if (!message) {
    return null
  }
  return (
    <div className={styles.success}>{message}</div>
  )
}