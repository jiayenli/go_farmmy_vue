import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {

  getProducts({ categoryId}) {
    const searchParams = new URLSearchParams({ categoryId })
    return apiHelper.get(`/products?${searchParams.toString()}`)
  },
  postCart({ productId, quantity}) {
    return apiHelper.post('/cart', {
      productId,
      quantity

    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

  }

}