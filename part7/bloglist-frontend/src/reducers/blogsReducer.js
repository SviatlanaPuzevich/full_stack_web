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
    createComment: (state, action) => {
      const { blogId, savedComment } = action.payload
      return state.map((blog) => {
        if (blog.id !== blogId) return blog
        return {
          ...blog,
          comments: [...(blog.comments || []), savedComment],
        }
      })
    },
  },
  selectors: {
    getBlogById: (state, id) => {
      return state.find((blog) => blog.id === id)
    },
  },
})

export const { create, getAll, removeBlog, update, createComment } =
  blogsSlice.actions
export default blogsSlice.reducer
export const { getBlogById } = blogsSlice.selectors

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
      dispatch(notify('Blog updated successfully.', 'info'))
    } catch (error) {
      dispatch(notify(error.response.data.error))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
    dispatch(notify('Blog deleted', 'info'))
  }
}

export const createNewComment = (blogId, comment) => {
  return async (dispatch) => {
    console.log('reducer ', comment)
    try {
      console.log('reducer ', comment)
      const savedComment = await blogService.createComment(blogId, {
        text: comment,
      })
      dispatch(createComment({ blogId, savedComment }))
      dispatch(notify('Comment added successfully', 'success'))
    } catch (error) {
      dispatch(notify(error.response.data.error))
    }
  }
}
