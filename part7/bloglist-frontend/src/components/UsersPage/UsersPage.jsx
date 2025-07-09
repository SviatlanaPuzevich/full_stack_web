import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAllUsers } from '../../reducers/usersReducer.js'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

export const UsersPage = () => {
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  if (!user) {
    return null
  }
  return (
    <>
      <h2>Users</h2>
      <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <th>Username</th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
