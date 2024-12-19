import createAxios from './axiosHttp'

async function getDashboard() {
  const axios = createAxios()
  const urlPath = `dashboard`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}
export const dashboardService = {
  getDashboard,
}
