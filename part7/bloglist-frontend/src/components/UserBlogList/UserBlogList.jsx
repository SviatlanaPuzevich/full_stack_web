import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserById } from '../../reducers/usersReducer.js'

export const UserBlogList = () => {
  const { id } = useParams()
  const user = useSelector((state) => getUserById(state, id))
  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{`${blog.title} ${blog.author}`}</li>
        ))}
      </ul>
    </>
  )
}
