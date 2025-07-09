import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getUserById } from '../../reducers/usersReducer.js'
import { useEffect } from 'react'
import { ListGroup } from 'react-bootstrap'

export const UserBlogList = () => {
  const { id } = useParams()
  const user = useSelector((state) => getUserById(state, id))
  const dispatch = useDispatch()
  useEffect(() => {
    if (!user) {
      dispatch(getAllUsers())
    }
  }, [])
  if (!user) {
    return <div>Loading...</div>
  }
  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{`${blog.title} ${blog.author}`}</ListGroup.Item>
        ))}
        </ListGroup>
    </>
  )
}
