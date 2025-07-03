import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../requests.js'
import { useNotificationDispatch } from './NotificationContext.jsx'

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: create,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], [...anecdotes, newAnecdote])
      notificationDispatch({ type: 'SHOW', message: `you created the new anecdote ${newAnecdote.content}` })
    },
    onError: (error) => {
      const message = error.response.data.error
      notificationDispatch({ type: 'SHOW', message })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote"/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
