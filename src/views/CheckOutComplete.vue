<template>
  <div class="checkout-product">
    <Navbar />
    <CartNavbar />
    <div class="checkout-product-cover">
      <img
        class="checkout-product-cover-title"
        src="./../assets/checkout-title.png"
      />
      <img
        class="checkout-product-cover-img"
        src="./../assets/about-img-2.png"
      />
    </div>
    <div class="checkout-product-step">
      <CheckOutStep />
    </div>

    <div class="checkout-product-content">
      <h1>訂購完成！</h1>
    </div>
    <div class="checkout-product-button">
      <button
        @click.stop.prevent="previousPage"
        class="checkout-product-button-previous"
      >
        瀏覽商品
      </button>
      <button
        @click.stop.prevent="nextStep"
        class="checkout-product-button-next"
      >
        查看訂單
      </button>
    </div>
  </div>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";
import CheckOutStep from "@/components/CheckOutStep.vue";
import { mapState } from "vuex";
//import Swal from "sweetalert2";
//import CartAPI from "./../apis/cart";
//import ProductAPI from "./../apis/products";

export default {
  name: "checkout-product",
  components: {
    Navbar,
    CartNavbar,
    CheckOutStep,
  },
  data() {
    return {
      payWay: "online",
      userInfo: {},
      productList: true,
      userInfoList: false,
    };
  },

  methods: {
    nextStep() {
      this.$router.push({ name: "User-Order" });
    },
    previousPage() {
      this.$router.push({ name: "Product" });
    },
    empyItems() {
      localStorage.removeItem("go_farmmy_orderId");
      this.$store.dispatch("ChangeShoppingCart", []);
    },
  },
  mounted() {
    this.$store.commit("changeCheckOutStep", 4);
  },
  computed: {
    ...mapState(["isAuthenticated", "cart"]),
  },
  beforeDestroy() {
    this.$store.commit("changeCheckOutStep", 0);
  },

  created() {
    this.empyItems();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/efficient.scss";

.checkout-product {
  margin: 0 0;
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
  &-content {
    margin: 3% 0;
    text-align: center;
  }

  &-button {
    @extend %checkout-button-area;
    &-next,
    &-previous {
      @extend %checkout-button;
      color: $color-brown;
    }
    &-next,
    &-previous {
      &:hover {
        transform: scale(1.1, 1.1);
      }
    }
    .block {
      opacity: 0.5;
      cursor: not-allowed;
      transform: scale(1, 1);
    }
  }
}
.fas {
  cursor: pointer;
}
@media screen and (max-width: 1100px) {
  .checkout-product {
    &-button {
      width: 60%;
      &-next,
      &-previous {
        margin: 0 3%;
      }
    }
  }
}
</style>
