import { useDispatch, useSelector } from 'react-redux'
import {
  deleteBlog,
  getBlogById,
  updateBlog,
} from '../../reducers/blogsReducer.js'
import { useParams } from 'react-router-dom'
import { CommentList } from '../CommentList/CommentList.jsx'
import Button from 'react-bootstrap/Button'
import { Container, Row } from 'react-bootstrap'

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
  if (!blog) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <Container className='py-4'>
        <Row>
        <h2>
          {blog.title} {blog.author}
        </h2>
        </Row>
      <Row className='my-3'>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
        <div data-testid="like">
          {blog.likes}
          <Button variant="outline-primary" className="ms-3" onClick={addLike}>like</Button>
        </div>
        <div>{`created by ${blog.user?.name || ''}`}</div>
        {user.username === blog.user?.username && (
          <div>
          <Button variant="outline-primary" onClick={handleDelete}>Delete</Button>
          </div>
        )}
      </Row>
      </Container>
      <CommentList blogId={blog.id} comments={blog.comments}/>
    </div>
  )
}

export default Blog
