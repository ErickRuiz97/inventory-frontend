import { defineStore } from 'pinia'
import { dashboardService } from '@/services'

export const dashboardStore = defineStore('dashboardStore', {
  state: () => ({
    dashboard: null,
    error: null,
  }),
  actions: {
    getDashboard() {
      dashboardService
        .getDashboard()
        .then(result => (this.dashboard = result))
        .catch(reason => (this.errorBackup = reason))
    },
  },
})
