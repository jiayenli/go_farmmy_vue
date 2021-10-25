//import Swal from "sweetalert2";
import CartAPI from "../../apis/cart";


const state = {
  shoppingCart: []

}

const mutations = {

  //vuex商品重新賦值
  updateProducts(state, items) {
    state.shoppingCart = [
      ...items
    ]
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
        name: item.name,
        id: item.id,
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
    try {
      const { data } = await CartAPI.getCart()
      const { items } = data.cart
      const CartItems = items.map(item => ({
        ...item,
        number: item.CartItem.quantity
      }))
      commit('updateProducts', CartItems)
      return true
    } catch (error) {
      console.log(error)

    }

  },

  async addEmptyShoppingCart({ commit }, items) {
    try {
      await items.map(item => CartAPI.postCart({
        productId: item.id,
        quantity: item.number,
      }))
      commit('updateProducts', items)
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