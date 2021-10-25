<template>
  <div class="cartList-modal">
    <div class="cartList-modal-notication">
      <h3>購物車</h3>
      <div class="cartList-modal-notication-content">
        <div
          class="cartList-modal-notication-content-item"
          v-for="item in cart.shoppingCart"
          :key="item.id"
        >
          <div class="cartList-modal-notication-content-item-name">
            <h4>{{ item.name }}</h4>
          </div>
          <div class="cartList-modal-notication-content-item-number">
            <h4>{{ item.number }}組</h4>
          </div>
          <div
            class="cartList-modal-notication-content-item-delete"
            @click.stop.prevent="deleteItems(item)"
          >
            <h6>x</h6>
          </div>
        </div>

        <div
          v-if="isAuthenticated"
          @click.stop.prevent="authenticatedCheckOut"
          class="cartList-modal-notication-content-button"
        >
          <h4>結帳</h4>
        </div>
        <div
          v-if="!isAuthenticated"
          class="cartList-modal-notication-content-button"
          @click.stop.prevent="unAuthenticatedCheckOut"
        >
          <h4>登入結帳</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swal from "sweetalert2";
import CartAPI from "./../apis/cart";
export default {
  computed: {
    ...mapState(["cart", "isAuthenticated"]),
  },
  methods: {
    async deleteItems(item) {
      this.$store.commit("deleteItem", item);
      if (this.isAuthenticated) {  
        try {
          await CartAPI.deleteCartItem({
            Id: item.id,
          });
          this.$store.dispatch("fetchSoppingCard");
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "刪除失敗，請稍後再試！",
            toast: true,
            showConfirmButton: false,
            timer: 2000,
          });
          this.$store.dispatch("fetchSoppingCard");
          return;
        }
      } else {
        localStorage.setItem(
          "go_farmmy_products",
          JSON.stringify(this.cart.shoppingCart)
        );
      }
    },
    authenticatedCheckOut() {
      this.$store.commit("closeCartModel");
      if (this.cart.shoppingCart.length === 0) {
        this.notification();
        return;
      }
      this.$router.push({ name: "CheckOut-Products" });
    },
    unAuthenticatedCheckOut() {
      this.$store.commit("closeCartModel");
      if (this.cart.shoppingCart.length === 0) {
        this.notification();
        return;
      }
      this.$router.push({ name: "CheckOut-Sign-in" });
    },
    notification() {
      Swal.fire({
        icon: "warning",
        title: "購物車內沒有商品！！",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
.cartList-modal {
  border-radius: 5px;
  top: 0;
  right: 115%;
  position: absolute;
  width: 500%;
  background-color: $color-brown;
  border: 4px $color-brown solid;
  box-shadow: -1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  &-notication {
    h3 {
      padding: 2%;
      color: white;
    }
    &-content {
      padding: 2% 2% 5% 2%;
      background-image: url("./../assets/home-background.png");
      &-item {
        padding: 2% 0;
        display: flex;
        &-name,
        &-number {
          width: 50%;
        }
        &-delete {
          background-color: $color-red;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          padding-bottom: 1%;
          cursor: pointer;
          flex-shrink: 0;
          h6 {
            color: white;
          }
        }
      }
      &-button {
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2%;
        background-color: $color-yellow;
        margin-top: 5%;
        &:hover {
          // background-color: $color-green;
          opacity: 0.8;
          cursor: pointer;
        }
      }
    }
  }
}
</style>