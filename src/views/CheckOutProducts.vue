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
    <div class="checkout-product-step"></div>
    <div class="checkout-product-content">
      <div class="checkout-product-content-product">
        <table>
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
            <tr v-for="product in products" :key="product.id">
              <td class="product-name">
                <img :src="product.image" />
                <div>
                  <h2>{{ product.name }}</h2>
                  <h6>規格：</h6>
                </div>
              </td>
              <td class="product-price">${{ product.price }}</td>
              <td class="product-number">
                <button class="add-item">+</button>

                <span>{{ product.CartItem.quantity }}組</span>
                <button class="reduce-item">-</button>
              </td>
              <td class="product-totle">${{ product.totle }}</td>
              <td class="product-delete">
                <i class="fas fa-trash-alt"></i>
              </td>
            </tr>
          </tbody>
     
        </table>
             <div class="delivery">
          <div>運送方式待補</div>
          <div>運費待補</div>
          <div>合計待補</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";
import CartAPI from "./../apis/cart";
//import ProductAPI from "./../apis/products";
//import Swal from "sweetalert2";

export default {
  name: "checkout-product",
  components: {
    Navbar,
    CartNavbar,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    async fetchShoppingCart() {
      try {
        const { data } = await CartAPI.getCart();
        this.products = {
          ...data.cart.items,
        };
        console.log(this.products);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.fetchShoppingCart();
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
              margin-right: 2%;
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
              h2,
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
            font-size: 18px;
          }
          .product-number {
            color: $color-red;
            .add-item,
            .reduce-item {
              margin: 5%;
              height: 30px;
              width: 30px;
              background-color: $color-yellow;
              border: 3px $color-brown solid;
              border-radius: 5px;
              font-size: 15px;
              font-weight: bolder;
            }
          }
        }
      
      }
        .delivery {
          width: 100%;
          border-top: 4px $color-brown dashed;
        }
    }
  }
}
</style>
