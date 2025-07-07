import Blog from './Blog/Blog.jsx'
import { useRef } from 'react'
import { BlogForm } from './BlogForm/BlogForm.jsx'
import { Togglable } from '../Togglable/Togglable.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog } from '../../reducers/blogsReducer.js'

export const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const createBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createNewBlog(blog))
  }

  if (!user) {
    return null
  }

  return (
    <>
      <h2>Blogs</h2>
      <Togglable showLabel="create blog" hideLabel="cancel" ref={blogFormRef}>
        <BlogForm user={user} createBlog={createBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </>
  )
}
