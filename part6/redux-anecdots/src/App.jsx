import {AnecdotesForm} from './components/AnecdotesForm.jsx'
import {AnecdoteList} from './components/AnecdoteList.jsx'
import Filter from "./components/Filter.jsx";
import Notification from "./components/Notification.jsx";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {initializeAnecdotes} from "./reducers/anecdoteReducer.js";


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

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