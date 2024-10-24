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

export default router
