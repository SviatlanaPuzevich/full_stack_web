import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW' :
      return action.notification
    case 'HIDE' :
      return ''
    default:
      return state
  }
}


const NotificationContext = createContext()
export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}
export default NotificationContext

export const useNotificationDispatch = () => {
  const contextValues = useContext(NotificationContext)
  return contextValues[1]
}