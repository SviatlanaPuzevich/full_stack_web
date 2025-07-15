import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries.js'

export const BornForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR)
  const updateBorn = async (e) => {
    e.preventDefault()
    await editAuthor({
      variables: {
        name,
        setBornTo: Number(born),
      },
    })
    setName('')
    setBorn('')
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={updateBorn}>
        <div>
          <label>
            name
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              {authors.map((author) => (
                <option key={author.id} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}
