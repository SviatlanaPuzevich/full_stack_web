import Blog from "./Blog.jsx"
import {useEffect, useState} from "react"
import blogService from "../services/blogs.js"
import {BlogForm} from "./BlogForm.jsx"

export const BlogList = ({user, setMessage}) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  if (!user) {
    return null
  }

  return (
    <>
      <h2>Blogs</h2>
      <BlogForm user={user} setBlogs={setBlogs} blogs={blogs} setMessage={setMessage}/>
      {blogs.map((blog) => (<Blog key={blog.id} blog={blog}/>))}
    </>
  )
}