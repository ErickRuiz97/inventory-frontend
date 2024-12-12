import { defineStore } from 'pinia'
import { saleService } from '@/services'

export const saleStore = defineStore('saleStore', {
  state: () => ({
    list: null,
    error: null,
    filters: {
      date: [],
      customer: '',
      pay_types: '',
      amount: [0, 5000],
    },
    paginator: {
      limit: 20,
      page: 1,
      total: 0,
    },
  }),
  actions: {
    getSales(query) {
      saleService
        .getSales(query, this.paginator)
        .then(results => (this.list = results))
        .catch(reason => (this.error = reason))
    },
  },
})
