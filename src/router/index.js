import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    redirect:"/goFarmmy"
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/goFarmmy',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/goFarmmy/product',
    name: 'Product',
    component: () => import('../views/Product.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
