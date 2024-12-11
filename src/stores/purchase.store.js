import { defineStore } from 'pinia'
import { purchaseService } from '@/services'

export const purchaseStore = defineStore('purchaseStore', {
  state: () => ({
    list: null,
    entity: null,
    create: null,
    error: null,
    filters: {
      date: [],
      supplier: '',
      amount: [0, 10000],
    },
  }),
  actions: {
    getPurchases(query, paginator) {
      purchaseService
        .getPurchases(query, paginator)
        .then(results => (this.list = results))
        .catch(reason => (this.error = reason))
    },
    getPurchaseById(idPurchase) {
      purchaseService
        .getPurchaseById(idPurchase)
        .then(results => (this.entity = results))
        .catch(reason => (this.error = reason))
    },
    createPurchase(body) {
      purchaseService
        .createPurchase(body)
        .then(results => (this.create = results))
        .catch(reason => (this.error = reason))
    },
  },
})
