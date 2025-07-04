import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { LoginFrom } from './components/LoginForm/LoginFrom.jsx'
import { BlogList } from './components/BlogList/BlogList.jsx'
import { Notification } from './components/Notification/Notification.jsx'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const showNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => setNotification(null), 2000)
  }
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <>
      <Notification notification={notification} />
      <LoginFrom user={user} setUser={setUser} setErrorMessage={showNotification} />
      <BlogList user={user} setMessage={showNotification} />
    </>
  )
}

export default App
