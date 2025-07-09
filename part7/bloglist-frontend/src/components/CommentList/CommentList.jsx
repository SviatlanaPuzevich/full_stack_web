import { useState } from 'react'
import { createNewComment } from '../../reducers/blogsReducer.js'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ListGroup } from 'react-bootstrap'

export const CommentList = ({ blogId, comments }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const addComment = (e) => {
    e.preventDefault()
    console.log('adding comment', comment)
    dispatch(createNewComment(blogId, comment))
    setComment('')
  }
  return (
    <div>
      <h2>comments</h2>
      <Form onSubmit={addComment}>
        <Form.Group className="mb-3">
          <Form.Label column={1}>comment</Form.Label>
          <Form.Control name="comment" type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Start enter your comment"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          add comment
        </Button>
      </Form>
      <div className="my-4">
        <ListGroup>
          {comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.text}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  )
}
