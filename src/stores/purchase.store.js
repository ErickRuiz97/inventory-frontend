import { defineStore } from 'pinia'
import { purchaseService } from '@/services'

export const purchaseStore = defineStore('purchaseStore', {
  state: () => ({
    list: null,
    entity: null,
    create: null,
    error: null,
    reportDetail: null,
    report: null,
    filters: {
      date: [],
      code: '',
      supplier: '',
      amount: [0, 10000],
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
    getPurchases(query) {
      purchaseService
        .getPurchases(query, { ...this.paginator, ...this.sort })
        .then(results => (this.list = results))
        .catch(reason => (this.error = reason))
    },
    getPurchasesReportDetail(query) {
      purchaseService
        .getPurchasesReportDetail(query, this.sort)
        .then(results => (this.reportDetail = results))
        .catch(reason => (this.error = reason))
    },
    getPurchasesReport(query) {
      purchaseService
        .getPurchasesReport(query, this.sort)
        .then(results => (this.report = results))
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
