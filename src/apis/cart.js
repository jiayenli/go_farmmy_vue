import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem("gofarmmy_token")

export default {

  getCart() {
    return apiHelper.get(`/cart`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  deleteCartItem({ Id }) {
    return apiHelper.delete(`/cart/cartItem/${Id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },

  deleteAllCartItem() {
    return apiHelper.delete('/cart/cartItem', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },

  postCart({ productId, quantity }) {
    return apiHelper.post('/cart', {
      productId,
      quantity

    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  postAddCartItem({ Id }) {
    return apiHelper.post(`/cart/cartItem/${Id}/add`, {
      Id
    },{
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  postSubCartItem({ Id }) {
    return apiHelper.post(`/cart/cartItem/${Id}/sub`, {
      Id
    },{
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },

}