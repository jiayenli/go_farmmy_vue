<template>
  <div class="signin">
    <Navbar />
    <CartNavbar />
    <div class="signin-cover">
      <img class="signin-cover-title" src="./../assets/sign-title-1.png" />
      <img class="signin-cover-img" src="./../assets/product-icon-2.jpg" />
    </div>
    <SigninForm />
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/efficient.scss";
.signin {
  margin: 0 0;
  //outline: 1px red solid;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-image: url("./../assets/home-background.png");
  &-cover {
    position: relative;
    &-title {
      @extend %cover-title;
    }
    &-img {
     @extend %cover-img;
    
    }
  }
}
</style>

<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";
import SigninForm from "@/components/SigninForm.vue";
export default {
  name: "Sign-in",
  components: {
    Navbar,
    CartNavbar,
    SigninForm
  },
};
</script>