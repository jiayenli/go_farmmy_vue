import Vue from 'vue'
import Vuex from 'vuex'
import Swal from "sweetalert2";
import UserAPI from "./../apis/users";
import cart from './modules/cart'
import order from './modules/order'
import authenticated from './modules/authenticated'
import router from "./../router/index";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //shoppingCart: [],
    isAuthenticated: false,
    currentUser: [],
    token: '',
    cartModel: false,
    checkOutStep: 0,
    filterKeyword: "",
    facebookConnect: false,
  },
  mutations: {
    //搜尋關鍵字賦值
    addFilterKeyword(state, keyword) {
      state.filterKeyword = keyword
    },

    changeFacebookConnect(state) {
      state.facebookConnect = true

    },


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
      localStorage.removeItem("go_farmmy_user")
      localStorage.removeItem("gofarmmy_facebook_connect")
      localStorage.removeItem("go_farmmy_orderId")
      
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

    async fetchFbUser({ commit }, response) {
      console.log('response', response)
      try {
        const backEndResponse = await UserAPI.PostFbSignIn({
          name: response.name,
          email: response.email,
        });
        console.log("backEndResponse", backEndResponse.data);
        const { data } = backEndResponse;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Swal.fire({
          icon: "success",
          title: `歡迎 ${data.user.name}回來！`,
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
        localStorage.setItem("gofarmmy_token", data.token);
        commit("setCurrentUser", data.user);
        router.back();
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "登入錯誤，請洽客服",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }



  },
  modules: {
    cart,
    order,
    authenticated
  }
})
