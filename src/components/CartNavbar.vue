<template>
  <div class="cart-navbar">
    <CartListModal v-if="openCardModel" />
    <div class="cart-navbar-shopping">
      <div class="icon cart-navbar-cart" @click.stop.prevent="showCardModel" title="購物車">
        <span
          v-if="shoppingCart.length > 0"
          class="cart-navbar-cart-notication"
        >
          {{ shoppingCart.length }}
        </span>
        <i class="fas fa-shopping-cart" ></i>
      </div>
      <router-link :to="{ name: 'Sign-in' }">
      <div class="icon cart-navbar-login" title="登入">
        <i class="fas fa-sign-in-alt" ></i>
      </div>
      </router-link>
    </div>

    <div v-if="flase" class="icon cart-navbar-logout"  title="登出">
      <i class="fas fa-sign-out-alt"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
.cart-navbar {
  background-image: url("./../assets/home-background.png");
  z-index: 5;
  position: absolute;
  right: 0;
  top: 5%;
  padding: 0 0.6%;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: -1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  // .icon::before {
  //   content: "";
  //   transform: translateY(120%);
  //   position: absolute;
  //   display: block;
  //   width: 2vw;
  //   height: 30%;
  //   z-index: -1;
  //   background-color: #edda7e;
  // }
  .icon:hover {
    //background-color: #9ac167;
    transform:scale(1.1,1.1);
  }
  &-login {
    cursor: pointer;
    position: relative;
     transition:0.3s;
  }
  &-cart {
     transition:0.3s;
    cursor: pointer;
    position: relative;
    &-notication {
      position: absolute;
      display: flex;
      width: 15px;
      height: 15px;
      background-color: #ae0000;
      border-radius: 50%;
      top: 10%;
      left: -10%;
      color: white;
      align-items: center;
      justify-content: center;
      padding: 2px;
      font-size: 2px;
    }
  }
  .fas {
    font-size: 25px;
    margin: 50% 0;
    color: $color-brown;
   
  }
}
</style>

<script>
import CartListModal from "@/components/CartListModal.vue";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["shoppingCart"]),
  },
  components: {
    CartListModal,
  },
  data() {
    return {
      openCardModel: false,
    };
  },
  methods: {
    showCardModel() {
      this.openCardModel = !this.openCardModel
    }
  }
};
</script>