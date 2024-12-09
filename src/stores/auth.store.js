import { defineStore } from 'pinia'
import { authService } from '@/services'

export const authStore = defineStore('authStore', {
  state: () => ({ login: null, error: null, roles: [], userEmail: '' }),
  actions: {
    loginRequest(req) {
      authService
        .loginRequest(req)
        .then(results => (this.login = results))
        .catch(reason => (this.error = reason))
    },
    isAdmin() {
      return this.roles.includes('ADMIN')
    },
    isManager() {
      return this.roles.includes('MANAGER') || this.isAdmin()
    },
    isSales() {
      return this.roles.includes('SALES') || this.isAdmin() || this.isManager()
    },
  },
})
