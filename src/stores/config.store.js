import { defineStore } from 'pinia'
import { configService } from '@/services'

export const configStore = defineStore('configStore', {
  state: () => ({
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
  },
})
