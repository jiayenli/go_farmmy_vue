<template>
  <div class="checkout-product">
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
    <form>
      <div class="checkout-product-content">
        <div class="checkout-product-content-top">
          <h2>訂購人資料</h2>

          <div class="checkout-product-content-top-input">
            <div class="checkout-input checkout-product-content-top-input-name">
              <label for="name"><h3>訂購人姓名</h3></label>
              <input
                placeholder="請填寫「訂購人」姓名，如：李喵吉"
                v-model="userInfo.customerName"
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
                v-model="userInfo.customerPhone"
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
                v-model="userInfo.customerEmail"
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
          <div>
            <i class="far fa-circle" v-if="!sameInfo" @click="addSameInfo"></i
            ><i v-else class="fas fa-circle" @click="cancelSameInfo"></i
            >同訂購人資料
          </div>

          <div class="checkout-product-content-top-input">
            <div class="checkout-input checkout-product-content-top-input-name">
              <label for="name"><h3>收件人姓名</h3></label>
              <input
                v-model="userInfo.recipientName"
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
                v-model="userInfo.recipientPhone"
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
              <select
                name="city"
                id="city"
                v-model="userInfo.recipientCity"
                required
              >
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
                v-model="userInfo.recipientAddress"
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
                v-model="userInfo.recipientEmail"
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
          @click.stop.prevent="nextStep"
          type="submit"
          :to="{ name: 'CheckOut-Info' }"
          class="checkout-product-button-next"
          :disabled="
            !this.userInfo.customerName ||
            !this.userInfo.customerPhone ||
            !this.userInfo.customerEmail ||
            !this.userInfo.customerName ||
            !this.userInfo.recipientPhone ||
            !this.userInfo.recipientEmail ||
            !this.userInfo.recipientCity ||
            !this.userInfo.recipientAddress
          "
        >
          訂單確認
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
import OrderAPI from "./../apis/order";
import CheckOrderSpinner from "@/components/CheckOrderSpinner.vue";
//import ProductAPI from "./../apis/products";

export default {
  name: "checkout-product",
  components: {
    Navbar,
    CartNavbar,
    CheckOutStep,
    CheckOrderSpinner,
  },
  data() {
    return {
      sameInfo: false,
      userInfo: {
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        recipientName: "",
        recipientPhone: "",
        recipientEmail: "",
        recipientCity: "",
        recipientAddress: "",
      },

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
      checkOrderProccessing: false,
      checkOrderProccessingWord: "訂單建立中",
      tradeInfo: {},
      orderId: 0,
    };
  },

  methods: {
    addSameInfo() {
      this.userInfo.recipientName = this.userInfo.customerName;
      this.userInfo.recipientEmail = this.userInfo.customerEmail;
      this.userInfo.recipientPhone = this.userInfo.customerPhone;
      this.sameInfo = true;
    },
    cancelSameInfo() {
      this.userInfo.recipientName = "";
      this.userInfo.recipientEmail = "";
      this.userInfo.recipientPhone = "";
      this.sameInfo = false;
    },
    fetchInfo() {
      this.userInfo = {
        ...this.userInfo,
        customerName: this.currentUser.name,
        customerEmail: this.currentUser.email,
        ...JSON.parse(localStorage.getItem("go_farmmy_user")),
      };
    },
    async nextStep() {
      if (this.cart.shoppingCart.length === 0) {
        this.checkOrderProccessingWord = "購物車內無商品，請添加商品";
        this.checkOrderProccessing = true;
        setTimeout(this.previousPage, 1500);
        return;
      }
      const {
        customerName,
        customerPhone,
        customerEmail,
        recipientName,
        recipientPhone,
        recipientEmail,
        recipientCity,
        recipientAddress,
      } = this.userInfo;
      if (
        !customerName ||
        !customerPhone ||
        !customerEmail ||
        !recipientName ||
        !recipientPhone ||
        !recipientEmail ||
        !recipientCity ||
        !recipientAddress
      ) {
        Swal.fire({
          icon: "warning",
          title: `所有欄位皆為必填喔`,
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }
      if (
        customerEmail.indexOf("@") === -1 ||
        customerEmail.indexOf(".com") === -1 ||
        recipientEmail.indexOf("@") === -1 ||
        recipientEmail.indexOf(".com") === -1
      ) {
        Swal.fire({
          icon: "warning",
          title: `email需含有 @ 與 .com `,
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
        return;
      }

      const result = await Swal.fire({
        title: "訂單即將送出",
        text: "訂單確認後即不可修改，可至會員中心查看",
        icon: "warning",
        focusConfirm: true,
        showCancelButton: true,
        confirmButtonColor: "#808080",
        cancelButtonColor: "#2a2a2a",
        cancelButtonText: "取消",
        confirmButtonText: "訂單確認",
      });
      if (!result.isConfirmed) {
        return;
      }

      localStorage.setItem("go_farmmy_user", JSON.stringify(this.userInfo));
      this.postOrder();
    },

    async postOrder() {
      try {
        this.checkOrderProccessing = true;
        const {
          customerName,
          customerPhone,
          customerEmail,
          recipientName,
          recipientPhone,
          recipientEmail,
          recipientCity,
          recipientAddress,
        } = this.userInfo;
        const response = await OrderAPI.postOrder({
          customerName,
          customerPhone,
          customerEmail,
          recipientName,
          recipientPhone,
          recipientEmail,
          recipientCity,
          recipientAddress: recipientCity + recipientAddress,
        });
        if (response.data.message === "Successfully added an order") {
          this.orderId = response.data.orderId;
          localStorage.setItem("go_farmmy_orderId", this.orderId);
          this.checkOrderProccessing = false;
          this.$store.dispatch("ChangeShoppingCart", []);
          this.$router.push({ name: "CheckOut-Payment" });
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        this.checkOrderProccessing = false;
        Swal.fire({
          icon: "warning",
          title: `訂單建立失敗，請與客服聯繫 `,
          toast: true,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },

    previousPage() {
      this.$router.push({ name: "CheckOut-Products" });
    },
  },
  mounted() {
    this.$store.commit("changeCheckOutStep", 2);
    this.fetchInfo();
  },
  computed: {
    ...mapState(["isAuthenticated", "cart", "currentUser"]),
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
        margin-bottom: 1%;
        border: 4px $color-brown solid;
        background-color: $color-yellow;
        text-align: center;
      }
      div {
        text-align: center;
        width: 100%;
      }
      .fa-circle {
        margin-right: 1%;
        &:hover {
          cursor: pointer;
        }
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
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: scale(1, 1);
      }
    }
  }
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
  &-content {
    &-top {
 
      width: 90%;
      .checkout-input {
        width: 100%;
      }
    }
  }
  }


}
@media screen and (max-width: 539px) {
  .checkout-product {
    &-content {
      .checkout-input {
        input {
          font-size: 14px;
        }
      }
    
    }
     &-button {
         &-next,
    &-previous {
      font-size: 15px;
    }
     }
  }
}
</style>
