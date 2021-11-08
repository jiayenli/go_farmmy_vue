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
      <div class="checkout-product-content-product">
        <div
          v-if="cart.shoppingCart.length === 0"
          class="checkout-product-content-product-noproduct"
        >
          <h2>您的購物車尚無商品！</h2>

          <div class="checkout-product-content-product-noproduct-button">
            <router-link
              class="checkout-product-content-product-noproduct-button"
              :to="{ name: 'Product' }"
            >
              找新鮮
            </router-link>
          </div>
        </div>
        <table v-if="cart.shoppingCart.length > 0">
          <thead>
            <tr>
              <th class="product-name-th">購買商品</th>
              <th class="product-price-th">單價</th>
              <th class="product-number-th">數量</th>
              <th class="product-totle-th">總計</th>
              <th class="product-delete-th"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in cart.shoppingCart" :key="product.id">
              <td class="product-name">
                <img :src="product.image" />
                <div>
                  <h1>{{ product.name }}</h1>
                  <h6>規格：{{ product.specification }}</h6>
                </div>
              </td>
              <td class="product-price">${{ product.price }} 元</td>
              <td class="product-number">
                <div class="product-number-flex">
                  <div>
                    <button
                      class="add-item desk-add"
                      @click="increaseItem(product)"
                      :disabled="
                        product.number === product.quantity ||
                        cart.controlButton
                      "
                    >
                      +
                    </button>
                  </div>
                  <div class="number-input">{{ product.number }}組</div>
                  <div>
                    <button
                      class="add-item phone-add"
                      @click="increaseItem(product)"
                      :disabled="
                        product.number === product.quantity ||
                        cart.controlButton
                      "
                    >
                      +
                    </button>
                    <button
                      class="reduce-item"
                      @click="decreaseItem(product)"
                      :disabled="product.number <= 1 || cart.controlButton"
                    >
                      -
                    </button>
                  </div>
                </div>
                <h6>商品剩{{ product.quantity }}組</h6>
              </td>
              <td class="product-totle">${{ product.totalPrice }} 元</td>
              <td class="product-delete">
                <i
                  class="fas fa-trash-alt"
                  @click="deleteItems(product)"
                  :class="{ canNotDelete: cart.controlButton }"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="cart.shoppingCart.length > 0"
          class="checkout-product-content-delivery"
        >
          <div
            class="checkout-product-content-delivery-notice"
            v-if="!cart.shippingInfo.fee"
          >
            <h3>超過10箱的大量訂購</h3>
            <h3>將由專人為您計算運費</h3>
            <h6>謝謝您的支持！</h6>
          </div>
          <div class="checkout-product-content-delivery-content">
            <div>商品小計：{{ cart.totalPrice }} 元</div>
            <div>
              運費合計：{{
                cart.shippingInfo.fee
                  ? `${cart.shippingInfo.fee} 元`
                  : "大量請洽客服人員"
              }}
            </div>

            <div class="total">
              商品總計：{{ total ? `${total}元(含運費)` : "請洽客服" }}
            </div>
            <p>為了確保品質，農作伙的生鮮產品皆採冷藏宅配</p>
          </div>
        </div>
      </div>
    </div>
    <div class="checkout-product-button">
      <button class="checkout-product-button-previous">上一步</button>
      <button
        class="checkout-product-button-next"
        :class="total ? '' : 'block'"
        @click.prevent.stop="nextStep"
      >
        填寫資料
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";
import CheckOutStep from "@/components/CheckOutStep.vue";
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  name: "checkout-product",
  components: {
    Navbar,
    CartNavbar,
    CheckOutStep,
  },
  data() {
    return {
      products: [],
      total: 0,
      controlButton: false,
    };
  },
  methods: {
    nextStep() {
      if (this.cart.shoppingCart.length === 0) {
        Swal.fire({
          icon: "warning",
          title: `購物車內沒有商品唷`,
          toast: true,
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      if (this.total) {
        this.$router.push({ name: "CheckOut-Info" });
      } else {
        Swal.fire({
          icon: "warning",
          title: `超過購買上限，請洽客服`,
          toast: true,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
    calculateTotal() {
      this.total = this.cart.totalPrice + this.cart.shippingInfo.fee;
    },
    async increaseItem(item) {
      if (item.number === item.quantity) {
        Swal.fire({
          icon: "warning",
          title: `${item.name}僅剩${item.quantity}箱庫存！`,
          toast: true,
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }
      this.$store.dispatch("increaseItemNumber", item);
    },
    async decreaseItem(item) {
      if (item.number === 1) {
        Swal.fire({
          icon: "warning",
          title: "數量不可為零",
          toast: true,
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }
      this.$store.dispatch("decreaseItemNumber", item);
    },
    async deleteItems(item) {
      if (this.cart.controlButton) {
        return;
      }
      this.$store.dispatch("deleteItem", item);
    },
  },
  mounted() {
    this.calculateTotal();
    this.$store.commit("changeCheckOutStep", 1);
  },

  beforeDestroy() {
    this.$store.commit("changeCheckOutStep", 0);
  },
  computed: {
    ...mapState(["isAuthenticated", "cart", "checkOutStep"]),
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
    &-product {
      margin: 0 auto;
      width: 70%;
      border: 4px $color-brown solid;
      border-radius: 5px;
      table {
        border-spacing: 0;
        width: 100%;
        thead {
          color: white;
          background-color: $color-brown;
          height: 50px;
          .product-name-th {
            width: 40%;
          }
          .product-price-th {
            width: 10%;
          }
          .product-number-th {
            width: 30%;
          }
          .product-totle-th {
            width: 10%;
          }
          .product-delete-th {
            width: 10%;
          }
        }
        tbody {
          .product-name {
            display: flex;
            height: 150px;
            width: 100%;
            display: flex;
            align-items: center;
            img {
              margin-left: 2%;
              margin-right: 5%;
              height: 90%;
              width: 80%;
              overflow: hidden;
              object-fit: cover;
              border-radius: 5px;
            }
            div {
              flex-shrink: 1;
              display: flex;
              flex-direction: column;
              width: 100%;
              h1,
              h6 {
                white-space: nowrap;
              }
            }
          }
          .product-price,
          .product-number,
          .product-totle,
          .product-delete {
            text-align: center;
            font-weight: bolder;
            font-size: 24px;
          }
          .product-number {
            color: $color-red;
            &-flex {
              display: flex;
              justify-content: center;
            }
            h6 {
              font-size: 12px;
            }
            .number-input {
              margin: 0 3%;
            }
            .add-item,
            .reduce-item {
              // display: flex;
              // align-items: center;
              // justify-content: center;
              margin: 0 5%;
              height: 30px;
              width: 30px;
              background-color: $color-yellow;
              border: 3px $color-brown solid;
              border-radius: 5px;
              font-size: 15px;
              font-weight: bolder;
              transform: 0.3s;
              &:hover {
                transform: scale(1.1, 1.1);
              }
            }
            .phone-add {
              display: none;
            }
          }
          .product-delete {
            .fas {
              cursor: pointer;
              transform: 0.3s;
              &:hover {
                transform: scale(1.1, 1.1);
              }
            }
            .canNotDelete {
              opacity: 0.5;
            }
          }
        }
      }
      &-noproduct {
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 2%;
        &-button {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          height: 50px;
          background-color: $color-yellow;
          color: white;
          width: 80px;
          margin: 3%;
          transform: 0.3s;
          &:hover {
            transform: scale(1.1, 1.1);
          }
        }
      }
    }
    &-delivery {
      margin-top: 3%;
      padding: 2%;
      width: 100%;
      border-top: 4px $color-brown dashed;
      display: flex;
      justify-content: flex-end;
      &-content {
        font-weight: bolder;
        font-size: 18px;
        div {
          white-space: nowrap;
          margin-bottom: 3%;
        }
        p {
          color: $color-red;
          font-size: 12px;
        }
        .total {
          color: $color-red;
          font-size: 24px;
        }
      }
      &-notice {
        margin-right: 2%;
        border: 4px $color-red solid;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        padding: 5px;
        background-color: $color-yellow;
        h3,
        h6 {
          white-space: nowrap;
          margin-bottom: 1%;
          color: $color-red;
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

    &-previous {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &-next {
      &:hover {
        transform: scale(1.1, 1.1);
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
      &-product {
        width: 85%;
        table {
          thead {
            .product-name-th {
              width: 30%;
            }
            .product-price-th {
              width: 15%;
            }
            .product-number-th {
              width: 25%;
            }
            .product-totle-th {
              width: 25%;
            }
            .product-delete-th {
              width: 5%;
            }
          }
          tbody {
            .product-name {
              div {
                h6 {
                  display: none;
                }
              }
              img {
                height: 60%;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .checkout-product {
    &-content {
      &-product {
        table {
          thead {
            .product-name-th {
              width: 20%;
            }
            .product-price-th {
              width: 20%;
            }
            .product-number-th {
              width: 25%;
            }
            .product-totle-th {
              width: 25%;
            }
            .product-delete-th {
              width: 5%;
            }
          }
          tbody {
            .product-name {
              text-align: center;
            }
            .product-number {
              &-flex {
                flex-direction: column;
              }
              .phone-add {
                display: unset;
              }
              .desk-add {
                display: none;
              }
            }
            img {
              display: none;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 539px) {
  .checkout-product {
    &-content {
      &-delivery {
        &-notice {
          display: none;
        }
      }
      &-product {
        table {
          thead {
            .product-name-th,
            .product-price-th,
            .product-number-th,
            .product-totle-th,
            .product-delete-th {
              font-size: 14px;
            }
          }
          tbody {
            .product-price {
              font-size: 16px;
            }
            .product-name {
              text-align: center;
            }
             .product-totle {
                font-size: 16px;
              }
            .product-number {
              .number-input {
                font-size: 16px;
              }
            }
            img {
              display: none;
            }
          }
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
