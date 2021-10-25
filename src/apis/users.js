import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem("gofarmmy_token")

export default {
  PostSignIn({email, password}) {
    return apiHelper.post('/users/signin', {
      email,
      password
    })
  },
  getCurrentUser() {
    return apiHelper.get('/users/currentUser', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },




}