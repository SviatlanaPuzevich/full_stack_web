import {useDispatch, useSelector} from 'react-redux'
import {voteForAnecdote} from '../reducers/anecdoteReducer.js'
import {useMemo} from "react";

export const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
  const sortedAnecdotes = useMemo(() => {
      return anecdotes.filter(a => a.content.includes(filter)).sort((a, b) => {
        return b.votes - a.votes
      })
    }, [anecdotes, filter]
  )
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteForAnecdote(anecdote))

  }
  return (
    <>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
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