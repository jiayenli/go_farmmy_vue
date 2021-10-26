import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem("gofarmmy_token")

export default {

  postOrder({ 
    customerName,
    customerEmail,
    customerPhone,
    recipientEmail,
    recipientName,
    recipientAddress,
    recipientPhone
 }) {
    return apiHelper.post('/orders', {
      customerName,
      customerEmail,
      customerPhone,
      recipientEmail,
      recipientName,
      recipientAddress,
      recipientPhone


    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },


}