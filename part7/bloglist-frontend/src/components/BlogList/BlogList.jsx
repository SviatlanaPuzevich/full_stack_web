import Blog from './Blog/Blog.jsx'
import { useRef } from 'react'
import blogService from '../../services/blogs.js'
import { BlogForm } from './BlogForm/BlogForm.jsx'
import { Togglable } from '../Togglable/Togglable.jsx'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '../contextes/UserContext.jsx'

export const BlogList = () => {
  const resultBlogs = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  })
  const user = useUser()

  const blogFormRef = useRef()

  const createBlog = () => {
    blogFormRef.current.toggleVisibility()
  }

  if (!user) {
    return null
  }
  if (resultBlogs.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h2>Blogs</h2>
      <Togglable showLabel="create blog" hideLabel="cancel" ref={blogFormRef}>
        <BlogForm user={user} createBlog={createBlog} />
      </Togglable>
      {resultBlogs.data
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </>
  )
}
