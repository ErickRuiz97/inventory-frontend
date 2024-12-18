import createAxios from './axiosHttp'

async function getProductById(idProduct) {
  const axios = createAxios()
  const urlPath = `products/${idProduct}`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getProducts(query, paginator) {
  const axios = createAxios()
  const queryParams = new URLSearchParams({ ...query, ...paginator }).toString()
  const urlPath = `products?${queryParams}`
  try {
    const response = await axios.get(urlPath)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function createProduct(body) {
  const axios = createAxios()
  const urlPath = `products`
  try {
    const response = await axios.post(urlPath, body)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function updateProduct(id, body) {
  const axios = createAxios()
  const urlPath = `products/${id}`
  try {
    const response = await axios.put(urlPath, body)
    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getProductsReport(query, sort) {
  const axios = createAxios(true)
  const queryParams = new URLSearchParams({ ...query, ...sort }).toString()
  const urlPath = `products/report?${queryParams}`
  try {
    const response = await axios.get(urlPath, { responseType: 'blob' })
    return Promise.resolve({ data: response.data, headers: response.headers })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const productService = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  getProductsReport
}
