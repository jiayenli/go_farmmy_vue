<template>
  <div class="cart-navbar">
    <CartListModal v-if="cartModel" />
    <div class="cart-navbar-shopping">
      <div
        class="icon cart-navbar-cart"
        @click.stop.prevent="showCardModel"
        title="購物車"
        v-if="checkOutStep === 0"
      >
        <span
          v-if="cart.shoppingCart.length > 0"
          class="cart-navbar-cart-notication"
        >
          {{ cart.shoppingCart.length }}
        </span>
        <i class="fas fa-shopping-cart"> </i>
        <h6>購物車</h6>
      </div>
      <router-link :to="{ name: 'Sign-in' }">
        <div
          v-if="!isAuthenticated"
          class="icon cart-navbar-login"
          title="登入"
        >
          <i class="fas fa-sign-in-alt"></i>
          <h6>登入</h6>
        </div>
      </router-link>
      <div
        v-if="isAuthenticated"
        class="icon cart-navbar-logout"
        title="登出"
        @click.stop.prevent="logOut"
      >
        <i class="fas fa-sign-out-alt"></i>
        <h6>登出</h6>
      </div>
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

  .icon:hover {
    //background-color: #9ac167;
    transform: scale(1.1, 1.1);
  }
  &-login,
  &-logout {
    cursor: pointer;
    position: relative;
    transition: 0.3s;
    text-align: center;
    margin: 50% 0;
  }
  &-cart {
    margin: 50% 0;
    transition: 0.3s;
    cursor: pointer;
    position: relative;
    text-align: center;
    &-notication {
      position: absolute;
      width: 18px;
      height: 18px;
      background-color: #ae0000;
      border-radius: 50%;
      top: -20%;
      left: -10%;
      color: white;

      font-size: 12px;
    }
  }
  .fas {
    font-size: 25px;
    color: $color-brown;
  }
}
</style>

<script>
import CartListModal from "@/components/CartListModal.vue";
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  computed: {
    ...mapState(["cart", "isAuthenticated", "cartModel", "checkOutStep"]),
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
    controlCartModel() {
      this.$store.commit("closeCartModel");
    },
    showCardModel() {
      if (this.cartModel) {
        this.$store.commit("closeCartModel");
      } else {
        this.$store.commit("openCartModel");
      }
    },

    async logOut() {
      this.$store.commit("closeCartModel");

      if (this.cart.shoppingCart.length > 0) {
        const result = await Swal.fire({
          title: "購物車內尚有物品",
          text: "購物車內尚有物品，是否確認登出",
          icon: "warning",
          focusCancel: true,
          showCancelButton: true,
          confirmButtonColor: "#808080",
          cancelButtonColor: "#38301f",
          cancelButtonText: "取消登出",
          confirmButtonText: "確認登出",
        });
        if (!result.isConfirmed) {
          return;
        }
      }
      this.$store.commit("logOut");
this.$router.push({ name: "Sign-in" });
      
      
      Swal.fire({
        icon: "success",
        title: "登出成功！",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
      });
    },
  },
};
</script>