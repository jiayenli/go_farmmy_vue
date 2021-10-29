import { apiHelper } from '../utils/helpers'
import axios from 'axios'
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

  getOrder({ Id }) {
    return apiHelper.get(`/orders/${Id}/payment`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },

  PostSpgatewayCb({ MerchantID,
    TradeInfo,
    TradeSha,
    Version }) {
    return axios.post(`https://go-farmmy-demo.herokuapp.com/spgateway/callback`,{
      MerchantID,
      TradeInfo,
      TradeSha,
      Version
    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },




}