import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { 'Content-Type': 'application/json', Authorization: token },
  })
  return response.data
}

const update = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

const deleteBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers: { Authorization: token } })
}

export default { getAll, setToken, create, update, deleteBlog }
