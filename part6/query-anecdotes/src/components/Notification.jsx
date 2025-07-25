import { useContext } from 'react'
import NotificationContext from './NotificationContext.jsx'


const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const [notification, notificationDispatch] = useContext(NotificationContext)

  if (!notification) return null
  setTimeout(() => {
    notificationDispatch({ type: 'HIDE' })
  }, 5000)
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification

