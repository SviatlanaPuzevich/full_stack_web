import { useDispatch } from 'react-redux'
import { updateBlog } from '../../../../reducers/blogsReducer.js'

export const BlogDetails = ({ blog }) => {
  const dispatch = useDispatch()
  const addLike = () => {
    dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
  }

  return (
    <>
      <div>{blog.url}</div>
      <div data-testid="like">
        {blog.likes}
        <button onClick={addLike}>like</button>
      </div>
      <div>{blog.user?.name || ''}</div>
    </>
  )
}
