<template>
  <div class="checkout-product">
    <CheckOutModal
      v-if="PaymentStage"
      :tradeInfo="tradeInfo"
      :totalCost="totalCost"
    />
    <CheckOrderSpinner
      v-if="checkOrderProccessing"
      :text="checkOrderProccessingWord"
    />
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
    <form name="Spgateway" :action="tradeInfo.PayGateWay" method="POST">
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
            <h6>訂單編號：{{ orderList.id }}</h6>
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
                v-for="product in orderList.items"
                :key="product.id"
                class="checkout-product-content-left-content-product"
              >
                <img class="product-image" :src="product.image" />
                <div class="product-name">{{ product.name }}</div>
                <div class="product-number">
                  {{ product.OrderItem.quantity }} 箱
                </div>
                <div class="product-price">{{ product.price }} 元</div>
                <div class="product-totle">
                  {{ product.OrderItem.price }} 元
                </div>
              </div>
              <div class="checkout-product-content-left-content-totlePrice">
                <h4>小計：{{ orderList.amount - orderList.shipping_fee }}元</h4>
                <h4>運費：{{ orderList.shipping_fee }}元</h4>
                <h3>總計：{{ orderList.amount }}元</h3>
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
            ><i
              class="fas fa-minus-circle"
              @click="openUserInfoList"
              v-else
            ></i>
          </h2>
          <div
            class="checkout-product-content-left-content"
            v-if="userInfoList"
          >
            <div class="checkout-product-content-left-content-orderInfo">
              <h3>訂購人資料</h3>
              <div>姓名：{{ orderList.customerName }}</div>
              <div>電話：{{ orderList.customerPhone }}</div>
              <div>Email：{{ orderList.customerEmail }}</div>
            </div>
            <div class="checkout-product-content-left-content-recieverInfo">
              <h3>收件人資料</h3>
              <div>姓名：{{ orderList.recipientName }}</div>
              <div>電話：{{ orderList.recipientPhone }}</div>
              <div>地址：{{ orderList.recipientAddress }}</div>
              <div>Email：{{ orderList.recipientEmail }}</div>
            </div>
          </div>
        </div>
        <div class="checkout-product-content-right">
          <h2>付款方式</h2>
          <div class="checkout-product-content-right-content">
            <div>
              <span
                class="payment-choice"
                :class="{ focus: payWay === 'online' }"
                @click="choicePayWay('online')"
              ></span>
              <h3>線上付款</h3>
            </div>
            <div>
              <span class="payment-choice"></span>
              <h3>轉帳(即將開放)</h3>
            </div>
            <div>
              <span class="payment-choice"></span>
              <h3>貨到付款(即將開放)</h3>
            </div>
          </div>
        </div>
      </div>
      <input type="hidden" name="MerchantID" :value="tradeInfo.MerchantID" />
      <input type="hidden" name="TradeInfo" :value="tradeInfo.TradeInfo" />
      <input type="hidden" name="TradeSha" :value="tradeInfo.TradeSha" />
      <input type="hidden" name="Version" :value="tradeInfo.Version" />
      <div class="checkout-product-button">
        <button type="submit" class="checkout-product-button-next">付款</button>
      </div>
    </form>
  </div>
</template>


<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";
import CheckOutStep from "@/components/CheckOutStep.vue";
import CheckOrderSpinner from "@/components/CheckOrderSpinner.vue";
import CheckOutModal from "@/components/CheckOutModal.vue";

import { mapState } from "vuex";
import Swal from "sweetalert2";
import OrderAPI from "./../apis/order";
//import axios from "axios";
//import Swal from "sweetalert2";
//import CartAPI from "./../apis/cart";
//import ProductAPI from "./../apis/products";

export default {
  name: "checkout-product",
  components: {
    Navbar,
    CartNavbar,
    CheckOutStep,
    CheckOrderSpinner,
    CheckOutModal,
  },
  data() {
    return {
      payWay: "online",
      productList: true,
      userInfoList: false,
      checkOrderProccessing: false,
      checkOrderProccessingWord: "訂單建立中",
      tradeInfo: {},
      totalCost: 0,
      PaymentStage: false,
      orderId: 0,
      orderList: [],
    };
  },

  methods: {
    choicePayWay(method) {
      this.payWay = method;
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

    async pay(Id) {
      if (Id === "") {
        this.checkOrderProccessingWord = "訂單建立失敗，請至會員中心確認";
        this.checkOrderProccessing = true;
        setTimeout(this.previousPage, 2000);
        return;
      }
      try {
        const response = await OrderAPI.getPayment({ Id });
        this.tradeInfo = response.data.tradeInfo;
        this.checkOrderProccessing = false;
      } catch (error) {
        this.checkOrderProccessing = false;
        Swal.fire({
          icon: "warning",
          title: `訂單建立失敗，請與客服聯繫 `,
          toast: true,
          showConfirmButton: false,
          timer: 2000,
        });
        setTimeout(this.previousPage, 2000);
      }
    },

    async getOrder(Id) {
      try {
        const response = await OrderAPI.getOrder({ Id });
        if (response.data.order.payment_status === "1") {
          this.$router.push({ name: "CheckOut-Complete" });
          return;
        } else {
          this.orderList = response.data.order;
          this.checkOrderProccessing = false;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async previousPage() {
      const Id = localStorage.getItem("go_farmmy_orderId") || "";
      if (Id === "") {
        this.$router.push({ name: "User-Order" });
        return;
      }
    },
  },
  mounted() {
    this.$store.commit("changeCheckOutStep", 3);
  },
  created() {
    const Id = localStorage.getItem("go_farmmy_orderId") || "";
    this.checkOrderProccessingWord = "資料核對中";
    this.checkOrderProccessing = true;
    this.pay(Id);
    this.getOrder(Id);
  },

  computed: {
    ...mapState(["isAuthenticated", "cart"]),
  },
  beforeDestroy() {
    localStorage.removeItem("go_farmmy_orderId");
    this.$store.commit("changeCheckOutStep", 0);
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
    align-items: flex-start;
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
          .focus {
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
@media screen and (max-width: 1100px) {
  .checkout-product {
    &-content {
      width: 90%;
    }
  }
}

@media screen and (max-width: 767px) {
  .checkout-product {
    &-content {
      flex-direction: column;
      width: 90%;
      &-left {
        width: 100%;
      }
      &-right {
        margin-top: 5%;
        width: 100%;
      }
    }
  }
}
</style>
