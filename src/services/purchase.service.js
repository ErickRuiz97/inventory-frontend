import createAxios from './axiosHttp'

async function getPurchases(query, paginator) {
  const axios = createAxios()
  const queryParams = new URLSearchParams({ ...query, ...paginator }).toString()
  const urlPath = `purchases?${queryParams}`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getPurchaseById(idPurchase) {
  const axios = createAxios()
  const urlPath = `purchases/${idPurchase}`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function createPurchase(body) {
  const axios = createAxios()
  const urlPath = `purchases`
  try {
    const response = await axios.post(urlPath, body)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getPurchasesReportDetail(query, paginator) {
  const axios = createAxios(true)
  const queryParams = new URLSearchParams({ ...query, ...paginator }).toString()
  const urlPath = `purchases/report-detail?${queryParams}`
  try {
    const response = await axios.get(urlPath, { responseType: 'blob' })
    return Promise.resolve({ data: response.data, headers: response.headers })
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getPurchasesReport(query, paginator) {
  const axios = createAxios(true)
  const queryParams = new URLSearchParams({ ...query, ...paginator }).toString()
  const urlPath = `purchases/report?${queryParams}`
  try {
    const response = await axios.get(urlPath, { responseType: 'blob' })
    return Promise.resolve({ data: response.data, headers: response.headers })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const purchaseService = {
  getPurchases,
  getPurchaseById,
  createPurchase,
  getPurchasesReport,
  getPurchasesReportDetail,
}
