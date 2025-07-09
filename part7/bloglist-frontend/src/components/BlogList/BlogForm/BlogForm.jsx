import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export const BlogForm = (props) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = async (e) => {
    e.preventDefault()
    props.createBlog({
      title,
      author,
      url,
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <>
      <h2>create new blog</h2>
      <Form onSubmit={addBlog} >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label column={1}>title</Form.Label>
          <Form.Control data-testid="title" type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label column={1}>author</Form.Label>
          <Form.Control  data-testid="author" type="text"
                         value={author}
                         onChange={(event) => setAuthor(event.target.value)}
                        placeholder="Enter author"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label column={1}>URL</Form.Label>
          <Form.Control  data-testid="url" type="text"
                         value={url}
                         onChange={(event) => setUrl(event.target.value)}
                         placeholder="Enter URL"/>
        </Form.Group>
        <Button data-testid="createBlog" type="submit" variant="primary">
          create
        </Button>
      </Form>
    </>
  )
}
