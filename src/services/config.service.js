import createAxios from './axiosHttp'

async function createBackup() {
  const axios = createAxios(true)
  const urlPath = `config/backup`
  try {
    const response = await axios.post(urlPath)
    return Promise.resolve({ data: response.data, headers: response.headers })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const configService = {
  createBackup,
}
