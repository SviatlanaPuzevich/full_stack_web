import {useState, useEffect} from 'react'
import blogService from './services/blogs'
import {LoginFrom} from "./components/LoginFrom.jsx"
import {BlogList} from "./components/BlogList.jsx"
import {Message} from "./components/Message.jsx"

const App = () => {
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const showMessage = (message) => {
    setMessage(message)
    setTimeout(() => setMessage(null), 2000)
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
      <Message message={message}/>
      <LoginFrom user={user} setUser={setUser} setErrorMessage={showMessage}/>
      <BlogList user={user} setMessage={showMessage}/>
    </>
  )
}

export default App