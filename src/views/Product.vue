<template>
  <div class="product">
    <Navbar />
    <CartNavbar />
    <div class="product-cover">
      <img class="product-cover-title" src="./../assets/product-icon-1.png" />
      <img class="product-cover-img" src="./../assets/product-img-1.png" />
    </div>
    <div class="product-content">
      <div class="product-content-nav">
        <div class="product-content-nav-search">
          <div>
            <i class="fas fa-search"></i>
          </div>
          <input placeholder="火龍果！" type="text" required />
        </div>
        <div class="product-content-nav-category">
          <h2>商品分類</h2>
          <div class="product-content-nav-category-name">
          <div >
            <h3>全部</h3>
          </div>
          <div >
            <h3>果物</h3>
          </div>
          <div >
            <h3>蔬菜</h3>
          </div>
          </div>
        </div>
      </div>
      <div class="product-content-items">
        <h2>商品一覽</h2>
        <!--商品卡片區-->
        <ProductList :initialItems="items" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";
import ProductList from "@/components/ProductList.vue";
import ProductAPI from "./../apis/products";
import Swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    Navbar,
    CartNavbar,
    ProductList,
  },

  data() {
    return {
      items: [],
    };
  },

  methods: {
    async fetchData() {
      try {
        const response = await ProductAPI.getProducts({ categoryId: "" });
        this.items = {
          ...response.data,
        };
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "商品載入錯誤，請稍後再試",
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";

.product {
  margin: 0 0;
  //outline: 1px red solid;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-image: url("./../assets/home-background.png");
  &-cover {
    position: relative;
    &-title {
      position: absolute;
      max-height: 90px;
      max-width: 250px;
      left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;
    }
    &-img {
      margin-top: 1%;
      height: 300px;
      width: 100%;
      object-fit: cover;
    }
  }
  &-content {
    display: flex;
    margin-top: 3%;
    &-nav {
      width: 30%;
      padding-left: 10%;
      padding-right: 3%;
      // outline: green 1px solid;
      &-search {
        display: flex;
        //padding: 2%;
        //background-color: $color-brown;
        input {
          margin-left: 5%;
          height: 40px;
          border: 4px $color-brown solid;
          padding-left: 2%;
          width: 100%;
        }
        div {
          flex-shrink: 0;
          display: flex;
          height: 40px;
          width: 40px;
          background-color: $color-brown;
          justify-content: center;
          align-items: center;
          color: white;
        }
      }
      &-category {
        margin-top: 18%;
        border: 4px $color-brown solid;
        background-color: $color-brown;

        h2 {
          padding: 2%;
          color: white;
        }
        &-name {
          background-image: url("./../assets/home-background.png");
          padding: 2%;
          padding-top: 5%;
          h3 {
            margin-bottom:5% ;
          }
          h3::before {
            content: "";
            display: inline-block;
            height: 10px;
            width: 10px;
            border-radius: 50%;
            border: 4px $color-brown solid;
            margin-right: 5%;
            transition: 0.3s;
          }
          h3:hover {
            &::before {
              background-color: $color-brown;
            }
          }
        }
      }
    }
    &-items {
      padding-right: 7.5%;
      width: 70%;
      h2 {
        margin:0 2%;
        border-bottom: solid $color-brown 4px;
      }

      //outline: red 1px solid;
    }
  }
}


</style>