import axios from "axios";

const baseUrl = '/api/persons';
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = (data) => {
  const request = axios.post(baseUrl, data);
  return request.then(response => response.data);
}

const update = (id, data) => {
  const request = axios.put(`${baseUrl}/${id}`, data);
  return request.then(response => response.data);
}

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
}

export default {getAll, create, update, deleteContact}