import { apiServer } from '../globalVars.js'
import axios from 'axios'

function createAxios(withHeaders = false) {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'))
  const headers = {}
  if (user && user.token) {
    headers.Authorization = user.token
  }
  const instance = axios.create({
    baseURL: apiServer,
    headers,
  })

  instance.interceptors.response.use(
    response => {
      const axiosResponse = {
        data: response.data,
        headers: withHeaders ? response.headers : {},
      }
      return Promise.resolve(axiosResponse)
    },
    error => {
      if (error.response) {
        if ([401].includes(error.response.status)) {
          localStorage.removeItem('user')
          location.reload(true)
        } else if ([403].includes(error.response.status)) {
          location.hash = '#/inventory/forbidden'
        }
        console.log(error.response.data.detail)
        return Promise.reject(error.response.data.detail)
      } else {
        return Promise.reject('Error al acceder a los servicios API')
      }
    },
  )
  return instance
}

export default createAxios
