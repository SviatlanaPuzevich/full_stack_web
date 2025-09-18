import Blog from './Blog/Blog.jsx'
import { useEffect, useRef, useState } from 'react'
import blogService from '../../services/blogs.js'
import { BlogForm } from './BlogForm/BlogForm.jsx'
import { Togglable } from '../Togglable/Togglable.jsx'

export const BlogList = ({ user, setMessage }) => {
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  useEffect( () => {
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
      return savedBlog
    } catch (error) {
      setMessage(error.message)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    } catch (error) {
      setMessage(error.message)
    }
  }

  const updateBlog = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate)
      setBlogs(blogs.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      ))
      return updatedBlog
    } catch (error) {
      setMessage(error.message)
    }
  }
  if (!user) {
    return null
  }

  return (
    <>
      <h2>Blogs</h2>
      <Togglable showLabel="create blog" hideLabel = "cancel" ref={blogFormRef} >
        <BlogForm user={user} createBlog={createBlog}/>
      </Togglable>
      {blogs.sort((a,b) => b.likes - a.likes).map((blog) => (<Blog key={blog.id} blog={blog} user={user} deleteBlog={deleteBlog} update={updateBlog}/>))}
    </>
  )
}