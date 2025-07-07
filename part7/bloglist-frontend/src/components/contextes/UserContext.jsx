import { createContext, useContext, useReducer } from 'react'
import blogService from '../../services/blogs.js'

const LOGGED_USER_ITEM_NAME = 'loggedBlogAppUser'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      window.localStorage.setItem(
        LOGGED_USER_ITEM_NAME,
        JSON.stringify(action.user)
      )
      blogService.setToken(action.user.token)
      return action.user
    }
    case 'LOGOUT': {
      window.localStorage.removeItem(LOGGED_USER_ITEM_NAME)
      return null
    }
    default:
      return state
  }
}

const UserContext = createContext()
const initialUser = () => {
  const userJSON = window.localStorage.getItem(LOGGED_USER_ITEM_NAME)
  if (!userJSON) return null
  const user = JSON.parse(userJSON)
  blogService.setToken(user.token)
  return user
}
export const UserProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, initialUser())
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}
export default UserContext

export const useUserDispatch = () => {
  const contextValues = useContext(UserContext)
  return contextValues[1]
}
export const useUser = () => {
  const contextValues = useContext(UserContext)
  return contextValues[0]
}
