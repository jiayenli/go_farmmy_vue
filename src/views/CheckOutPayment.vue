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
    <form>
      <div class="checkout-product-content">
        <div class="checkout-product-content-top">
          <h2>訂購人資料</h2>

          <div class="checkout-product-content-top-input">
            <div class="checkout-input checkout-product-content-top-input-name">
              <label for="name"><h3>訂購人姓名</h3></label>
              <input
                placeholder="請填寫「訂購人」姓名，如：李喵吉"
                v-model="orderName"
                class="checkout-product-content-top-input-name-input"
                id="name"
                type="text"
                autofocus
                required
              />
            </div>

            <div
              class="checkout-input checkout-product-content-top-input-phone"
            >
              <label for="name"><h3>訂購人電話</h3></label>
              <input
                placeholder="請填寫「訂購人」電話，如：0910000xxx"
                v-model="orderPhone"
                class="checkout-product-content-top-input-phone-input"
                id="phone"
                type="tel"
                required
              />
            </div>

            <div
              class="checkout-input checkout-product-content-top-input-email"
            >
              <label for="name"><h3>訂購人Email</h3></label>
              <input
                placeholder="將會寄送訂單資訊至訂購人信箱"
                v-model="orderEmail"
                class="checkout-product-content-top-input-email-input"
                id="email"
                type="email"
                required
              />
            </div>
          </div>
        </div>
        <div class="checkout-product-content-top">
          <h2>收件人資料</h2>

          <div class="checkout-product-content-top-input">
            <div class="checkout-input checkout-product-content-top-input-name">
              <label for="name"><h3>收件人姓名</h3></label>
              <input
                v-model="receiverName"
                class="checkout-product-content-top-input-name-input"
                id="name"
                type="text"
                autofocus
                required
              />
            </div>

            <div
              class="checkout-input checkout-product-content-top-input-phone"
            >
              <label for="name"><h3>收件人電話</h3></label>
              <input
                v-model="receiverPhone"
                class="checkout-product-content-top-input-phone-input"
                id="phone"
                type="tel"
                required
              />
            </div>

            <div
              class="checkout-input checkout-product-content-top-input-email"
            >
              <label for="name"><h3>收件人地址</h3></label>
              <select name="city" id="city" v-model="receiverCity" required>
                <option value="man" disabled selected>請選擇縣市</option>
                <option
                  v-for="city in cities"
                  :key="city.id"
                  :value="city.name"
                >
                  {{ city.name }}
                </option>
              </select>

              <input
                v-model="receiverAddress"
                class="checkout-product-content-top-input-email-input"
                id="email"
                type="email"
                required
              />
            </div>

            <div
              class="checkout-input checkout-product-content-top-input-email"
            >
              <label for="name"><h3>收件人Email</h3></label>
              <input
                v-model="receiverEmail"
                class="checkout-product-content-top-input-email-input"
                id="email"
                type="email"
                required
              />
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
          class="checkout-product-button-next"
          :class="{
            block:
              !this.orderName ||
              !this.orderPhone ||
              !this.orderEmail ||
              !this.receiverName ||
              !this.receiverPhone ||
              !this.receiverEmail ||
              !this.receiverCity ||
              !this.receiverAddress,
          }"
        >
          前往付款
        </button>
      </div>
    </form>
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
      orderName: "",
      orderPhone: "",
      orderEmail: "",
      receiverName: "",
      receiverPhone: "",
      receiverEmail: "",
      receiverCity: "",
      receiverAddress: "",
      cities: [
        { name: "基隆市", id: "1" },
        { name: "台北市", id: "2" },
        { name: "新北市", id: "3" },
        { name: "桃園市", id: "4" },
        { name: "新竹市", id: "5" },
        { name: "新竹縣", id: "6" },
        { name: "苗栗市", id: "7" },
        { name: "台中縣", id: "8" },
        { name: "彰化縣", id: "9" },
        { name: "南投縣", id: "10" },
        { name: "雲林縣", id: "11" },
        { name: "嘉義市", id: "12" },
        { name: "嘉義縣", id: "13" },
        { name: "台南市", id: "14" },
        { name: "高雄市", id: "15" },
        { name: "屏東縣", id: "16" },
        { name: "台東縣", id: "18" },
        { name: "花蓮縣", id: "19" },
        { name: "宜蘭縣", id: "20" },
        { name: "澎湖縣", id: "21" },
        { name: "金門縣", id: "22" },
        { name: "連江縣", id: "23" },
      ],
    };
  },

  methods: {
    nextStep() {
      this.$router.push({ name: "CheckOut-Info" });
    },
    previousPage() {
      this.$router.push({ name: "CheckOut-Products" });
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
    margin-top: 2%;
    width: 100 vw;
    &-top {
      padding: 1%;
      //border: 4px $color-brown solid;
      width: 70%;
      margin: 0 auto 2% auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      //background-color: $color-yellow;
      h2 {
        width: 100%;
        border: 4px $color-brown solid;
        background-color: $color-yellow;
        text-align: center;
      }
      &-input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
      .checkout-input {
        width: 70%;
        margin-top: 2%;
        display: flex;
        //margin-right: 5%;
        label {
          height: 45px;
          padding: 2%;
          background-color: $color-brown;
          display: flex;
          justify-content: center;
          align-items: center;
          h3 {
            color: white;
            white-space: nowrap;
          }
        }
        input {
          height: 45px;
          width: 100%;
          font-size: 18px;
          padding-left: 2%;
          border: 4px $color-brown solid;
          &:focus {
            border: 4px $color-yellow solid;
          }
        }
        select {
          font-size: 18px;
          padding-left: 2%;
          border-top: 4px $color-brown solid;
          border-bottom: 4px $color-brown solid;
          border-left: 4px $color-brown solid;
          &:focus {
            border: 4px $color-yellow solid;
          }
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
</style>
