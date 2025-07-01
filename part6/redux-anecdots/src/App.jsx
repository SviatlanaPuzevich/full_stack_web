import {AnecdotesForm} from './components/AnecdotesForm.jsx'
import {AnecdoteList} from './components/AnecdoteList.jsx'
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";


const App = () => {

  return (
    <div>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdotesForm/>
    </div>
  )
}

export default App