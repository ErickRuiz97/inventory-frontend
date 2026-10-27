import createAxios from './axiosHttp'

async function loginRequest(body) {
  const axios = createAxios()
  const urlPath = `login`

  try {
    const response = await axios.post(urlPath, body)
    localStorage.setItem('user', JSON.stringify(response.data))
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

// Despierta la API gratuita de Render, que se apaga cuando no recibe tráfico
async function awakeRequest() {
  const axios = createAxios()
  const urlPath = `awake`

  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const authService = {
  loginRequest,
  awakeRequest,
}
