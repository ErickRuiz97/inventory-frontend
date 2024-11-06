import createAxios from './axiosHttp'

function getProductById(idProduct) {
  const axios = createAxios()
  const urlPath = `products/${idProduct}`
  return axios.get(urlPath)
}

async function getProducts(query, paginator) {
  const axios = createAxios()
  const queryParams = new URLSearchParams({ ...query, ...paginator }).toString()
  const urlPath = `products?${queryParams}`
  try {
    const response = await axios.get(urlPath)
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

function createProduct(body) {
  const axios = createAxios()
  const urlPath = `products`
  return axios.post(urlPath, body)
}

export const productService = {
  getProducts,
  getProductById,
  createProduct,
}
