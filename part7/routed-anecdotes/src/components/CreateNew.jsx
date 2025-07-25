import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index.js'

export const CreateNew = (props) => {
  const navigate = useNavigate()
  const { reset: resetContent, ...content } = useField('text', 'content')
  const { reset: resetAuthor, ...author } = useField('text', 'author')
  const { reset: resetInfo, ...info } = useField('text', 'info')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}