import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getOne = async id => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const increaseLikes = async (updatedBlog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

const blogService = {
  getAll,
  getOne,
  setToken,
  create,
  increaseLikes,
  remove
}

export default blogService