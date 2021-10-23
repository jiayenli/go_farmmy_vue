<template>
  <div class="signin-form" @scroll.capture="scrollChange" ref="imgScroll">
    <div class="signin-form-img-1">
      <img src="./../assets/vegetable-1.png" />
    </div>
    <div class="signin-form-img-2" ref="imgScroll">
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
            <i v-if="showPassword" class="fas fa-eye-slash" @click.stop.prevent="clickShowPassword"></i>
            <i v-else class="fas fa-eye" @click.stop.prevent="clickHidePassword"></i>
          </div>
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
    right: -10%;
    animation: vegatable-move-1 1.5s ease-in infinite;
  }
  &-img-2 {
    transform-origin: bottom;
    animation: vegatable-move-1 1.5s ease-in infinite;
    bottom: -10%;
    height: 75%;
    position: absolute;
    left: -15%;
  }
  form {
    width: 40%;
    background-color: $color-brown;
    margin: 0 auto;
    text-align: center;
    border: 4px $color-brown solid;
    h2 {
      padding: 2% 0;
      color: white;
    }
  }
  &-content {
    background-color: $color-yellow;
    padding: 2% 0 2% 0;

    &-email,
    &-password {
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
    &-fast {
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
    transform: rotateX(0deg);
  }
  25% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>

<script>
export default {
  data() {
    return {
      showPassword: "password",
      email: "",
      password: "",
    };
  },
  methods: {
    clickShowPassword() {
      this.showPassword= ""
    },
    clickHidePassword() {
      this.showPassword= "password"
    }
  },

  mounted() {},
};
</script>