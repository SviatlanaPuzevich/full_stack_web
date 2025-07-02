import {addNewAnecdote} from '../reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'

export const AnecdotesForm = () => {
  const dispatch = useDispatch()
  const addAnecdotes = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addNewAnecdote(content))
  }
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdotes}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}