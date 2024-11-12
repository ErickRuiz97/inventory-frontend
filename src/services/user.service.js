import createAxios from './axiosHttp'

async function getUserById(idUser) {
  const axios = createAxios()
  const urlPath = `users/${idUser}`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getUsers(query, paginator) {
  const axios = createAxios()
  const queryParams = new URLSearchParams({ ...query, ...paginator }).toString()
  const urlPath = `users?${queryParams}`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function createUser(body) {
  const axios = createAxios()
  const urlPath = `/users`
  try {
    const response = await axios.post(urlPath, body)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function updateUser(id, body) {
  const axios = createAxios()
  const urlPath = `users/${id}`
  try {
    const response = await axios.put(urlPath, body)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const userService = {
  createUser,
  getUsers,
  getUserById,
  updateUser
}