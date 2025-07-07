import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { NotificationProvider } from './components/Notification/NotificationContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationProvider>
    <App/>
  </NotificationProvider>)
