import { defineStore } from 'pinia'
import { productService } from '@/_services'

export const productStore = defineStore('productStore', {
  state: () => ({ list: null, entity: null, createEntity: null, error: null }),
  actions: {
    getProducts(query) {
      productService
        .getProducts(query)
        .then(results => (this.list = results))
        .catch(reason => (this.error = reason))
    },
    getProductById(idProduct) {
      productService
        .getProductById(idProduct)
        .then(results => (this.entity = results))
        .catch(reason => (this.error = reason))
    },
    createProduct(body) {
      productService
        .createProduct(body)
        .then(results => (this.createEntity = results))
        .catch(reason => (this.error = reason))
    },
  },
})
