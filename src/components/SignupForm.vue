<template>
  <div
    class="signin-form"
    @scroll.capture="scrollChange"
    ref="controlScroll"
    @click="controlCartModel"
  >
    <div class="signin-form-img-1">
      <img src="./../assets/vegetable-1.png" />
    </div>
    <div class="signin-form-img-2">
      <img src="./../assets/vegetable-2.png" />
    </div>
    <form class="form">
      <h2>註冊</h2>

      <div class="signin-form-content">
        <div class="signin-form-content-fast">
          <h3>快速登入</h3>
          <h5>您可以透過Facebook和Google免註冊登入</h5>
          <div class="signin-form-content-fast-icon">
            <div class="fab">
              <GoogleSignInButton @sign-in="oAuthSignIn"></GoogleSignInButton>
            </div>
            <i class="fab fa-facebook-f" @click.stop.prevent="fbLogin"></i>
          </div>
        </div>
        <div><h3>會員註冊</h3></div>
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
        <div class="signin-form-content-password">
          <label class="signin-form-content-password-lebel" for="password"
            ><h3>密碼</h3></label
          >
          <input
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
              @click.stop.prevent="clickShowPassword"
            ></i>
            <i
              v-else
              class="fas fa-eye"
              @click.stop.prevent="clickHidePassword"
            ></i>
          </div>
        </div>

        <div class="signin-form-content-checkPassword">
          <label
            class="signin-form-content-checkPassword-lebel"
            for="checkPassword"
            ><h3>密碼確認</h3></label
          >
          <input
            v-model="checkPassword"
            class="signin-form-content-checkPassword-input"
            id="checkPassword"
            type="password"
            autofocus
            required
          />
        </div>

        <div class="signin-form-content-buttonarea">
          <div class="signin-form-content-signin" @click.stop.prevent="signIn">
            <h3>返回登入</h3>
          </div>
          <div
            v-if="!processing"
            class="signin-form-content-button"
            @click.stop.prevent="signUp"
            :class="{ block: !email || !password || !name || !checkPassword }"
          >
            <h3>註冊</h3>
          </div>

          <div v-else class="signin-form-content-button block">
            <h3>註冊中...</h3>
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
  padding: 5% 0 2% 0;
  position: relative;
  overflow: hidden;
  &-img-1 {
    transform-origin: bottom right;
    top: 10%;
    width: 31%;
    position: absolute;
    right: -16%;
    animation: vegatable-move-1 1s ease-in;
  }
  &-img-2 {
    transform-origin: bottom;
    animation: vegatable-move-2 1s ease-in;
    bottom: 0%;
    width: 45%;
    position: absolute;
    left: -25%;
  }
  form {
    border-radius: 5px;
    width: 40%;
    background-color: $color-brown;
    margin: 0 auto;
    text-align: center;
    border: 6px $color-brown solid;
    h2 {
      padding: 2% 0;
      color: white;
    }
  }
  &-content {
    //background-image: url("./../assets/home-background.png");
    background-color: $color-yellow;
    padding: 2% 0 2% 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;

    &-email,
    &-password,
    &-name,
    &-checkPassword {
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
    &-password {
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
      background-color: $color-brown;
      h3 {
        color: white;
      }
    }
    &-signin {
      border: 4px $color-brown dashed;
    }

    &-button,
    &-signin {
      width: 20%;
      margin: 2% 5% 0 0;
      height: 35px;
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
    &-fast {
      width: 100%;
      margin: 1% 0 2% 0;
      border-bottom: 4px $color-brown dashed;
      padding-bottom: 1%;

      &-icon {
        display: flex;
        margin-top: 1%;
        justify-content: center;
        .fab {
          border: 4px solid $color-brown;
          margin: 1% 2%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: white;
          height: 56px;
          width: 56px;
          border-radius: 5px;
          font-size: 20px;
          color: #3b5998;
          transition: 0.3s;
          &:hover {
            cursor: pointer;
            transform: scale(1.1, 1.1);
          }
        }
      }
    }
  }
}
@keyframes vegatable-move-1 {
  0% {
    opacity: 0.3;
    transform: rotate(180deg);
  }
  50% {
    opacity: 0.6;
    transform: rotate(120deg);
  }
  80% {
    opacity: 0.8;
    transform: rotate(-10deg);
  }

  100% {
    opacity: 1;
    transform: rotate(0deg);
  }
}

@keyframes vegatable-move-2 {
  0% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(240deg);
  }
  80% {
    transform: rotate(380deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 1100px) {
  .signin-form {
     form {
       width: 60%;
     }

  }

}
@media screen and (max-width: 767px) {
  .signin-form {
     form {
       width: 80%;
     }

  }

}
@media screen and (max-width: 539px) {
  .signin-form {
     &-content {
       &-button,
    &-signin {
      width: 30%;
    }
     }

  }

}
</style>

<script>
import UsersAPI from "./../apis/users";
import Swal from "sweetalert2";
import store from "./../store/index";
import GoogleSignInButton from "./GoogleSignInButton";
import { mapState } from "vuex";
export default {
  components: {
    GoogleSignInButton,
  },
  data() {
    return {
      showPassword: "password",
      email: "",
      password: "",
      name: "",
      checkPassword: "",
      processing: false,
       googleToken: ""
    };
  },
  methods: {
    async oAuthSignIn(token) {
      this.$store.commit("isSigninProcessing");
      this.googleToken = token;
      try {
        console.log("丟去後端");
        const response = await UsersAPI.PostGoogleSignIn({
          token: this.googleToken,
        });
        const { data } = response;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        console.log(response);
        Swal.fire({
          icon: "success",
          title: `歡迎 ${data.user.name}回來！`,
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
        localStorage.setItem("gofarmmy_token", data.JWTtoken);
        this.$store.commit("setCurrentUser", data.user);
        this.$store.commit("notSigninProcessing");
        this.$router.push({ name: 'Home' });
      } catch (error) {
        console.error(error);
        this.$store.commit("notSigninProcessing");
        Swal.fire({
          icon: "error",
          title: "登入錯誤，請洽客服",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async signUp() {
      this.$store.commit("closeCartModel");
      //確認缺格
      const emptyInput = await this.$store.dispatch("checkEmptyInput", [
        this.email,
        this.name,
        this.password,
        this.checkPassword,
      ]);
      if (emptyInput) {
        return;
      }
      //確認信箱
      const checkEmail = await this.$store.dispatch("checkEmail", this.email);
      if (checkEmail) {
        return;
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
        this.$store.commit("isSigninProcessing");
        const response = await UsersAPI.PostSignUp({
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword,
        });
        const { data } = response;

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        Swal.fire({
          icon: "success",
          title: `歡迎加入Go Farmmy！`,
          toast: true,
          showConfirmButton: false,
          timer: 2000,
        });
        this.$store.commit("notSigninProcessing");
        this.$router.push({ name: "Sign-in" });
      } catch (error) {
        this.processing = false;
        this.password = "";
        this.checkPassword = "";
        this.$store.commit("notSigninProcessing");
        if (error.message === "This email has been registered") {
          Swal.fire({
            icon: "warning",
            title: "email已重複註冊",
            toast: true,
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "註冊失敗，請聯繫客服",
            toast: true,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    },
    signIn() {
      this.$router.push({ name: "Sign-in" });
    },
    controlCartModel() {
      this.$store.commit("closeCartModel");
    },
    clickShowPassword() {
      this.showPassword = "";
    },
    clickHidePassword() {
      this.showPassword = "password";
    },
    getFacebookStatus() {
      window.FB.getLoginStatus((response) => {
        if (response.status === "connected") {
          console.log("已連接", response);
          store.commit("changeFacebookConnect");
        }
      });
    },

    fbLogin() {
      this.$store.commit("isSigninProcessing");
      if (this.facebookConnect) {
        window.FB.api(
          "/me",
          { fields: "name,email" },
          async function (response) {
          await store.dispatch("fetchFbUser", response);
          store.commit("notSigninProcessing");
          }
        );
      } else {
        window.FB.login(
          function (response) {
            if (response.status === "connected") {
              window.FB.api(
                "/me",
                { fields: "name,email" },
                async function (response) {
                 await store.dispatch("fetchFbUser", response);
                 store.commit("notSigninProcessing");
                }
              );
            }  else {
                store.commit("notSigninProcessing")
              }
          },
          {
            scope: "email, public_profile",
            return_scopes: true,
          }
        );
      }
    },
  },

  mounted() {
    this.$refs.controlScroll.scrollIntoView({
      block: "end",
      inline: "nearest",
    });
    this.getFacebookStatus();
  },
   computed: {
    ...mapState(["facebookConnect"]),
  },
};
</script>