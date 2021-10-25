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
      <h2>登入</h2>
      <div class="signin-form-content">
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
            autofocus
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

        <div class="signin-form-content-button" @click.stop.prevent="signIn">
          <h3>登入</h3>
        </div>
        <div class="signin-form-content-fast">
          <h3>快速登入</h3>
          <div class="signin-form-content-fast-icon">
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-google"></i>
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
  padding: 5% 0;
  position: relative;
  overflow: hidden;
  &-img-1 {
    transform-origin: bottom right;
    top: 10%;
    height: 50%;
    position: absolute;
    right: -16%;
    animation: vegatable-move-1 1s ease-in;
  }
  &-img-2 {
    transform-origin: bottom;
    animation: vegatable-move-2 1s ease-in;
    bottom: 0%;
    height: 75%;
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
    align-items: flex-end;
    border-radius: 5px;

    &-email,
    &-password {
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
    &-button {
      background-color: $color-brown;
      width: 20%;
      margin: 2% 5% 0 0;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      transition: 0.3s;

      h3 {
        color: white;
      }
      &:hover {
        cursor: pointer;
        transform: scale(1.05, 1.05);
      }
    }
    &-fast {
      width: 100%;
      margin-top: 5%;
      border-top: 4px $color-brown dashed;
      padding-top: 2%;

      &-icon {
        display: flex;
        margin-top: 1%;
        justify-content: center;
        .fab {
          margin: 1%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: $color-brown;
          height: 40px;
          width: 40px;
          border-radius: 50%;
          color: white;
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
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(120deg);
  }
  80% {
    transform: rotate(-10deg);
  }

  100% {
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
</style>

<script>
import UsersAPI from "./../apis/users";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      showPassword: "password",
      email: "",
      password: "",
    };
  },
  methods: {
    controlCartModel() {
      this.$store.commit("closeCartModel");
    },
    clickShowPassword() {
      this.showPassword = "";
    },
    clickHidePassword() {
      this.showPassword = "password";
    },
    async signIn() {
      this.$store.commit("closeCartModel");
      try {
        const response = await UsersAPI.PostSignIn({
          email: this.email,
          password: this.password,
        });
        const { data } = response;
        Swal.fire({
          icon: "success",
          title: `歡迎 ${data.user.name}回來！`,
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
        localStorage.setItem("gofarmmy_token", data.token);
        this.$store.commit("setCurrentUser", data.user);

        if (this.$route.name === "Sign-in") {
          this.$router.back();
        }
        if (this.$route.name === "CheckOut-Sign-in") {
          this.$router.push({ name: "CheckOut-Products" });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "帳號或密碼錯誤，請重試",
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  },

  mounted() {
    this.$refs.controlScroll.scrollIntoView({
      block: "end",
      inline: "nearest",
    });
  },
};
</script>