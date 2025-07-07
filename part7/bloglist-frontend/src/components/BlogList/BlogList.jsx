import Blog from './Blog/Blog.jsx'
import { useEffect, useRef, useState } from 'react'
import blogService from '../../services/blogs.js'
import { BlogForm } from './BlogForm/BlogForm.jsx'
import { Togglable } from '../Togglable/Togglable.jsx'
import { useNotificationDispatch } from '../Notification/NotificationContext.jsx'

export const BlogList = ({ user }) => {
  const [blogs, setBlogs] = useState([])
  const notificationDispatch = useNotificationDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsInDb = await blogService.getAll()
      setBlogs(blogsInDb)
    }
    fetchBlogs()
  }, [])
  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const savedBlog = await blogService.create(blog)
      setBlogs([...blogs, savedBlog])
      notificationDispatch({
        type: 'SHOW',
        notification: { message: 'Blog created successfully.', type: 'success' }
      })
      return savedBlog
    } catch (error) {
      notificationDispatch(
        {
          type: 'SHOW',
          notification: { message: error.response.data.error, type: 'error' }
        })
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      notificationDispatch({
        type: 'SHOW',
        notification: { message: 'Blog deleted successfully.', type: 'update' }
      })
    } catch (error) {
      notificationDispatch(
        {
          type: 'SHOW',
          notification: { message: error.response.data.error, type: 'error' }
        })
    }
  }

  const updateBlog = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate)
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
      notificationDispatch({
        type: 'SHOW',
        notification: { message: 'Blog updated successfully.', type: 'update' }
      })
      return updatedBlog
    } catch (error) {
      notificationDispatch(
        {
          type: 'SHOW',
          notification: { message: error.response.data.error, type: 'error' }
        })
    }
  }
  if (!user) {
    return null
  }

  return (
    <>
      <h2>Blogs</h2>
      <Togglable showLabel="create blog" hideLabel="cancel" ref={blogFormRef}>
        <BlogForm user={user} createBlog={createBlog}/>
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            deleteBlog={deleteBlog}
            update={updateBlog}
          />
        ))}
    </>
  )
}
