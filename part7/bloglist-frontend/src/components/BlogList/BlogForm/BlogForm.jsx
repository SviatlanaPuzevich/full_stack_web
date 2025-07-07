import { useState } from 'react'
import styles from './BlogForm.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../../../services/blogs.js'
import { useNotificationDispatch } from '../../contextes/NotificationContext.jsx'

export const BlogForm = (props) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: async (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueriesData(['blogs'], [...blogs, newBlog])
      notificationDispatch({
        type: 'SHOW',
        notification: {
          message: 'Blog created successfully.',
          type: 'success',
        },
      })
    },
    onError: (error) => {
      notificationDispatch({
        type: 'SHOW',
        notification: { message: error.response.data.error, type: 'error' },
      })
    },
  })
  const addBlog = (e) => {
    e.preventDefault()
    props.createBlog()
    createBlogMutation.mutate({
      title,
      author,
      url,
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <>
      <h2>create new blog</h2>
      <form onSubmit={addBlog} className={styles.formGrid}>
        <div className={styles.formRow}>
          <label>
            Title:{' '}
            <input
              data-testid="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.formRow}>
          <label>
            Author:{' '}
            <input
              data-testid="author"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </label>
        </div>
        <div className={styles.formRow}>
          <label>
            Url:{' '}
            <input
              data-testid="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </label>
        </div>
        <button data-testid="createBlog" type="submit">
          create
        </button>
      </form>
    </>
  )
}
