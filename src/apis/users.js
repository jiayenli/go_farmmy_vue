import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem("gofarmmy_token")

export default {
  getFacebook() {
    return apiHelper.get('/auth/facebook')
  },
  getFacebookCallback() {
    return apiHelper.get('/auth/facebook/status')
  },


  getGoogle() {
    return apiHelper.get('/auth/google')
  },

  PostSignIn({ email, password }) {
    return apiHelper.post('/users/signin', {
      email,
      password
    }, {
      validateStatus: function (status) {
        return status <= 500
      }
    })
  },

  PostSignUp({ name,
    email,
    password,
    checkPassword }) {
    return apiHelper.post('/users', {
      name,
      email,
      password,
      checkPassword
    }, {
      validateStatus: function (status) {
        return status <= 500
      }
    })
  },

  PutUser({name, email, password, newPassword, checkPassword }) {
    return apiHelper.put('/users', {
      name,
      email,
      password,
      newPassword,
      checkPassword
    }, {
      validateStatus: function (status) {
        return status <= 500
      },
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
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