//import Swal from "sweetalert2";
import CartAPI from "../../apis/cart";


const state = {
  shoppingCart: [],
  shippingInfo: {},
  totalPrice: 0,


}

const mutations = {

  //vuex商品重新賦值
  updateProducts(state, items) {
    state.shoppingCart = [
      ...items
    ]
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
      const { items } = data.cart
      const CartItems = items.map(item => ({
        ...item,
        number: item.CartItem.quantity,
      }))
      console.log(data)
    
      commit('updateDelivery', data.shippingInfo)
      commit('updateTotlePrice', data.totalPrice)
      commit('updateProducts', CartItems)
      return true
    } catch (error) {
      console.log(error)

    }

  },

  async addEmptyShoppingCart({ commit,dispatch},items) {
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
    const response = await CartAPI.deleteAllCartItem()
    if (response.data.status === 'success') {
      dispatch('addEmptyShoppingCart', items)
    }


    //console.log(products)
  },




}

export default {
  state,
  mutations,
  actions
}