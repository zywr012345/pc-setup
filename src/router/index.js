import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { // 公司介绍-首页
      path: '/',
      component: () => import('../views/home/homepage.vue')
    },
    { // 公司介绍-轮播
      path: '/introduce',
      component: () => import('../views/home/introduce.vue')
    },
    { // 合作伙伴&案例-首页
      path: '/partner',
      component: () => import('../views/partner/index.vue')
    },
    { // 合作伙伴&案例-轮播
      path: '/partner/introduce',
      component: () => import('../views/partner/introduce.vue')
    }
  ]
})

export default router
