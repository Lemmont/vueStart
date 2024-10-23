import { createWebHistory, createRouter } from 'vue-router'

import Header from '@/components/Header.vue'
import SignUp from '@/components/SignUp.vue'

const routes = [
  { path: '/', name: 'hello', component: Header },
  { path: '/register', name: 'register', component: SignUp },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
