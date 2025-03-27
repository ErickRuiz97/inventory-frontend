import { defineStore } from 'pinia'
import { configService } from '@/services'

export const configStore = defineStore('configStore', {
  state: () => ({
    entity: null,
    create: null,
    update: null,
    backup: null,
    errorBackup: null,
    restore: null,
    errorRestore: null,
  }),
  actions: {
    createBackup() {
      configService
        .createBackup()
        .then(result => (this.backup = result))
        .catch(reason => (this.errorBackup = reason))
    },
    restoreDatabase(file) {
      configService
        .restoreDatabase(file)
        .then(result => (this.restore = result))
        .catch(reason => (this.errorRestore = reason))
    },
    getConfig(idSupplier) {
      configService
        .getConfig(idSupplier)
        .then(results => (this.entity = results))
        .catch(reason => (this.error = reason))
    },
    createConfig(body) {
      configService
        .createConfig(body)
        .then(results => (this.create = results))
        .catch(reason => (this.error = reason))
    },
    updateConfig(id, body) {
      configService
        .updateConfig(id, body)
        .then(results => (this.update = results))
        .catch(reason => (this.error = reason))
    },
  },
})
