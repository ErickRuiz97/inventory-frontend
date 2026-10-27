import { API_URL } from '../globalVars.js'
import axios from 'axios'
import router from '@/router'
import { i18n } from '@/i18n'

function createAxios(withHeaders = false) {
  // return authorization header with jwt token
  const user = JSON.parse(localStorage.getItem('user'))
  const headers = {}
  if (user && user.token) {
    headers.Authorization = user.token
  }
  const instance = axios.create({
    baseURL: API_URL,
    headers,
  })

  instance.interceptors.response.use(
    response => {
      const axiosResponse = {
        data: response.data ? response.data : 'ok',
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
          router.push({ name: 'NoAuth' })
        }
        return Promise.reject(error.response.data.detail)
      } else {
        return Promise.reject(i18n.global.t('common.apiError'))
      }
    },
  )
  return instance
}

export default createAxios
