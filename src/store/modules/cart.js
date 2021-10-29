import Swal from "sweetalert2";
import CartAPI from "../../apis/cart";


const state = {
  shoppingCart: [],
  shippingInfo: {},
  totalPrice: 0,
  controlButton: false


}

const mutations = {

  //vuex商品重新賦值
  updateProducts(state, items) {
    state.shoppingCart = [
      ...items
    ]
  },

  effectButton(state) {
    state.controlButton = false
  },

  blockButton(state) {
    state.controlButton = true
  },

  //運費重新賦值
  updateDelivery(state, items) {
    state.shippingInfo = {
      ...items
    }
  },

  //總費用重新賦值
  updateTotlePrice(state, price) {
    state.totalPrice = price
  },


  //商品要加入購物車
  addProductinCart(state, item) {
    const itemOrder = state.shoppingCart.findIndex(
      (product) => product.id === item.id
    );
    if (itemOrder !== -1) {
      let itemNumber = state.shoppingCart[itemOrder].number
      state.shoppingCart[itemOrder].number = Number(itemNumber) + Number(item.number);
    } else {
      state.shoppingCart.push({
        ...item,
        number: item.number,
      });
    }
  },

  //商品數量增加
  increaseItem(state, item) {
    const newItem = state.shoppingCart.filter((product) => product.name === item.name)
    newItem[0].number += 1
  },

  //減少商品數量
  decreaseItem(state, item) {
    const newItem = state.shoppingCart.filter((product) => product.name === item.name)
    newItem[0].number -= 1
  },



  //刪除商品
  deleteItem(state, item) {
    const newItem = state.shoppingCart.filter((product) => product.name !== item.name)
    state.shoppingCart = [
      ...newItem
    ]
  },


}

const actions = {
  async fetchSoppingCard({ commit }) {
    console.log('有在fetch')
    try {
      const { data } = await CartAPI.getCart()
      console.log('getCar', data)
      const  {cart}  = data
      console.log(cart)
      let CartItems = []
      if (cart !== 'empty') {
        CartItems = cart.items.map(item => ({
          ...item,
          number: item.CartItem.quantity,
        }))
      }

      console.log('fetchSoppingCarddata', CartItems)

      commit('updateDelivery', data.shippingInfo)
      commit('updateTotlePrice', data.totalPrice)
      commit('updateProducts', CartItems)
      commit('effectButton')
      console.log(data)
      return true
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "購物車載入失敗，請稍後再試！",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
      });
      console.log(error)
    }
  },

  async addEmptyShoppingCart({ commit, dispatch }, items) {
    try {
      commit('updateProducts', items)
      console.log('items', items)
      const promise = await Promise.all(
        items.map(async item => await CartAPI.postCart({
          productId: item.id,
          quantity: item.number,
        })
        ))
      if (promise[0].data.status === 'success') {
        dispatch('fetchSoppingCard')
      } else {
        throw new Error(promise[0].data.status)
      }

    } catch (error) {

      console.log(error)

    }
  },

  async ChangeShoppingCart({ dispatch }, items) {
    try {
      const response = await CartAPI.deleteAllCartItem()
      if (response.data.status === 'success' && items.length != 0) {
        dispatch('addEmptyShoppingCart', items)
      }
      if (response.data.status === 'success' && items.length === 0) {
        dispatch('fetchSoppingCard')
      }
    } catch (error) {
      console.log(error)
    }
  },

  async increaseItemNumber({ commit, dispatch }, item) {
    try {
      commit('blockButton')
      commit('increaseItem', item)
      const response = await CartAPI.postAddCartItem({ Id: item.id })
      if (response.status === 200) {
        dispatch('fetchSoppingCard')
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      commit('decreaseItem', item)
      Swal.fire({
        icon: "error",
        title: "增加失敗，請稍後再試！",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  },

  async decreaseItemNumber({ commit, dispatch }, item) {
    try {
      commit('blockButton')
      commit('decreaseItem', item)
      const response = await CartAPI.postSubCartItem({ Id: item.id })
      if (response.status === 200) {
        dispatch('fetchSoppingCard')
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "減少失敗，請稍後再試！",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
      });
      commit('increaseItem', item)
    }
  },

  async deleteItem({ commit, dispatch }, item) {
    try {
      commit('blockButton')
      commit('deleteItem', item)
      const response = await CartAPI.deleteCartItem({ Id: item.id })
      if (response.data.status === 'success') {
        dispatch('fetchSoppingCard')
      } else {
        throw new Error(response.status)
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "刪除失敗，請稍後再試！",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
      });
      dispatch('fetchSoppingCard')
    }
  },




  //console.log(products)
}


export default {
  state,
  mutations,
  actions
}