import { useDispatch, useSelector } from 'react-redux'
import {
  deleteBlog,
  getBlogById,
  updateBlog,
} from '../../../reducers/blogsReducer.js'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const id = useParams().id
  const user = useSelector((state) => state.user)
  const blog = useSelector((state) => getBlogById(state, id))
  const dispatch = useDispatch()
  const handleDelete = () => {
    if (confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }
  const addLike = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <div data-testid="like">
        {blog.likes}
        <button onClick={addLike}>like</button>
      </div>
      <div>{blog.user?.name || ''}</div>
      {user.username === blog.user?.username && (
        <button onClick={handleDelete}>Delete</button>
      )}
    </div>
  )
}

export default Blog
