import { defineStore } from 'pinia'
import { userService } from '@/services'

export const userStore = defineStore('userStore', {
  state: () => ({
    list: null,
    entity: null,
    create: null,
    update: null,
    error: null,
    delete: null,
    active: null,
    filters: {
      full_name: '',
      email: '',
      roles: [],
      state: 'ALL',
    },
    changePsw: null,
  }),
  actions: {
    getUsers(query, paginator) {
      userService
        .getUsers(query, paginator)
        .then(results => (this.list = results))
        .catch(reason => (this.error = reason))
    },
    getUserById(idUser) {
      userService
        .getUserById(idUser)
        .then(results => (this.entity = results))
        .catch(reason => (this.error = reason))
    },
    createUser(body) {
      userService
        .createUser(body)
        .then(results => (this.create = results))
        .catch(reason => (this.error = reason))
    },
    updateUser(id, body) {
      userService
        .updateUser(id, body)
        .then(results => (this.update = results))
        .catch(reason => (this.error = reason))
    },
    deleteUser(id) {
      userService
        .deleteUser(id)
        .then(results => (this.delete = results))
        .catch(reason => (this.error = reason))
    },
    activeUser(id) {
      userService
        .activeUser(id)
        .then(results => (this.active = results))
        .catch(reason => (this.error = reason))
    },
    changePassword(body) {
      userService
        .changePassword(body)
        .then(results => (this.changePsw = results))
        .catch(reason => (this.error = reason))
    },
  },
})
