import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll, update } from './requests.js'
import { useNotificationDispatch } from './components/NotificationContext.jsx'


const App = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: async (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], anecdotes.map(a => (a.id === updatedAnecdote.id) ? updatedAnecdote : a))
      notificationDispatch({ type: 'SHOW', message: `you voted for ${updatedAnecdote.content}` })
    }
  })


  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
  })
  console.log(JSON.parse(JSON.stringify(result)))
  if (result.isError) {
    return <div>anecdote service is not available due to problems in server</div>;
  }
  if (result.isLoading) {
    return <div>Loading...</div>;
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification/>
      <AnecdoteForm/>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
