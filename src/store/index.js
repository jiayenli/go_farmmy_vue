import Vue from 'vue'
import Vuex from 'vuex'
import Swal from "sweetalert2";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shoppingCart:[],
    isAuthenticated:false,
  },
  mutations: {
    //沒登入存在local storage
    addProducts(state, items) {
      state.shoppingCart = [
        ...items
      ]
    },


    updateProducts(state, item) {
      const itemOrder = state.shoppingCart.findIndex(
        (product) => product.id === item.id
      );
  
      if (itemOrder !== -1) {
        let itemNumber = state.shoppingCart[itemOrder].number 
        if (Number(itemNumber) + Number(item.number) > item.quantity) {
          state.shoppingCart[itemOrder].number = item.quantity
          Swal.fire({
            icon: "success",
            title: `已達${item.name}購買上限數量！`,
            toast: true,
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          state.shoppingCart[itemOrder].number = Number(itemNumber) + Number(item.number);
          Swal.fire({
            icon: "success",
            title: `${item.number}組${item.name} 已加入購物車！`,
            toast: true,
            showConfirmButton: false,
            timer: 3000,
          });
        }
         
      } else {
        state.shoppingCart.push({
          name: item.name,
          id: item.id,
          number: item.number,
        });
        Swal.fire({
          icon: "success",
          title: `${item.number}組${item.name} 已加入購物車！`,
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },

    deleteItem(state, item) {
      const newItem = state.shoppingCart.filter((product) => product.name !== item.name)
      state.shoppingCart = [
        ...newItem
      ]
    }
  },
  actions: {
    // 有登入存在帳號

  },
  modules: {
  }
})
