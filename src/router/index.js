import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "./../store/index"


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
  {
    path: '/goFarmmy/signin',
    name: 'Sign-in',
    component: () => import('../views/Signin.vue')
  },

]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  //const tokenInLocalStorage = localStorage.getItem('token')
  const productInLocalStorage = JSON.parse(localStorage.getItem("go_farmmy_products")) || []

  //要再加入去會員中心會導到登入

  if (!store.state.isAuthenticated && store.state.shoppingCart !== productInLocalStorage) {
    store.commit('addProducts', productInLocalStorage)
    next()
    
  }





})

export default router
