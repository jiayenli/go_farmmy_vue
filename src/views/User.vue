<template>
  <div class="user">
    <Navbar />
     <CartNavbar />
    <div class="user-cover" @click="controlCartModel">
      <img class="user-cover-title" src="./../assets/member-title-1.png" />
      <img class="user-cover-img" src="./../assets/home-img-5.png" />
    </div>
    <div class="user-content" @click="controlCartModel">
      <div class="user-content-nav">
        <UserNavbar @detailPageFilter="productFilter"/>
      </div>
      <div class="user-content-items">

        <!--商品卡片區-->
        <UserEdit />
        
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";
import UserNavbar from "@/components/UserNavbar.vue";
import UserEdit from "@/components/UserEdit.vue";



export default {
  name: "Member",
  components: {
    Navbar,
    UserNavbar,
    UserEdit,
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

@media screen and (max-width: 1100px) {
    .user {
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
  .user {
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
    .user {
    &-content {
      flex-direction: column;
          &-nav {
        width: 100%;
      }
      &-items {
        margin-top: 2% ;
        width: 100%;
        padding: 1.5%;
      }
    }
  }

}

</style>