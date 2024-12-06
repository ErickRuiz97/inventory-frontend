import { defineStore } from 'pinia'
import { saleService } from '@/services'

export const saleStore = defineStore('saleStore', {
  state: () => ({
    list: null,
    error: null,
  }),
  actions: {
    getSales(query, paginator) {
      saleService
        .getSales(query, paginator)
        .then(results => (this.list = results))
        .catch(reason => (this.error = reason))
    },
  },
})
