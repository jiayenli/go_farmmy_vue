import Vue from 'vue'
import Vuex from 'vuex'
//import Swal from "sweetalert2";
import UserAPI from "./../apis/users";
import cart from './modules/cart'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //shoppingCart: [],
    isAuthenticated: false,
    currentUser: [],
    token: '',
    cartModel: false,
    checkOutStep: 0
  },
  mutations: {
    //更改結帳階段
    changeCheckOutStep(state, number) {
      state.checkOutStep = number
    },



    //控制購物車modal顯示
    openCartModel(state) {
      state.cartModel = true

    },
    closeCartModel(state) {
      state.cartModel = false

    },

    //建立登入者資料
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser,
      };

      state.isAuthenticated = true
      state.token = localStorage.getItem('gofarmmy_token')
    },


    logOut(state) {
      localStorage.removeItem("gofarmmy_token");
      localStorage.removeItem("go_farmmy_products");//***確認後可刪 */
      state.cart.shoppingCart = []
      state.currentUser = []
      state.token = ''
      state.isAuthenticated = false

    }




  },
  actions: {

    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await UserAPI.getCurrentUser();
        if (data.status === "error") {
          throw new Error(data.message);
        }
        commit("setCurrentUser", data.currentUser)
        return true
      } catch (error) {
        console.log(error.message);
        commit('logOut')
        return false
      }
    },



  },
  modules: {
    cart,
  }
})
