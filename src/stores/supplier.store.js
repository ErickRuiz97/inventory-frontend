import { defineStore } from 'pinia'
import { supplierService } from '@/services'

export const supplierStore = defineStore('supplierStore', {
  state: () => ({
    list: null,
    entity: null,
    create: null,
    update: null,
    error: null,
    report: null,
    filters: {
      name: '',
      code: '',
      contact_name: '',
      contact_email: '',
      contact_phone: '',
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
    getSuppliers(query, withPaginator = true) {
      supplierService
        .getSuppliers(
          query,
          withPaginator ? { ...this.paginator, ...this.sort } : {},
        )
        .then(results => (this.list = results))
        .catch(reason => (this.error = reason))
    },
    getSuppliersReport(query) {
      supplierService
        .getSuppliersReport(query, this.sort)
        .then(results => (this.report = results))
        .catch(reason => (this.error = reason))
    },
    getSupplierById(idSupplier) {
      supplierService
        .getSupplierById(idSupplier)
        .then(results => (this.entity = results))
        .catch(reason => (this.error = reason))
    },
    createSupplier(body) {
      supplierService
        .createSupplier(body)
        .then(results => (this.create = results))
        .catch(reason => (this.error = reason))
    },
    updateSupplier(id, body) {
      supplierService
        .updateSupplier(id, body)
        .then(results => (this.update = results))
        .catch(reason => (this.error = reason))
    },
  },
})
