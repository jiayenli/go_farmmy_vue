import Swal from "sweetalert2";
import UserAPI from "../../apis/users";

const actions = {

  checkEmptyInput({ commit }, items) {
    commit
    const findResult = items.findIndex(item => item === "")
    if (findResult !== -1) {
      Swal.fire({
        icon: "warning",
        title: '請填寫所有欄位唷！',
        toast: true,
        showConfirmButton: false,
        timer: 1500,
      });
      return true
    }
  },

  checkEmail({ commit }, email) {
    commit
    if (
      email.indexOf("@") === -1 ||
      email.indexOf(".com") === -1
    ) {
      Swal.fire({
        icon: "warning",
        title: `email需含有 @ 與 .com `,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
      });
      return true;
    }
  },

  checkPassword({ commit }, items){
    commit
    if (items.password !== items.checkPassword) {
      Swal.fire({
        icon: "warning",
        title: `密碼確認與密碼不相同`,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
      });
      return true;
    }

  },
async googleSignIn({ commit }) {
  console.log('有到這裡')
  const response = await UserAPI.getGoogle()
  console.log(response)
    commit
  }

}





export default {
  actions
}