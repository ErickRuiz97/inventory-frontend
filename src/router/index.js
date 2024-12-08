import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const requiredRoles = to.meta.requiresAuth
  const isPublic = to.meta.public
  const user = JSON.parse(localStorage.getItem('user'))
  if (!isPublic && !user) return next('/login')
  if (requiredRoles) {
    if (!user || !user.token) return next('/login')
    const userRoles = user.roles
    if (Array.isArray(requiredRoles)) {
      const hasAccess = requiredRoles.some(role => userRoles.includes(role))
      if (hasAccess) {
        next()
      } else {
        next({ name: 'No autorizado' })
      }
    } else {
      if (userRoles.includes(requiredRoles)) {
        next()
      } else {
        next({ name: 'No autorizado' })
      }
    }
  } else {
    next()
  }
})

export default router
