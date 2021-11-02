<template>
  <div class="product">
    <Navbar />
    <CartNavbar />
    <div class="product-cover" @click="controlCartModel">
      <img class="product-cover-title" src="./../assets/product-icon-1.png" />
      <img class="product-cover-img" src="./../assets/about-img-2.png" />
    </div>
    <div class="product-content" @click="controlCartModel">
      <div class="product-content-nav">
        <ProductNavbar @listPageFilter="filterItem"
        @refresh ="refresh" />
      </div>
      <div class="product-content-items">
        <h2 class="title">商品一覽</h2>

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
import ProductNavbar from "@/components/ProductNavbar.vue";
import ProductAPI from "./../apis/products";
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  name: "Product",
  components: {
    Navbar,
    CartNavbar,
    ProductList,
    ProductNavbar,
  },

  data() {
    return {
      items: [],
      showItems: [],
    };
  },

  methods: {
    refresh() {
      this.filterItem()

    },
    filterItem() {
      this.showItems = this.items.filter(
        (item) =>
          item.name.includes(this.filterKeyword) ||
          item.origin.includes(this.filterKeyword)
      );
      this.$store.commit("addFilterKeyword", "");
    },

    controlCartModel() {
      this.$store.commit("closeCartModel");
    },
    async fetchData({ categoryId }) {
      try {
        const response = await ProductAPI.getProducts({ categoryId });
        console.log('product',response)
        this.items = response.data.products;
        if (this.filterKeyword) {
          this.filterItem();
        } else {
          this.showItems = [...this.items];
        }
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
  computed: {
    ...mapState(["filterKeyword"]),
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
    }
    &-items {
      .title {
        margin: 0 2%;
        border-bottom: solid $color-brown 4px;
      }
      padding-right: 7.5%;
      width: 70%;

      //outline: red 1px solid;
    }
  }
}
</style>