<template>
  <div class="about">
    <Navbar />
    <CartNavbar />
    <div class="about-cover" @click="controlCartModel">
      <img class="about-cover-title" src="./../assets/producer-title-1.png" />
      <img class="about-cover-img" src="./../assets/product-img-1.png" />
    </div>
    <div class="about-content" @click="controlCartModel">
      <div class="about-content-top">
        <div class="about-content-top-text">
          <h1>產地故事即將上線！</h1>
          <h4>農作伙正在積極採訪中，猜猜誰是即將登場的故事主角！</h4>
        </div>
      </div>
      <div class="about-content-producer">
        <div class="producerimage about-content-producer-1">
          <img
            class="about-content-producer-1-img"
            src="./../assets/producer1.png"
          />
          <h2>班尼楊</h2>
          <h3>Backend Engineer</h3>
          <h4>貨運司機兼農作伙網站後端開發</h4>
        </div>

        <div class="producerimage about-content-producer-2">
          <img
            class="about-content-top-producer-2-img"
            src="./../assets/producer2.jpg"
          />
          <h2>潔米李</h2>
          <h3>Frontend Engineer</h3>
          <h4>試吃員兼農作伙網站前端開發者</h4>
        </div>
        <div class="producerimage about-content-producer-3">
          <img
            class="about-content-top-producer-3-img"
            src="./../assets/producer3.jpg"
          />
          <h2>阿火伯</h2>
          <h3>Farmer</h3>
          <h4>真的有在生產的農夫</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";

export default {
  name: "Product-Detail",
  components: {
    Navbar,
    CartNavbar,
  },

  data() {
    return {
      item: {},
      showItems: [],
      filterName: "",
    };
  },

  methods: {
    controlCartModel() {
      this.$store.commit("closeCartModel");
    },
  },
  created() {},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/efficient.scss";

.about {
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
    padding:0 2% 1% 0;
   
   // background-color: white;
    //background-color: $color-yellow;

    width: 80%;
    margin: 3% auto;
    &-nav {
      width: 30%;
      padding-left: 10%;
      padding-right: 3%;
      // outline: green 1px solid;
    }
    &-top {
      //border-bottom: 6px solid $color-brown;


      width: 100%;
      &-text {
        margin: 0 auto;
        width: 40%;
        padding: 2% 0 2% 2%;
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
        background-color: $color-brown;
        h1, h4 {
          text-align: center;
          color: white
        }
      }
     
    }
     &-producer {
    //     border-left: 10px solid $color-brown;
    // border-right: 10px solid $color-brown;
      
        display: flex;
        margin: 5% auto;
        justify-content: center;
        &-1 {
          img {
            border-bottom-right-radius: 70%;
            border-top-right-radius: 50%;
            border-top-left-radius: 80%;
            border-bottom-left-radius: 50%;
          }
        }
        &-2 {
          img {
            border-bottom-right-radius: 60%;
            border-top-right-radius: 80%;
            border-top-left-radius: 50%;
            border-bottom-left-radius: 60%;
          }
        }
        &-3 {
          img {
            border-bottom-right-radius: 50%;
            border-top-right-radius: 50%;
            border-top-left-radius: 50%;
            border-bottom-left-radius: 60%;
          }
        }

        .producerimage {
          margin: 0 3%;
          text-align: center;

          img {
            opacity: 0.5;
            transition: 0.3s;
          }
          h2,
          h3,
          h4 {
            opacity: 0;
            transition: 0.4s;
          }

          width: 15vw;
          height: 15vw;

          &:hover {
            img {
              opacity: 1;
              border-bottom-right-radius: 50%;
              border-top-right-radius: 50%;
              border-top-left-radius: 50%;
              border-bottom-left-radius: 50%;
              // box-shadow: 0 0 0 4px $color-brown;
            }
            h2,
            h3,
            h4 {
              opacity: 1;
            }
          }
        }
      }
  }
}
</style>