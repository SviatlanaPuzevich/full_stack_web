import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { LoginFrom } from './components/LoginForm/LoginFrom.jsx'
import { BlogList } from './components/BlogList/BlogList.jsx'
import { Notification } from './components/Notification/Notification.jsx'

const App = () => {
  const [user, setUser] = useState(null)
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
      <Notification />
      <LoginFrom user={user} setUser={setUser} />
      <BlogList user={user} />
    </>
  )
}

export default App
