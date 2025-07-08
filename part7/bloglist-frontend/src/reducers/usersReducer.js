import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users.js'

const usersSlice = createSlice({
  initialState: [],
  name: 'users',
  reducers: {
    getUsers: (state, { payload }) => {
      return payload
    },
  },
  selectors: {
    getUserById: (state, id) => {
      return state.find((user) => user.id === id)
    },
  },
})

export const { getUsers } = usersSlice.actions
export const { getUserById } = usersSlice.selectors
export default usersSlice.reducer

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(getUsers(users))
  }
}
