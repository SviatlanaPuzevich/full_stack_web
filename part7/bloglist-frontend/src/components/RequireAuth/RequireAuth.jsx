import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const RequireAuth = (props) => {
  const user = useSelector((state) => state.user)
  if (!user) {
    return <Navigate to="/login" />
  }
  return props.children
}
