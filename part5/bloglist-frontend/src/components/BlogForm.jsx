import {useState} from "react"
import blogService from "../services/blogs.js"

export const BlogForm = ({ setMessage, setBlogs, blogs, user}) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const saveBlog = async (e) => {
    try {
      console.log('Try to save')
      e.preventDefault()
      const savedBlog = await blogService.create({
        title, author, url
      })
      setAuthor('')
      setTitle('')
      setUrl('')
      setBlogs([...blogs, savedBlog])
      setMessage(`a new blog ${savedBlog.title} by ${user.name} added`)
    } catch (e) {
      console.log(e)
      setMessage(e)
    }
  }
  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={saveBlog}>
        <div><label>Title: <input value={title} onChange={e => setTitle(e.target.value)}/></label></div>
        <div><label>Author: <input value={author} onChange={event => setAuthor(event.target.value)}/></label>
        </div>
        <div><label>Url: <input value={url} onChange={event => setUrl(event.target.value)}/></label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}