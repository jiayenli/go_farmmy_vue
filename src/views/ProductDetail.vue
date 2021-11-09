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
        <ProductNavbar @detailPageFilter="productFilter"/>
      </div>
      <div class="product-content-items">
        <h2 class="title">商品介紹</h2>

        <!--商品卡片區-->

        <ProductSingle :item = "this.item" :proccessing= "proccessing" />
        
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";
import ProductSingle from "@/components/ProductSingle.vue";
import ProductNavbar from "@/components/ProductNavbar.vue";
import ProductAPI from "./../apis/products";
import Swal from "sweetalert2";

export default {
  name: "Product-Detail",
  components: {
    Navbar,
    CartNavbar,
    ProductSingle,
    ProductNavbar,
  
  },

  data() {
    return {
      item: {},
      showItems: [],
      filterName: "",
      proccessing: true
    };
  },

  methods: {
    productFilter() {
      this.$router.push({ name: 'Product'})

    },
    controlCartModel() {
      this.$store.commit("closeCartModel");
    },
    async fetchData(Id) {
      try {
        const response = await ProductAPI.getProduct({id:Id});
        this.item = {...response.data.product};
        this.proccessing = false
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
    const Id = this.$route.params.id
    this.fetchData(Id);
  },
  beforeRouteUpdate(to, from, next) {
    const {id} = to.params;
    this.fetchData(id);
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
@media screen and (max-width: 1100px) {
    .product {
    &-content {
      &-nav {
       padding-left: 3%;
      }
      &-items {
        padding-right: 3.5%;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .product {
    &-content {
      &-nav {
        width: 35%;
      }
      &-items {
        width: 65%;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .product {
    &-content {
      flex-direction: column;
          &-nav {
            margin-top: 5%;
        width: 100%;
      }
      &-items {
        margin-top: 3% ;
        width: 100%;
        padding-right: 0%;
      }
    }
  }
  
}
</style>