import { RouteRecordRaw } from 'vue-router'

export const home: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/modules/home/HomeModule.vue')
  }
]