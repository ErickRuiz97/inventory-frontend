import { defineStore } from 'pinia'
import { purchaseService } from '@/services'

export const purchaseStore = defineStore('purchaseStore', {
  state: () => ({
    list: null,
    error: null,
  }),
  actions: {
    getPurchases(query, paginator) {
      purchaseService
        .getPurchases(query, paginator)
        .then(results => (this.list = results))
        .catch(reason => (this.error = reason))
    },
  },
})
