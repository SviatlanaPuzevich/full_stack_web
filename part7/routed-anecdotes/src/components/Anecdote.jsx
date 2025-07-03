export const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      has {anecdote.votes} votes
    </div>
  )
}