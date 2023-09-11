import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/user/:id',
    name: 'userInfo',
    props: true,
    component: () => import('@/views/UserInfo.vue'),
    beforeEnter: (to, from, next) => {
      to.query.userInfo ? next() : next({ name: '404' })
    }
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/E404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
