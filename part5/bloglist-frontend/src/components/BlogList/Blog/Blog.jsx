import { BlogDetails } from './BlogDetails/BlogDetails.jsx'
import styles from './Blog.module.css'
import { Togglable } from '../../Togglable/Togglable.jsx'

const Blog = ({ blog, update, deleteBlog, user }) => {
  const handleDelete = () => {
    if (confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }
  return (<div className={styles.blogContainer}>
    {blog.title} {blog.author}
    <Togglable showLabel='view' hideLabel="hide">
      <BlogDetails blog={blog} update={update}/>
      {
        user.username === blog.user?.username
        &&
        (<button onClick={handleDelete}>Delete</button>)
      }
    </Togglable>
  </div>)
}

export default Blog