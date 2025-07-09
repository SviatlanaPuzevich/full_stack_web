import { Alert } from 'react-bootstrap'

export const Notification = ({ notification }) => {
  if (!notification.visible) {
    return null
  }
  return (
    <Alert variant={notification.type ? notification.type : 'danger'}>
      {notification.message}
    </Alert>
  )
}
