import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login']

  const authRequired = !publicPages.includes(to.path)
  const user = JSON.parse(localStorage.getItem('user'))

  if (authRequired) {
    if (!user || !user.token) return next('/login')
  }

  next()
})

export default router
