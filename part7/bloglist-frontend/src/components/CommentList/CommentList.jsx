import { useState } from 'react'
import { createNewComment } from '../../reducers/blogsReducer.js'
import { useDispatch } from 'react-redux'

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
      <form onSubmit={addComment}>
        <label>
          comment
          <input
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  )
}
