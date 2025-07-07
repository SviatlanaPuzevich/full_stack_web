import { BlogDetails } from './BlogDetails/BlogDetails.jsx'
import styles from './Blog.module.css'
import { Togglable } from '../../Togglable/Togglable.jsx'
import { useDispatch } from 'react-redux'
import { deleteBlog } from '../../../reducers/blogsReducer.js'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    if (confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
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
