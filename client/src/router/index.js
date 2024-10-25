import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/pages/Home.vue'
import Register from '@/pages/Register.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/register', name: 'register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

function canUserAccess(to) {
  // which can we access without auth?
  switch (to.name) {
    case 'home':
      return true
    case 'register':
      return true
    default:
      return false
  }
}

router.beforeEach(async (to, from) => {
  // check server for valid authentication
  const canAccess = canUserAccess(to)

  // check auth
  if (!canAccess) {
    return '/register'
  }
})

export default router
