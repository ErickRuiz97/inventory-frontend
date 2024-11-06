import { defineStore } from 'pinia'
import { productService } from '@/services'

export const productStore = defineStore('productStore', {
  state: () => ({ list: null, entity: null, createEntity: null, error: null }),
  actions: {
    getProducts(query, paginator) {
      productService
        .getProducts(query, paginator)
        .then(results => (this.list = results.data))
        .catch(reason => (this.error = reason))
    },
    getProductById(idProduct) {
      productService
        .getProductById(idProduct)
        .then(results => (this.entity = results.data))
        .catch(reason => (this.error = reason))
    },
    createProduct(body) {
      productService
        .createProduct(body)
        .then(results => (this.createEntity = results.data))
        .catch(reason => (this.error = reason))
    },
  },
})
