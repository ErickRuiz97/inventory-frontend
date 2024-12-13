import createAxios from './axiosHttp'

async function getSales(query, paginator) {
  const axios = createAxios()
  const queryParams = new URLSearchParams({ ...query, ...paginator }).toString()
  const urlPath = `sales?${queryParams}`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getSaleById(idSale) {
  const axios = createAxios()
  const urlPath = `sales/${idSale}`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function createSale(body) {
  const axios = createAxios()
  const urlPath = `sales`
  try {
    const response = await axios.post(urlPath, body)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const saleService = {
  getSales,
  getSaleById,
  createSale,
}
