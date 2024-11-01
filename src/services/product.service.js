import createAxios from './axiosHttp'

function getProductById(idProduct) {
  const axios = createAxios()
  let urlPath = `products/${idProduct}`
  return axios.get(urlPath)
}

function getProducts(query) {
  const axios = createAxios()
  const queryParams = new URLSearchParams(query).toString()
  const urlPath = `products?${queryParams}`
  return axios.get(urlPath)
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
