<template>
  <div
    class="signin-form"
    @scroll.capture="scrollChange"
    @click="controlCartModel"
  >
    <h2>修改個人資料</h2>
    <form class="form">
      <div class="signin-form-content">
        <div class="signin-form-content-name">
          <label class="signin-form-content-name-lebel" for="name"
            ><h3>姓名</h3></label
          >
          <input
            v-model="name"
            class="signin-form-content-name-input"
            id="name"
            type="name"
            autofocus
            required
          />
        </div>
        <div class="signin-form-content-email">
          <label class="signin-form-content-email-lebel" for="email"
            ><h3>Email</h3></label
          >
          <input
            v-model="email"
            class="signin-form-content-email-input"
            placeholder="請含有@、com等字元"
            id="email"
            type="email"
            required
          />
        </div>
        <div class="signin-form-content-initialPassword">
          <label
            class="signin-form-content-initialPassword-lebel"
            for="password"
            ><h3>舊密碼</h3></label
          >
          <input
            placeholder="密碼更動時才需要填寫"
            v-model="initialPassword"
            class="signin-form-content-initialPassword-input"
            id="initialPassword"
            :type="showInitialPassword"
            autofocus
            required
          />
          <div class="signin-form-content-password-eye">
            <i
              v-if="showInitialPassword"
              class="fas fa-eye-slash"
              @click.stop.prevent="clickShowPassword('showInitialPassword')"
            ></i>
            <i
              v-else
              class="fas fa-eye"
              @click.stop.prevent="clickHidePassword('showInitialPassword')"
            ></i>
          </div>
        </div>
        <div class="signin-form-content-password">
          <label class="signin-form-content-password-lebel" for="password"
            ><h3>新密碼</h3></label
          >
          <input
            placeholder="密碼更動時才需要填寫"
            v-model="password"
            class="signin-form-content-password-input"
            id="password"
            :type="showPassword"
            autofocus
            required
          />
          <div class="signin-form-content-password-eye">
            <i
              v-if="showPassword"
              class="fas fa-eye-slash"
              @click.stop.prevent="clickShowPassword('password')"
            ></i>
            <i
              v-else
              class="fas fa-eye"
              @click.stop.prevent="clickHidePassword('password')"
            ></i>
          </div>
        </div>

        <div class="signin-form-content-checkPassword">
          <label
            class="signin-form-content-checkPassword-lebel"
            for="checkPassword"
            ><h3>新密碼確認</h3></label
          >
          <input
            placeholder="密碼更動時才需要填寫"
            v-model="checkPassword"
            class="signin-form-content-checkPassword-input"
            id="checkPassword"
            type="password"
            autofocus
            required
          />
        </div>

        <div class="signin-form-content-buttonarea">
          <div
            v-if="!processing"
            class="signin-form-content-button"
            @click.stop.prevent="editUser"
            :class="{ block: !email || !name }"
          >
            <h3>修改</h3>
          </div>

          <div v-else class="signin-form-content-button block">
            <h3>修改中...</h3>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
.signin-form {
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 5%;
  h2 {
    text-align: center;
    border-radius: 5px;
    margin: 0 auto;
    width: 80%;
    margin-bottom: 3%;
    background-color: $color-brown;

    border-bottom: 6px $color-brown dashed;

    padding: 1% 0;
    color: white;
  }

  form {
    //background-color: $color-yellow;

    border-radius: 5px;
    width: 80%;
    margin: 0 auto;
    text-align: center;
    border: 6px $color-brown solid;
  }
  &-content {
    //background-image: url("./../assets/home-background.png");

    padding: 0 0 2% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;

    &-email,
    &-password,
    &-name,
    &-checkPassword,
    &-initialPassword {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: left;
      margin-top: 2%;
      input,
      label {
        width: 90%;
        display: block;
        margin-bottom: 1%;
      }
      input {
        // background-color: $color-yellow;
        border-radius: 5px;
        height: 45px;
        font-size: 16px;
        padding-left: 2%;
        border: 4px $color-brown solid;
      }
    }
    &-password,
    &-initialPassword {
      position: relative;
      &-eye {
        position: absolute;
        right: 10%;
        top: 50%;
        color: $color-yellow;
        cursor: pointer;
      }
    }
    &-buttonarea {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }

    &-button {
      border: 4px $color-brown solid;
      background-color: $color-yellow;
      width: 20%;
      margin: 2% 5% 0 0;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      transition: 0.3s;

      &:hover {
        cursor: pointer;
        transform: scale(1.05, 1.05);
      }
    }
    .block {
      opacity: 0.7;
      &:hover {
        cursor: not-allowed;
        transform: scale(1, 1);
      }
    }
  }
}
</style>

<script>
import UserAPI from "./../apis/users";
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  data() {
    return {
      showPassword: "password",
      showInitialPassword: "password",
      passwordKeyWord: "",
      email: "",
      password: "",
      name: "",
      checkPassword: "",
      initialPassword: "",
      processing: false,
    };
  },
  methods: {
    async editUser() {
      this.$store.commit("closeCartModel");
      //確認缺格
      const emptyInput = await this.$store.dispatch("checkEmptyInput", [
        this.email,
        this.name,
      ]);
      if (emptyInput) {
        return;
      }
      //確認信箱
      const checkEmail = await this.$store.dispatch("checkEmail", this.email);
      if (checkEmail) {
        return;
      }

      //確認舊密碼新密碼跟密碼確認都是同個狀態
      if (this.password || this.initialPassword) {
        if (!this.initialPassword) {
          Swal.fire({
            icon: "warning",
            title: "未填舊密碼",
            toast: true,
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }
        if (!this.password) {
          Swal.fire({
            icon: "warning",
            title: "未填新密碼",
            toast: true,
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }
      }

      //確認密碼相同
      const checkPasswordCorrect = await this.$store.dispatch("checkPassword", {
        password: this.password,
        checkPassword: this.checkPassword,
      });
      if (checkPasswordCorrect) {
        return;
      }

      try {
        this.processing = true;
        const response = await UserAPI.PutUser({
          id: this.currentUser.id,
          name: this.name,
          email: this.email,
          password: this.initialPassword,
          newPassword: this.password,
          checkPassword: this.checkPassword,
        });
        const { data } = response;
        console.log("putUser", data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        Swal.fire({
          icon: "success",
          title: `修改成功！`,
          toast: true,
          showConfirmButton: false,
          timer: 2000,
        });
        this.processing = false;
        this.initialPassword= ""
        this.password = "";
        this.checkPassword = "";
        this.$store.dispatch("fetchCurrentUser");
      } catch (error) {
        this.$store.dispatch("fetchCurrentUser");
        this.fetchUser();
        this.processing = false;
        this.initialPassword= ""
        this.password = "";
        this.checkPassword = "";
        if (error.message === "This email has been registered") {
          Swal.fire({
            icon: "warning",
            title: "email已重複註冊",
            toast: true,
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }
        if (error.message === "Wrong password") {
          Swal.fire({
            icon: "warning",
            title: "密碼輸入錯誤",
            toast: true,
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }

        Swal.fire({
          icon: "error",
          title: "修改失敗，請聯繫客服",
          toast: true,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    fetchUser() {
      this.email = this.currentUser.email;
      this.name = this.currentUser.name;
    },

    controlCartModel() {
      this.$store.commit("closeCartModel");
    },
    clickShowPassword(word) {
      if (word === "showInitialPassword") {
        this.showInitialPassword = "";
      }
      if (word === "password") {
        this.showPassword = "";
      }
    },
    clickHidePassword(word) {
      if (word === "showInitialPassword") {
        this.showInitialPassword = "password";
      }
      if (word === "password") {
        this.showPassword = "password";
      }
    },
  },
  created() {
    this.fetchUser();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>