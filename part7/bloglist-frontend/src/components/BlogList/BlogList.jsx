import { useRef } from 'react'
import { BlogForm } from './BlogForm/BlogForm.jsx'
import { Togglable } from '../Togglable/Togglable.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog } from '../../reducers/blogsReducer.js'
import { Link } from 'react-router-dom'
import styles from './BlogList.module.css'

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
        <div key={blog.id} className={styles.blogContainer}>
          <Link
            to={`/blogs/${blog.id}`}
          >{`${blog.title} ${blog.author} `}</Link>
        </div>
      ))}
    </>
  )
}
