import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'
import { notify } from './notificationReducer.js'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    create: (state, action) => {
      return [...state, action.payload]
    },
    getAll: (state, action) => {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    update: (state, action) => {
      return state
        .map((blog) => (blog.id === action.payload.id ? action.payload : blog))
        .sort((a, b) => b.likes - a.likes)
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload)
    },
  },
})

export const { create, getAll, removeBlog, update } = blogsSlice.actions
export default blogsSlice.reducer

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(getAll(blogs))
  }
}

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.create(blog)
      dispatch(create(savedBlog))
      dispatch(notify('Blog created successfully', 'success'))
    } catch (error) {
      dispatch(notify(error.response.data.error))
    }
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch(update(updatedBlog))
      dispatch(notify('Blog updated successfully.', 'update'))
    } catch (error) {
      dispatch(notify(error.response.data.error))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
    dispatch(notify('Blog deleted', 'update'))
  }
}
