


const state = {
  userInfo: {},
}

const mutations = {

  //訂單使用者資料重新賦值
  updateUserInfo(state, user) {
    state.userInfo = {
      ...user
    }
  },
 }

export default {
  state,
  mutations
}