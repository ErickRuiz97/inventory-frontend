import createAxios from './axiosHttp'

async function getSupplierById(idSupplier) {
  const axios = createAxios()
  const urlPath = `suppliers/${idSupplier}`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getSuppliers(query, paginator) {
  const axios = createAxios()
  const queryParams = new URLSearchParams({ ...query, ...paginator }).toString()
  const urlPath = `suppliers?${queryParams}`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function createSupplier(body) {
  const axios = createAxios()
  const urlPath = `suppliers`
  try {
    const response = await axios.post(urlPath, body)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function updateSupplier(id, body) {
  const axios = createAxios()
  const urlPath = `suppliers/${id}`
  try {
    const response = await axios.put(urlPath, body)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getSuppliersReport(query, sort) {
  const axios = createAxios(true)
  const queryParams = new URLSearchParams({ ...query, ...sort }).toString()
  const urlPath = `suppliers/report?${queryParams}`
  try {
    const response = await axios.get(urlPath, { responseType: 'blob' })
    return Promise.resolve({ data: response.data, headers: response.headers })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const supplierService = {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  getSuppliersReport
}
