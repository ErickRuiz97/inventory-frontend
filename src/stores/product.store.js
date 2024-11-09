import { defineStore } from 'pinia'
import { productService } from '@/services'

export const productStore = defineStore('productStore', {
  state: () => ({
    list: null,
    entity: null,
    create: null,
    update: null,
    error: null,
  }),
  actions: {
    getProducts(query, paginator) {
      productService
        .getProducts(query, paginator)
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
        .then(results => (this.create = results))
        .catch(reason => (this.error = reason))
    },
    updateProduct(id, body) {
      productService
        .updateProduct(id, body)
        .then(results => (this.update = results))
        .catch(reason => (this.error = reason))
    },
  },
})
