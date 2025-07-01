import {useDispatch, useSelector} from 'react-redux'
import {voteFor} from '../reducers/anecdoteReducer.js'
import {hideNotification, showNotification} from "../reducers/notificationReducer.js";
import useNotify from "../hooks/useNotify.js";

export const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(filter)).sort((a, b) => {
    return b.votes - a.votes
  }))
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteFor(anecdote.id))
    useNotify(dispatch, anecdote.content)
  }
  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}