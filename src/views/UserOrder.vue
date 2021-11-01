<template>
  <div class="user">
    <Navbar />
     <CartNavbar />
    <div class="user-cover" @click="controlCartModel">
      <img class="user-cover-title" src="./../assets/product-icon-1.png" />
      <img class="user-cover-img" src="./../assets/product-img-1.png" />
    </div>
    <div class="user-content" @click="controlCartModel">
      <div class="user-content-nav">
        <UserNavbar @detailPageFilter="productFilter"/>
      </div>
      <div class="user-content-items">

        <!--商品卡片區-->
        <UserOrderList />
        
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";
import UserNavbar from "@/components/UserNavbar.vue";
import UserOrderList from "@/components/UserOrderList.vue";



export default {
  name: "Member",
  components: {
    Navbar,
    UserNavbar,
    UserOrderList,
    CartNavbar

  },

  data() {
    return {
      item: {},
      showItems: [],
      filterName: "",
    };
  },

  methods: {
    productFilter() {
      this.$router.push({ name: 'Product'})
    },
    controlCartModel() {
      this.$store.commit("closeCartModel");
    },

  },


};
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/efficient.scss";

.user {
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

      padding-right: 7.5%;
      width: 70%;

      //outline: red 1px solid;
    }
  }
}
</style>