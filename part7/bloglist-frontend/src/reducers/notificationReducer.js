import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    visible: false,
  },
  reducers: {
    showNotification: (state, action) => {
      return action.payload
    },
    hideNotification: () => {
      return {
        message: '',
        visible: false,
      }
    },
  },
})

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const notify = (message, type = 'error') => {
  return (dispatch) => {
    console.log('notify', message, type)
    dispatch(showNotification({ message, type, visible: true }))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 3000)
  }
}
