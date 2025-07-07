import { LoginFrom } from './components/LoginForm/LoginFrom.jsx'
import { BlogList } from './components/BlogList/BlogList.jsx'
import { Notification } from './components/Notification/Notification.jsx'
import { UserProvider } from './components/contextes/UserContext.jsx'

const App = () => {
  return (
    <UserProvider>
      <Notification />
      <LoginFrom />
      <BlogList />
    </UserProvider>
  )
}

export default App
