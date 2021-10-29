<template>
  <div class="product-items">
    <h2 class="title">
      季節特選。來自{{ item.origin }}的鮮採{{ item.name }}！
    </h2>
    <div class="product-content-items-card">
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
      </div>
      <div class="product-content-items-card-text">
        <h1>{{ item.name }} | {{ item.origin }}</h1>
        <div class="product-content-items-card-price">
          <h2><i class="fas fa-comment-dollar"></i> 價格：</h2><p class="price-focus">{{ item.price }}元/箱</p>
        </div>
        <div class="product-content-items-card-specification">
          <h2><i class="fas fa-tag"></i> 規格：</h2> 
          <p> {{ item.specification }}</p>
        </div>
                <div class="product-content-items-card-specification">
          <h2><i class="fas fa-archive"></i> 保存方法：</h2>
          <p>{{ item.storage_method }}</p>
        </div>
        <div class="product-content-items-card-description">

          <h4>
            {{ item.description }}
          </h4>
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
                <div
        class="product-content-items-card-warm"
        v-if="item.number > item.quantity && item.quantity !== 0"
      >
        上限 {{ item.quantity }} 組
      </div>
        </div>
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
  justify-content: start;
  flex-wrap: wrap;
  padding: 5% 2%;
}
.title {
  width: 100%;
  border: 4px $color-brown solid;
  background-color: $color-yellow;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.product-content-items-card {
  position: relative;
  background-color: white;
  border: 4px $color-brown solid;

  display: flex;
  justify-content: space-between;
  max-width: 100%;
  padding: 2% 2%;
  margin: 1% 0;
  h1 {
    margin-bottom: 3%;
    color: $color-red;
  }
  &-text {
    width: 40%;
  }
  &-specification,
  &-price {
    align-items: center;
    display: flex;
    color: $color-brown;
    font-size: 14px;
    margin-top: 1%;
  }
  h2 {
     color: #927f62;
  }
  p{
    font-weight: bolder;
    font-size: 16px
  }
  .price-focus {
    font-weight: bolder;
    color: $color-red
  }
  h4 {
    color: #927f62;
    line-height: 160%;
    margin-top: 4%;
  }
  &-img {
    border-radius: 10px;
    position: relative;
   width: 55%;
    overflow: hidden;
    &-number {
      border-radius: 10px;
      padding: 2%;
      font-size: 20px;
      position: absolute;
      top: 2%;
      left: 2%;
      border: 4px solid white;
      background-color: $color-yellow;
      h5 {
        color: $color-red;
      }
    }
    img {
      object-fit: cover;
    }

  }

  &-panel {
    position: relative;
    background-color: $color-yellow;
    border: 4px $color-brown solid;
    padding: 2%;
    margin: 10% 0 5% 0;
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
        background-color: $color-brown;
        transition: 0.2s;
        cursor: pointer;
        color: white;
        padding: 1% 0 0 0;
        &:hover {
          background-color: $color-brown;
          transform: scale(1.1, 1.1);
          
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
      font-weight: bolder;
      padding: 2%;
      transition: 0.2s;
      &:hover {
        transform: scale(1.1, 1.1);
        cursor: pointer;
      }
      &:disabled {
        opacity: 0.5;
      }
    }
  }
  &-warm {
    position: absolute;
    bottom: -50%;
    left: 20%;
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
    item: {
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

      if (this.isAuthenticated) {
        this.addisAuthenticated(item); //有驗證打api加入後端購物車
      } else {
        this.$store.commit("addProductinCart", item);
        localStorage.setItem(
          "go_farmmy_products",
          JSON.stringify(this.cart.shoppingCart)
        );
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
      this.$store.commit("closeCartModel");
      try {
        await CartAPI.postCart({
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
        this.$store.dispatch("fetchSoppingCard");
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