<template>
  <div class="home-nav" @click="controlCartModel">
    <div class="home-nav-icon">
      <img src="./../assets/home-nav-icon-08.png" />
    </div>

    <router-link :to="{ name: 'Product' }" class="home-nav-icon">
      <img src="./../assets/home-nav-icon-06.png" />
    </router-link>

    <div class="home-nav-logo">
      <router-link :to="{ name: 'Home' }">
        <img src="./../assets/home-logo.png" />
      </router-link>
    </div>
    <div class="home-nav-icon">
      <img src="./../assets/home-nav-icon-09.png" />
    </div>
    <router-link :to="{ name: 'User-Profile' }" class="home-nav-icon">
      <img src="./../assets/home-nav-icon-07.png" />
    </router-link>
  </div>
</template>

<script>
export default {
  methods: {
    controlCartModel() {
      this.$store.commit("closeCartModel");
    },
  },
};
</script>

<style lang="scss" scoped>
.home-nav {
  // position: absolute;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  //width: 100vw;
  &-logo {
    display: flex;
    max-width: 30%;

    img {
      margin: 0 auto;
      min-width: 220px;
      width: 70%;
    }
    &:hover {
      animation: logoFocus 0.1s linear infinite;
    }
  }
  &-icon {
    margin: 0 2%;
    width: 10%;
    min-width: 100px;
    // border-left: 4px #38301f solid;
    padding: 0 0 0 1%;
    z-index: 2;

    &::after {
      content: "";
      top: 80%;
      position: absolute;
      display: block;
      width: 9vw;
      height: 10%;
      z-index: -1;
      background-color: #edda7e;
      transition: 0.3s;
    }
    &::before {
      position: absolute;
      display: block;
      transform: translateX(-250%);
      top: 70%;
      content: "";
      height: 30%;
      width: 0.5%;
      background-color: #38301f;
    }
    &:hover {
      &::after {
        background-color: #9ac167;
      }
    }
  }
  .router-link-active {
    &::after {
      background-color: #9ac167;
    }
  }
}

@keyframes logoFocus {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>