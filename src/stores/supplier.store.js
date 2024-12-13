import { defineStore } from 'pinia'
import { supplierService } from '@/services'

export const supplierStore = defineStore('supplierStore', {
  state: () => ({
    list: null,
    entity: null,
    create: null,
    update: null,
    error: null,
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
  }),
  actions: {
    getSuppliers(query) {
      supplierService
        .getSuppliers(query, this.paginator)
        .then(results => (this.list = results))
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
