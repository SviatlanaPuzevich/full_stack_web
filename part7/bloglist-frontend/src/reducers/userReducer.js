import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login.js'
import blogService from '../services/blogs.js'
import { notify } from './notificationReducer.js'

const LOGGED_USER_ITEM_NAME = 'loggedBlogAppUser'

const userSlice = createSlice({
  initialState: null,
  name: 'user',
  reducers: {
    getUser: (state, action) => {
      let user = null
      const loggedUserJSON = window.localStorage.getItem(LOGGED_USER_ITEM_NAME)
      console.log(loggedUserJSON)
      if (loggedUserJSON) {
        user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
      }
      return user
    },
    login: (state, action) => {
      return action.payload
    },
    logout: () => {
      window.localStorage.removeItem(LOGGED_USER_ITEM_NAME)
      return null
    },
  },
})

export const { login, logout, getUser } = userSlice.actions
export default userSlice.reducer

export const loginUser = (password, username) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(LOGGED_USER_ITEM_NAME, JSON.stringify(user))
      dispatch(login(user))
    } catch (e) {
      dispatch(notify('Wrong credentials', 'error'))
    }
  }
}
