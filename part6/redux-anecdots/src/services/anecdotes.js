import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (data) => {
  const response = await axios.post(baseUrl, {content: data, votes: 0})
  return response.data
}

const update = async (data) => {
  const response = await axios.put(`${baseUrl}/${data.id}`, {...data, votes: data.votes + 1})
  return response.data
}

export default {getAll, createNew, update}