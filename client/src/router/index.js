import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home.vue'
import Register from '@/pages/Register.vue'

const routes = [
  { path: '/', name: 'hello', component: Home },
  { path: '/register', name: 'register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const isAuthenticated = false
  if (
    // not home page
    from.name === 'hello' &&
    // make sure the user is authenticated
    !isAuthenticated &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'register'
  ) {
    // redirect the user to the login page
    return '/register'
  }
})

export default router
