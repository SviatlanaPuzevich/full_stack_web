import {AnecdotesForm} from './components/AnecdotesForm.jsx'
import {AnecdoteList} from './components/AnecdoteList.jsx'
import Filter from "./components/Filter.jsx";


const App = () => {

  return (
    <div>
      <Filter/>
      <AnecdoteList/>
      <AnecdotesForm/>
    </div>
  )
}

export default App