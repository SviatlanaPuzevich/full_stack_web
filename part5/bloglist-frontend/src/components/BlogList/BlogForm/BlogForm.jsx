import { useState } from 'react'
import styles from './BlogForm.module.css'

export const BlogForm = (props) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = async (e) => {
    e.preventDefault()
    props.createBlog({
      title, author, url
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={addBlog} className={styles.formGrid}>
        <div className={styles.formRow}><label>Title: <input value={title} onChange={e => setTitle(e.target.value)}/></label></div>
        <div className={styles.formRow}><label>Author: <input value={author} onChange={event => setAuthor(event.target.value)}/></label>
        </div>
        <div className={styles.formRow}><label>Url: <input value={url} onChange={event => setUrl(event.target.value)}/></label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}