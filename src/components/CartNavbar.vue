<template>
  <div class="cart-navbar">
    <CartListModal v-if="openCardModel" />
    <div class="cart-navbar-shopping">
      <div class="icon cart-navbar-cart" @click.stop.prevent="showCardModel">
        <span
          v-if="shoppingCart.length > 0"
          class="cart-navbar-cart-notication"
        >
          {{ shoppingCart.length }}
        </span>
        <i class="fas fa-shopping-cart"></i>
      </div>
      <div class="icon cart-navbar-login">
        <i class="fas fa-sign-in-alt"></i>
      </div>
    </div>

    <div v-if="flase" class="icon cart-navbar-logout">
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
  .icon::before {
    content: "";
    transform: translateY(120%);
    position: absolute;
    display: block;
    width: 2vw;
    height: 30%;
    z-index: -1;
    background-color: #edda7e;
  }
  .icon:hover::before {
    background-color: #9ac167;
  }
  &-login {
    cursor: pointer;
    position: relative;
  }
  &-cart {
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