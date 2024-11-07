import { defineStore } from 'pinia'
import { authService } from '@/services'

export const authStore = defineStore('authStore', {
  state: () => ({ login: null, error: null }),
  actions: {
    loginRequest(req) {
      authService
        .loginRequest(req)
        .then(results => (this.login = results))
        .catch(reason => (this.error = reason))
    },
  },
})
