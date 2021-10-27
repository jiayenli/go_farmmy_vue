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
        src="./../assets/product-img-1.png"
      />
    </div>
    <div class="checkout-product-step">
      <CheckOutStep />
    </div>

    <div class="checkout-product-content">
      <div class="checkout-product-content-left">
        <h2>
          訂單資訊
          <i
            class="fas fa-plus-circle"
            @click="openProductList"
            v-if="!productList"
          ></i
          ><i class="fas fa-minus-circle" v-else @click="openProductList"></i>
        </h2>
        <div class="checkout-product-content-left-content" v-if="productList">
          <div class="checkout-product-content-left-content-products">
            <div class="checkout-product-content-left-content-title">
              <div class="product-image"></div>
              <div class="product-name">名稱</div>
              <div class="product-number">數量</div>
              <div class="product-price">單價</div>
              <div class="product-totle">小計</div>
            </div>
            <div
              v-for="product in cart.shoppingCart"
              :key="product.id"
              class="checkout-product-content-left-content-product"
            >
              <img class="product-image" :src="product.image" />
              <div class="product-name">{{ product.name }}</div>
              <div class="product-number">{{ product.number }} 箱</div>
              <div class="product-price">{{ product.price }} 元</div>
              <div class="product-totle">{{ product.totalPrice }} 元</div>
            </div>
            <div class="checkout-product-content-left-content-totlePrice">
              <h4>小計：{{ cart.totalPrice }}元</h4>
              <h4>運費：{{ cart.shippingInfo.fee }}元</h4>
              <h3>總計：{{ cart.totalPrice + cart.shippingInfo.fee }}元</h3>
            </div>
          </div>
        </div>
        <h2>
          寄送資訊
          <i
            class="fas fa-plus-circle"
            @click="openUserInfoList"
            v-if="!userInfoList"
          ></i
          ><i class="fas fa-minus-circle" @click="openUserInfoList" v-else></i>
        </h2>
        <div class="checkout-product-content-left-content" v-if="userInfoList">
          <div class="checkout-product-content-left-content-orderInfo">
            <h3>訂購人資料</h3>
            <div>姓名：{{ this.userInfo.orderName }}</div>
            <div>電話：{{ this.userInfo.orderPhone }}</div>
            <div>Email：{{ this.userInfo.orderEmail }}</div>
          </div>
          <div class="checkout-product-content-left-content-recieverInfo">
            <h3>收件人資料</h3>
            <div>姓名：{{ this.userInfo.receiverName }}</div>
            <div>電話：{{ this.userInfo.receiverPhone }}</div>
            <div>
              地址：{{
                this.userInfo.receiverCity + this.userInfo.receiverAddress
              }}
            </div>
            <div>Email：{{ this.userInfo.receiverEmail }}</div>
          </div>
        </div>
      </div>
      <div class="checkout-product-content-right">
        <h2>付款方式</h2>
        <div class="checkout-product-content-right-content">
          <div>
            <spn class="payment-choice" :class="{'focus':payWay === 'online'}" @click="choicePayWay('online')"></spn>
            <h3>線上付款</h3>
          </div>
          <div>
            <spn class="payment-choice"></spn>
            <h3>轉帳(即將開放)</h3>
          </div>
          <div>
            <spn class="payment-choice"></spn>
            <h3>貨到付款(即將開放)</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="checkout-product-button">
      <button
        @click.stop.prevent="previousPage"
        :to="{ name: 'CheckOut-Products' }"
        class="checkout-product-button-previous"
      >
        上一步
      </button>
      <button
        type="submit"
        :to="{ name: 'CheckOut-Info' }"
        class="checkout-product-button-next">
        確認付款
      </button>
    </div>
  </div>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";
import CheckOutStep from "@/components/CheckOutStep.vue";
import { mapState } from "vuex";
import Swal from "sweetalert2";
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
      payWay: 'online',
      userInfo: {},
      productList: true,
      userInfoList: false,
    };
  },

  methods: {
    choicePayWay(method) {
      this.payWay = method

    },
    openProductList() {
      this.productList = !this.productList;
    },
    openUserInfoList() {
      this.userInfoList = !this.userInfoList;
    },
    fetchInfo() {
      this.userInfo = {
        ...this.userInfo,
        ...JSON.parse(localStorage.getItem("go_farmmy_user")),
      };
    },
    nextStep() {
      this.$router.push({ name: "CheckOut-Info" });
    },
    previousPage() {
      this.$router.push({ name: "CheckOut-Info" });
    },

    sendInfo() {
      if (
        !this.orderName ||
        !this.orderPhone ||
        !this.orderEmail ||
        !this.receiverName ||
        !this.receiverPhone ||
        !this.receiverEmail ||
        !this.receiverCity ||
        !this.receiverAddress
      ) {
        Swal.fire({
          icon: "warning",
          title: `所有欄位皆為必填喔`,
          toast: true,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  },
  mounted() {
    this.$store.commit("changeCheckOutStep", 3);
    this.fetchInfo();
  },
  computed: {
    ...mapState(["isAuthenticated", "cart"]),
  },
  beforeDestroy() {
    this.$store.commit("changeCheckOutStep", 0);
  },
  watch: {
    //監聽使用者資料有沒有改變
    cart: {
      handler: function () {
        this.calculateTotal();
      },
      deep: true,
    },
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
    width: 70%;
    margin: 2% auto 2% auto;
    display: flex;
    justify-content: space-between;
    align-items: start;
    &-right {
      border: 4px $color-brown solid;
      width: 40%;
      h2 {
        width: 100%;
        border-bottom: 4px $color-brown solid;
        background-color: $color-brown;
        color: white;
        text-align: center;
      }
      &-content {
        div {
          display: flex;
          align-items: center;
          h3 {
            display: inline-block;
            margin: 1% 1%;
          }
          .payment-choice {
            display: inline-block;
            margin: 0 2%;
            height: 20px;
            width: 20px;
            border: 4px $color-brown solid;
            border-radius: 50%;
            cursor: pointer;
          }
          .focus{
            background-color: $color-brown;
          }
        }
      }
    }
    &-left {
      border: 4px $color-brown solid;
      width: 50%;
      h2 {
        width: 100%;
        border-bottom: 4px $color-brown solid;
        background-color: $color-yellow;
        text-align: center;
      }
      &-content {
        width: 100%;
        &-prodcts {
          width: 100%;
        }
        &-product {
          width: 100%;
          display: flex;
          img {
            object-fit: cover;
            height: 100px;
            padding: 1%;
          }
        }
        &-title {
          width: 100%;
          display: flex;
          border-bottom: 4px $color-brown dashed;
          padding: 1% 0;
        }
        &-totlePrice {
          border-top: 4px $color-brown dashed;
          border-bottom: 8px $color-brown solid;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding: 3%;
        }
        .product-image,
        .product-name,
        .product-number,
        .product-price,
        .product-totle {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20%;
        }
        &-orderInfo,
        &-recieverInfo {
          padding: 2%;
        }
      }
    }
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
</style>
