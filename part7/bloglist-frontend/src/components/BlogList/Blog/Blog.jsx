import { BlogDetails } from './BlogDetails/BlogDetails.jsx'
import styles from './Blog.module.css'
import { Togglable } from '../../Togglable/Togglable.jsx'
import blogService from '../../../services/blogs.js'
import { useNotificationDispatch } from '../../Notification/NotificationContext.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const Blog = ({ blog, user }) => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: async (id) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueriesData(
        ['blogs'],
        blogs.filter((blog) => blog.id !== id)
      )
      notificationDispatch({
        type: 'SHOW',
        notification: { message: 'Blog deleted successfully.', type: 'update' },
      })
    },
    onError: (error) => {
      notificationDispatch({
        type: 'SHOW',
        notification: { message: error.response.data.error, type: 'error' },
      })
    },
  })
  const handleDelete = () => {
    if (confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }

  return (
    <div data-testid="blog-item" className={styles.blogContainer}>
      {blog.title} {blog.author}
      <Togglable showLabel="view" hideLabel="hide">
        <BlogDetails blog={blog} />
        {user.username === blog.user?.username && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </Togglable>
    </div>
  )
}

export default Blog
