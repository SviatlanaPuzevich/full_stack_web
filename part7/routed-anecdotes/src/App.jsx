import { useState } from 'react'
import { Menu } from './components/Menu.jsx'
import { About } from './components/About.jsx'
import { CreateNew } from './components/CreateNew.jsx'
import { Footer } from './components/Footer.jsx'
import { AnecdoteList } from './components/AnecdoteList.jsx'
import { Route, Routes, useMatch } from 'react-router-dom'
import { Anecdote } from './components/Anecdote.jsx'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const match = useMatch('/anecdotes/:id')
  const anecdote  = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu/>
      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/create' element={<CreateNew addNew={addNew}/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
