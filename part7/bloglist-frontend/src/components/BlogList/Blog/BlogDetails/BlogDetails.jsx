import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../../../../services/blogs.js'
import { useNotificationDispatch } from '../../../Notification/NotificationContext.jsx'

export const BlogDetails = ({ blog }) => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()
  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: async (blogToUpdate) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueriesData(
        ['blogs'],
        blogs.map((blog) => (blog.id === blogToUpdate.id ? blogToUpdate : blog))
      )
      notificationDispatch({
        type: 'SHOW',
        notification: { message: 'Blog updated successfully.', type: 'update' },
      })
    },
    onError: (error) => {
      notificationDispatch({
        type: 'SHOW',
        notification: { message: error.response.data.error, type: 'error' },
      })
    },
  })
  const addLike = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }
  return (
    <>
      <div>{blog.url}</div>
      <div data-testid="like">
        {blog.likes}
        <button onClick={addLike}>like</button>
      </div>
      <div>{blog.user?.name || ''}</div>
    </>
  )
}
