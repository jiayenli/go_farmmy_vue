<template>
  <div class="product-items">
    <div
      class="product-content-items-card"
      v-for="item in initialItems"
      :key="item.id"
    >
      <div class="product-content-items-card-img">
        <div
          v-if="item.quantity > 0"
          class="product-content-items-card-img-number"
        >
          <h5>限量{{ item.quantity }}組</h5>
        </div>
        <div
          v-if="item.quantity === 0"
          class="product-content-items-card-img-number"
        >
          <h5>已售完</h5>
        </div>
        <img :src="item.image" />
        <h4>
          {{ item.description | descriptionLength }}
        </h4>
      </div>
      <h2>{{ item.name }} | {{ item.origin }}</h2>
      <div class="product-content-items-card-specification">
        <i class="fas fa-tag"></i> {{ item.specification }}
      </div>

      <div class="product-content-items-card-price">
        價格：{{ item.price }}元/箱
      </div>
      <div class="product-content-items-card-panel">
        <div class="product-content-items-card-panel-number">
          <button
            class="product-content-items-card-panel-number-icon"
            @click="addNumber(item)"
            :disabled="Number(item.number) >= item.quantity"
          >
            +
          </button>
          <button
            class="product-content-items-card-panel-number-icon"
            @click="deleteNumber(item)"
            :disabled="Number(item.number) <= 1"
          >
            -
          </button>
          <input
            v-model="item.number"
            class="product-content-items-card-panel-number-input"
            id="number"
            type="number"
            :max="item.number"
            @change="changeNumber(item)"
            required
          />
          <span>組</span>
        </div>
        <button
          class="product-content-items-card-panel-button"
          @click.stop.prevent="addItemsTOcard(item)"
          :disabled="
            item.number > item.quantity ||
            Number(item.number) <= 0 ||
            !Number.isInteger(Number(item.number)) ||
            item.quantity === 0
          "
        >
          加入
        </button>
      </div>
      <div
        class="product-content-items-card-warm"
        v-if="item.number > item.quantity && item.quantity !== 0"
      >
        上限 {{ item.quantity }} 組
      </div>
      <div
        class="product-content-items-card-warm"
        v-if="
          !Number.isInteger(Number(item.number)) ||
          Number(item.number) < 0 ||
          (item.number === '0' && item.quantity !== 0)
        "
      >
        請輸入有效數量
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
.product-items {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5% 0;
}
.product-content-items-card {
  //margin-right: 4%;
  position: relative;
  max-height: 420px;
  max-width: 33.3%;
  padding: 0 2%;
  h2 {
    margin-top: 3%;
    text-align: center;
  }
  &-specification,
  &-price {
    text-align: center;
    color: $color-brown;
    font-size: 14px;
  }
  &-img {
    position: relative;
    display: flex;
    height: 60%;
    white-space: normal;
    overflow: hidden;
    &-number {
      position: absolute;
      bottom: 2%;
      right: 2%;
      background-color: $color-yellow;
      transition: 0.5s;
      opacity: 1;
    }
    img {
      object-fit: cover;
      transition: 0.5s;
    }
    h4 {
      position: absolute;
      top: 0;
      right: 50%;
      transform: translateX(50%);
      width: 90%;
      height: 100%;
      opacity: 0;
      line-height: 200%;
      transition: 0.5s;
    }
    &:hover {
      img {
        opacity: 0.3;
      }
      h4 {
        opacity: 1;
      }
      .product-content-items-card-img-number {
        opacity: 0.3;
      }
    }
  }

  &-panel {
    margin-top: 5%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    &-number {
      display: flex;
      &-icon {
        display: flex;
        height: 25px;
        width: 25px;
        margin-right: 3%;
        align-items: center;
        justify-content: center;
        font-weight: bolder;
        background-color: #edda7e;
        transition: 0.3s;
        color: $color-brown;
        cursor: pointer;
        padding: 2% 0 0 0;
        &:hover {
          background-color: $color-brown;
          color: white;
        }
      }

      input {
        display: inline-block;
        width: 20%;
        border: 1px $color-brown solid;
        margin: 0 2%;
        height: 25px;
        padding-left: 2%;
      }
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
    &-button {
      background-color: $color-brown;
      text-align: center;
      color: white;
      white-space: nowrap;
      font-size: 14px;
      padding: 2%;
      transition: 0.3s;
      &:hover {
        background-color: $color-yellow;
        color: $color-brown;
        cursor: pointer;
        font-weight: bolder;
      }
      &:disabled {
        opacity: 0.5;
      }
    }
  }
  &-warm {
    position: absolute;
    left: 24%;
    font-size: 12px;
    color: #ae0000;
  }
}
</style>

<script>
import { descriptionLengthFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import CartAPI from "./../apis/cart";
import Swal from "sweetalert2";
export default {
  props: {
    initialItems: {
      require: true,
    },
  },
  mixins: [descriptionLengthFilter],
  data() {
    return {
      items: this.initialItems,
      productLimit: false,
    };
  },
  methods: {
    addNumber(item) {
      if (Number(item.number) >= item.quantity) {
        return;
      }
      item.number = Number(item.number) + 1;
    },
    deleteNumber(item) {
      if (Number(item.number) <= 1) {
        return;
      }
      item.number = Number(item.number) - 1;
    },
    changeNumber(item) {
      if (item.number === "") {
        item.number = 1;
      }
    },

    addItemsTOcard(item) {
      const itemOrder = this.cart.shoppingCart.findIndex(
        (product) => product.id === item.id
      );
 
      //商品沒有庫存
      if (item.quantity === 0) {
        Swal.fire({
          icon: "warning",
          title: "商品已完售",
          toast: true,
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }

      //商品數量無效
      if (Number(item.number) <= 0 || !Number.isInteger(Number(item.number))) {
        Swal.fire({
          icon: "warning",
          title: "請輸入有效數量",
          toast: true,
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }
      
      //加入購物車的商品+購物車內商品數量已超過庫存數量
      if (itemOrder !== -1) {
        let itemNumber = this.cart.shoppingCart[itemOrder].number;
        if (Number(itemNumber) + Number(item.number) > item.quantity) {
          Swal.fire({
            icon: "warning",
            title: `已達${item.name}購買上限數量！`,
            toast: true,
            showConfirmButton: false,
            timer: 1000,
          });
          return;
        }
      }
      
      this.$store.commit("addProductinCart", item); //沒問題就存到vuex
      
      if (this.isAuthenticated) {
        this.addisAuthenticated(item); //有驗證打api加入後端購物車
      } else {
        localStorage.setItem(
        "go_farmmy_products",
        JSON.stringify(this.cart.shoppingCart)
      )
        Swal.fire({
          icon: "success",
          title: `${item.number}組${item.name} 已加入購物車！`,
          toast: true,
          showConfirmButton: false,
          timer: 1000,
        });
        item.number = 1;
      }
    },

    async addisAuthenticated(item) {
      this.$store.commit('closeCartModel')
      try {
         await  CartAPI.postCart({
          productId: item.id,
          quantity: item.number,
        });
        Swal.fire({
          icon: "success",
          title: `${item.number}組${item.name} 已加入購物車！`,
          toast: true,
          showConfirmButton: false,
          timer: 1000,
        });
        this.$store.dispatch('fetchSoppingCard')
        item.number = 1;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "購物車發生錯誤，請稍後再試",
          toast: true,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  },
  computed: {
    ...mapState(["isAuthenticated", "cart"]),
  },
};
</script>