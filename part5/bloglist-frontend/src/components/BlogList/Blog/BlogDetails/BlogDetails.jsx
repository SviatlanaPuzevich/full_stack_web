import { useState } from 'react'

export const BlogDetails = ({ blog, update }) => {
  const [likes, setLikes] = useState(blog.likes)
  const addLike = async () => {
    const blogToUpdate = { ...blog, likes: likes + 1 }
    const updatedBlog = await update(blogToUpdate)
    console.log(updatedBlog)
    setLikes(updatedBlog.likes)
  }
  return (<>
    <div>{blog.url}</div>
    <div>{likes}
      <button onClick={addLike}>like</button>
    </div>
    <div>{blog.user?.name || ''}</div>
  </>)
}