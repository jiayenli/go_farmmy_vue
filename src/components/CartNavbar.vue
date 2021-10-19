<template>
  <div class="cart-navbar">
    <div class="cart-navbar-shopping">
      <div class="icon cart-navbar-cart"><i class="fas fa-shopping-cart"></i></div>
      <div class="icon cart-navbar-login"><i class="fas fa-sign-in-alt"></i></div>
    </div>

    <div v-if="flase" class="icon cart-navbar-logout"><i class="fas fa-sign-out-alt"></i></div>
  </div>
</template>

<style lang="scss" scoped>
.cart-navbar {
  background-image: url("./../assets/home-background.png");
  z-index: 5;
  position: absolute;
  right: 0;
  top: 5%;
  padding: 0 0.6%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  .icon::before {
    content: "";
      transform: translateY(120%);
      position: absolute;
      display: block;
      width: 2VW;
      height: 15%;
      z-index: -1;
      background-color: #edda7e;
  }
  .icon:hover::before {
    background-color: #9ac167;

  }
  .fas  {
    font-size: 25px;
    margin:50% 0 ;
  }

}
</style>