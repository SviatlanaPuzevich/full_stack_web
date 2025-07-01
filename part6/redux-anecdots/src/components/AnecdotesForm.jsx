import { createAnecdote } from '../reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'
import {hideNotification, showNotification} from "../reducers/notificationReducer.js";
import useNotify from "../hooks/useNotify.js";

export const AnecdotesForm = () => {
  const dispatch = useDispatch()
  const addAnecdotes = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    useNotify(dispatch, content)
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