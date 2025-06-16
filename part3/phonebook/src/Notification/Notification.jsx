import styles from './notification.module.css';

export const Notification = ({message, type}) => {
  if (message === null) {
    return null;
  }
  return <div className={`${styles.notification} ${styles[type]}`}> {message}</div>
}
