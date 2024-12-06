import { defineStore } from 'pinia'
import { configService } from '@/services'

export const configStore = defineStore('configStore', {
  state: () => ({ backup: null, error: null }),
  actions: {
    createBackup() {
      configService
        .createBackup()
        .then(result => (this.backup = result))
        .catch(reason => (this.error = reason))
    },
  },
})
