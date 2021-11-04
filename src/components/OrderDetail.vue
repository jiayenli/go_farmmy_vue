<template>
  <div class="checkout-product-content">
    <div class="checkout-product-content-top">
      <h4>訂單日期：{{ order.createdAt | newTime }}</h4>
      <h4>
        出貨狀況：{{ order.shipping_status === "1" ? "已出貨" : "未出貨" }}
      </h4>
    </div>
    <div class="checkout-product-content-left">
      <div class="checkout-product-content-left-title">
        <h2>訂單資訊</h2>
        <h4>訂單編號：{{ order.id }}</h4>
      </div>
      <div class="checkout-product-content-left-content">
        <div class="checkout-product-content-left-content-products">
          <div class="checkout-product-content-left-content-title">
            <div class="product-image"></div>
            <div class="product-name">名稱</div>
            <div class="product-number">數量</div>
            <div class="product-price">單價</div>
            <div class="product-totle">小計</div>
          </div>
          <div
            v-for="product in order.items"
            :key="product.id"
            class="checkout-product-content-left-content-product"
          >
            <router-link
              class="product-image"
              :to="{ name: 'Product-Detail', params: { id: product.id } }"
            >
              <img :src="product.image" />
            </router-link>
            <router-link
              class="product-name"
              :to="{ name: 'Product-Detail', params: { id: product.id } }"
              ><h3>{{ product.name }}</h3></router-link
            >
            <div class="product-number">
              {{ product.OrderItem.quantity }} 箱
            </div>
            <div class="product-price">{{ product.price }} 元</div>
            <div class="product-totle">{{ product.OrderItem.price }} 元</div>
          </div>
          <div class="checkout-product-content-left-content-totlePrice">
            <h4>小計：{{ order.amount - order.shipping_fee }}元</h4>
            <h4>運費：{{ order.shipping_fee }}元</h4>
            <h3>總計：{{ order.amount }}元</h3>
          </div>
        </div>
      </div>
      <h2 class="title-2">寄送資訊</h2>
      <div class="checkout-product-content-left-content">
        <div class="checkout-product-content-left-content-orderInfo">
          <h3>訂購人資料</h3>
          <div>姓名：{{ order.customerName }}</div>
          <div>電話：{{ order.customerPhone }}</div>
          <div>Email：{{ order.customerEmail }}</div>
        </div>
        <div class="checkout-product-content-left-content-recieverInfo">
          <h3>收件人資料</h3>
          <div>姓名：{{ order.recipientName }}</div>
          <div>電話：{{ order.recipientPhone }}</div>
          <div>地址：{{ order.recipientAddress }}</div>
          <div>Email：{{ order.recipientEmail }}</div>
        </div>
      </div>
    </div>
    <div class="checkout-product-content-button">
      <button
        class="checkout-product-content-button-previous"
        @click="previous"
      >
        返回列表
      </button>
      <button class="checkout-product-content-button-next" @click="nextToPay" v-if="order.payment_status === '0'">
        前往付款
      </button>
      <button
        class="checkout-product-content-button-delete"
        @click="deleteOrder"
        v-if="order.payment_status === '0'"
      >
        取消訂單
      </button>
    </div>
  </div>
</template>


<script>
// import Navbar from "@/components/Navbar.vue";
// import CartNavbar from "@/components/CartNavbar.vue";
// import CheckOutStep from "@/components/CheckOutStep.vue";
// import CheckOrderSpinner from "@/components/CheckOrderSpinner.vue";
// import CheckOutModal from "@/components/CheckOutModal.vue";

import { mapState } from "vuex";
//import Swal from "sweetalert2";
import OrderAPI from "../apis/order";
//import axios from "axios";
import Swal from "sweetalert2";
//import CartAPI from "./../apis/cart";
//import ProductAPI from "./../apis/products";
import moment from "moment";

export default {
  name: "Order-Detail",
  components: {},
  data() {
    return {};
  },
  props: {
    order: {
      required: true,
    },
  },

  filters: {
    newTime(datetime) {
      return moment(datetime).format("YYYY-MM-DD -  a h:mm");
    },
  },

  methods: {
    previous() {
      this.$router.push({ name: "User-Order" });
    },
    nextToPay() {
      localStorage.setItem("go_farmmy_orderId", this.order.id);
      this.$router.push({ name: "CheckOut-Payment" });
    },
    async cancelOrder() {
      try {
        const response = await OrderAPI.deleteOrder({ Id: this.order.id });

        if (response.statusText === "OK") {
          this.$router.push({ name: "User-Order" });
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "刪除失敗，請稍後再試",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },

    async deleteOrder() {
      try {
        const result = await Swal.fire({
          title: "確定取消訂單",
          text: "訂單取消後將會從訂單列表中移除",
          icon: "warning",
          focusCancel: true,
          showCancelButton: true,
          confirmButtonColor: "#808080",
          cancelButtonColor: "#2a2a2a",
          cancelButtonText: "取消",
          confirmButtonText: "確認",
        });
        if (!result.isConfirmed) {
          return;
        }
        this.cancelOrder();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    // this.$store.commit("changeCheckOutStep", 3);
  },
  created() {
    // const Id = localStorage.getItem("go_farmmy_orderId") || "";
    // this.checkOrderProccessingWord = "資料核對中";
    // this.checkOrderProccessing = true;
    // this.pay(Id);
    // this.getOrder(Id);
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
  &-content {
    width: 100%;
    &-top {
      width: 80%;
      margin: 0 auto 1% auto;
      display: flex;
      justify-content: space-between;
      h4 {
        color: gray;
      }
    }
    &-left {
      border: 4px $color-brown solid;
      width: 80%;
      margin: 0 auto;
      &-title {
        width: 100%;
        border-bottom: 4px $color-brown solid;
        background-color: $color-yellow;
        text-align: center;
        padding: 1%;
      }
      .title-2 {
        padding: 1%;
        background-color: $color-yellow;
        text-align: center;
        border-bottom: 4px $color-brown solid;
      }
      &-content {
        width: 100%;
        &-prodcts {
          width: 100%;
        }
        &-product {
          margin-top: 0.5%;
          width: 100%;
          display: flex;
          img {
            object-fit: cover;
            height: 100px;
            padding: 2%;
          }
        }
        &-title {
          width: 100%;
          display: flex;
          border-bottom: 4px $color-brown dashed;
          padding: 1% 0;
        }
        &-totlePrice {
          margin-top: 2%;
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
        .product-name {
          color: $color-brown;
        }
        &-orderInfo,
        &-recieverInfo {
          padding: 2%;
        }
      }
    }
    &-button {
      @extend %checkout-button-area;
      width: 50%;
      &-next,
      &-previous,
      &-delete {
        @extend %checkout-button;
        margin: 2%;
        transition: 0.3s;
        color: $color-brown;
        &:hover {
          transform: scale(1.1, 1.1);
        }
      }
      &-next {
        background-color: $color-green;
      }
      &-delete {
        color: white;
        background-color: $color-red;
      }
    }
  }
}
.fas {
  cursor: pointer;
}
</style>
