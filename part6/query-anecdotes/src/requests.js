import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

export const create = async (data) => {
  const response = await axios.post(baseURL, data)
  return response.data
}

export const update = async (data) => {
  const response = await axios.put(`${baseURL}/${data.id}`, data)
  return response.data
}