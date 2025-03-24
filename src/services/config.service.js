import createAxios from './axiosHttp'

async function createBackup() {
  const axios = createAxios(true)
  const urlPath = `config/backup`
  try {
    const response = await axios.post(urlPath, null, { responseType: 'blob' })
    return Promise.resolve({ data: response.data, headers: response.headers })
  } catch (error) {
    return Promise.reject(error)
  }
}

async function restoreDatabase(file) {
  const axios = createAxios()
  const urlPath = `config/restore`
  const formData = new FormData()
  formData.append('file', file)
  try {
    const response = await axios.post(urlPath, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getConfig() {
  const axios = createAxios()
  const urlPath = `config`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function createConfig(body) {
  const axios = createAxios()
  const urlPath = `config`
  try {
    const response = await axios.post(urlPath, body)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function updateConfig(body) {
  const axios = createAxios()
  const urlPath = `config`
  try {
    const response = await axios.put(urlPath, body)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const configService = {
  createBackup,
  restoreDatabase,
  getConfig,
  createConfig,
  updateConfig,
}
