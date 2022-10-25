import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { home } from './routes/home-routes'

const routes: RouteRecordRaw[] = [...home]

const router = createRouter({ history: createWebHistory(), routes })

export default router
