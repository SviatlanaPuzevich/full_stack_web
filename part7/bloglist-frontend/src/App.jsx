import { useEffect } from 'react'
import { LoginFrom } from './components/LoginForm/LoginFrom.jsx'
import { BlogList } from './components/BlogList/BlogList.jsx'
import { Notification } from './components/Notification/Notification.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogs } from './reducers/blogsReducer.js'
import { getUser } from './reducers/userReducer.js'

const App = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
    dispatch(getAllBlogs())
  }, [])

  return (
    <>
      <Notification notification={notification} />
      <LoginFrom />
      <BlogList />
    </>
  )
}

export default App
