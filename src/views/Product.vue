<template>
  <div class="product">
    <Navbar />
    <CartNavbar />
    <div class="product-cover" @click="controlCartModel">
      <img class="product-cover-title" src="./../assets/product-icon-1.png" />
      <img class="product-cover-img" src="./../assets/product-img-1.png" />
    </div>
    <div class="product-content" @click="controlCartModel">
      <div class="product-content-nav">
        <div class="product-content-nav-search">
          <div>
            <i class="fas fa-search" @click="filterItem"></i>
          </div>
          <input placeholder="火龍果！" type="text" required v-model="filterName" @keyup="filterItem"/>
        </div>
        <div class="product-content-nav-category">
          <h2>商品分類</h2>
          <div class="product-content-nav-category-name">
            <router-link
              class="product-content-nav-category-link"
              :to="{ name: 'Product' }"
            >
              <h3>全部</h3>
            </router-link>

            <div>
              <router-link
                class="product-content-nav-category-link"
                :to="{ name: 'Product', query: { categoryId: 1 } }"
              >
                <h3>果物</h3>
              </router-link>
            </div>
            <div>
              <router-link
                class="product-content-nav-category-link cat"
                :to="{ name: 'Product', query: { categoryId: 11 } }"
              >
                <h3>蔬菜</h3>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="product-content-items">
        <h2>商品一覽</h2>
        <!--商品卡片區-->
        <ProductList :initialItems="showItems" />
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
  name: "Product",
  components: {
    Navbar,
    CartNavbar,
    ProductList,
  },

  data() {
    return {
      items: [],
      showItems: [],
      filterName:""
    };
  },

  methods: {
    filterItem() {
      this.showItems = this.items.filter(item => item.name.includes(this.filterName) || item.origin.includes(this.filterName))

    },


    controlCartModel() {
      this.$store.commit("closeCartModel");
    },
    async fetchData({ categoryId }) {
      try {
        const response = await ProductAPI.getProducts({ categoryId });
        this.items = [
          ...response.data,
        ];
        this.showItems = [
          ...this.items]
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
    const { categoryId = "" } = this.$route.query;
    this.fetchData({ categoryId });
  },
  beforeRouteUpdate(to, from, next) {
    const { categoryId = "" } = to.query;
    this.fetchData({ categoryId });
    next();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/efficient.scss";

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
      @extend %cover-title;
    }
    &-img {
      @extend %cover-img;
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
        }
        &-link {
          h3 {
            color: $color-brown;
            margin-bottom: 5%;
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
         .router-link-exact-active {
          h3::before {
          background-color: $color-brown;
          }
        }
      }
    }
    &-items {
      padding-right: 7.5%;
      width: 70%;
      h2 {
        margin: 0 2%;
        border-bottom: solid $color-brown 4px;
      }

      //outline: red 1px solid;
    }
  }
}
</style>