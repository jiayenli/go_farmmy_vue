import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "./../store/index"
import Swal from "sweetalert2";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'None',
    redirect: "/goFarmmy"
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/goFarmmy',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: "/goFarmmy/product/detail/:id",
    name: 'Product-Detail',
    component: () => import('../views/ProductDetail.vue')
  },

  {
    path: '/goFarmmy/product',
    name: 'Product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/goFarmmy/user/profile',
    name: 'User-Profile',
    component: () => import('../views/User.vue')
  },
  {
    path: '/goFarmmy/user/order',
    name: 'User-Order',
    component: () => import('../views/UserOrder.vue')
  },
  {
    path: '/goFarmmy/user/order/:id',
    name: 'User-Order-Page',
    component: () => import('../views/UserOrderPage.vue')
  },

  {
    path: '/goFarmmy/signin',
    name: 'Sign-in',
    component: () => import('../views/Signin.vue')
  },
  {
    path: '/goFarmmy/signup',
    name: 'Sign-up',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/goFarmmy/checkout/signin',
    name: 'CheckOut-Sign-in',
    component: () => import('../views/CheckoutSignin.vue')
  },

  {
    path: '/goFarmmy/checkout/product',
    name: 'CheckOut-Products',
    component: () => import('../views/CheckOutProducts.vue'),
  },
  {
    path: '/goFarmmy/checkout/information',
    name: 'CheckOut-Info',
    component: () => import('../views/CheckOutInfo'),
  },

  {
    path: '/goFarmmy/checkout/payment',
    name: 'CheckOut-Payment',
    component: () => import('../views/CheckOutPayment'),
  },

  {
    path: '/goFarmmy/checkout/complete',
    name: 'CheckOut-Complete',
    component: () => import('../views/CheckOutComplete'),
  },


]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  store.commit('closeCartModel')
  const tokenInLocalStorage = localStorage.getItem('gofarmmy_token')
  const productInLocalStorage = JSON.parse(localStorage.getItem("go_farmmy_products")) || []
  let getItem = false
  let isAuthenticated = store.state.isAuthenticated
  const pathsWithoutAuthentication = ['Sign-in', 'CheckOut-Sign-in']
  //const WithoutAuthenticationPage = ['Sign-in', 'CheckOut-Sign-in', 'Sign-up']

  //要再加入去會員中心會導到登入

  //如果vuex會員資料被清空，用local storage token抓
  //等使用者資料api用好 要在這裡多打一次，要用await 拿isAuthenticate

  //登入中不能去註冊跟登入頁面


  if (!isAuthenticated && tokenInLocalStorage) {
    store.dispatch('fetchSoppingCard')
    isAuthenticated = await store.dispatch('fetchCurrentUser')

  }


  ////////////這裡是剛登入狀態////////////////////////////////


  //如果是剛登入的登入者，打api取得該使用者購物車內容，並放在vuex

  if (isAuthenticated && pathsWithoutAuthentication.includes(from.name)) {
    getItem = await store.dispatch('fetchSoppingCard') //確定vuex同步後端購物車了
  }
  const shoppingCartinVuex = store.state.cart.shoppingCart
 

  if (getItem && pathsWithoutAuthentication.includes(from.name) &&
    isAuthenticated) {
    //local storage和vuex都有資料，詢問使用者要保留哪個資料
    if (shoppingCartinVuex.length !== 0 &&
      productInLocalStorage.length !== 0) {
      const result = await Swal.fire({
        title: "是否更新購物車",
        text: "帳號內之購物車已有商品，是否需要更新",
        icon: "warning",
        focusCancel: true,
        showCancelButton: true,
        confirmButtonColor: "#808080",
        cancelButtonColor: "#2a2a2a",
        cancelButtonText: "維持原帳號內購物車",
        confirmButtonText: "更新為現有購物車",
      })

      //要保留local host資料
      console.log(productInLocalStorage)
      if (result.isConfirmed) {
        await store.dispatch('ChangeShoppingCart', productInLocalStorage)
      }
      localStorage.removeItem("go_farmmy_products")

    }


    //local storage有資料，但vuex沒有，將local storage存到vuex和後端
    if (
      productInLocalStorage.length !== 0 &&
      shoppingCartinVuex.length === 0) {
      store.dispatch('addEmptyShoppingCart', productInLocalStorage)
      localStorage.removeItem("go_farmmy_products")

    }
  }
  



  if (isAuthenticated && to.name.includes('Sign-up')) {
    console.log('text有到這裡重導向路由')
    next('/goFarmmy')
    return
  }

  next()


})

export default router
