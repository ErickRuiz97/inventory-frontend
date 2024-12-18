import { defineStore } from 'pinia'
import { productService } from '@/services'

export const productStore = defineStore('productStore', {
  state: () => ({
    list: null,
    entity: null,
    create: null,
    update: null,
    error: null,
    filters: {
      name: '',
      code: '',
      categories: [],
      stock: 'ALL',
    },
    paginator: {
      limit: 20,
      page: 1,
      total: 0,
    },
    sort: {
      sort: 'created_at',
      order: 'descending',
    },
  }),
  actions: {
    getProducts(query, withPaginator = true) {
      productService
        .getProducts(
          query,
          withPaginator ? { ...this.paginator, ...this.sort } : {},
        )
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
