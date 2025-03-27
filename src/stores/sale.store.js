import { defineStore } from 'pinia'
import { saleService } from '@/services'

export const saleStore = defineStore('saleStore', {
  state: () => ({
    list: null,
    entity: null,
    error: null,
    reportDetail: null,
    report: null,
    create: null,
    receipt: null,
    filters: {
      date: [],
      code: '',
      customer: '',
      pay_types: '',
      amount: [0, 5000],
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
    getSalesReportDetail(query) {
      saleService
        .getSalesReportDetail(query, this.sort)
        .then(results => (this.reportDetail = results))
        .catch(reason => (this.error = reason))
    },
    getSalesReport(query) {
      saleService
        .getSalesReport(query, this.sort)
        .then(results => (this.report = results))
        .catch(reason => (this.error = reason))
    },
    getSales(query) {
      saleService
        .getSales(query, { ...this.paginator, ...this.sort })
        .then(results => (this.list = results))
        .catch(reason => (this.error = reason))
    },
    getSaleById(idSale) {
      saleService
        .getSaleById(idSale)
        .then(results => (this.entity = results))
        .catch(reason => (this.error = reason))
    },
    getSaleReceiptById(idSale) {
      saleService
        .getSaleReceiptById(idSale)
        .then(results => (this.receipt = results))
        .catch(reason => (this.error = reason))
    },
    createSale(body) {
      saleService
        .createSale(body)
        .then(results => (this.create = results))
        .catch(reason => (this.error = reason))
    },
  },
})
