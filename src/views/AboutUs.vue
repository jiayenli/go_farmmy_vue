<template>
  <div class="about">
    <Navbar />
    <CartNavbar />
    <div class="about-cover" @click="controlCartModel">
      <img class="about-cover-title" src="./../assets/about-title-1.png" />
      <img class="about-cover-img" src="./../assets/product-img-1.png" />
    </div>
    <div class="about-content" @click="controlCartModel">
      <div class="about-content-top">
        <div class="about-content-top-image">
          <div class="about-content-top-image-1">
            <img src="./../assets/about-img-3.png" />
          </div>
          <div class="about-content-top-image-2">
            <img
              class="about-content-top-image-2-1"
              src="./../assets/home-img-4.png"
            />
            <img
              class="about-content-top-image-2-2"
              src="./../assets/home-img-5.png"
            />
            <img
              class="about-content-top-image-2-3"
              src="./../assets/product-icon-2.jpg"
            />
            <img
              class="about-content-top-image-2-4"
              src="./../assets/home-img-3.jpg"
            />
          </div>
        </div>

        <div class="about-content-top-text">
          <div class="about-content-top-text-title">
            <h1>認識農作伙</h1>
            <h4>大家好！我們是「農作伙」</h4>
          </div>
          <div class="about-content-top-text-content">
            <h4>
              「農作伙」來自台中，愛吃水果的我們，喜歡走訪鄉野田間，致力於發現台灣隱藏版鄉間農產美食。
            </h4>
            <h4>
              而在鄉間趴趴走的過程中，卻發現有許多品質很好卻乏人問津的蔬果。因此希望搭起農民跟消費者的橋樑，讓消費者能用最輕鬆的方式買到產地直送的蔬果，也讓果農的心血被看見。
            </h4>

            <h4>
              我們努力將每一顆好果送到島民手上，期盼日後能與島民一起發掘更多美果。
            </h4>
          </div>
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
    width: 80%;
    display: flex;
    margin: 3% auto;
    &-nav {
      width: 30%;
      padding-left: 10%;
      padding-right: 3%;
      // outline: green 1px solid;
    }
    &-top {
      display: flex;
      &-image {
        width: 50%;
        padding: 2%;
        position: relative;
        object-fit: cover;
        &-1 {
          width: 80%;
          z-index: 5;
          position: absolute;
          opacity: 1;
          transition: 0.6s;
          object-fit: cover;
        }
        &-2 {
          transition: 0.3s;
          opacity: 0;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          &-1,
          &-2,
          &-3,
          &-4 {
            transition: 1s;
            height: 180px;
            width: 180px;
            border-radius: 50%;
            object-fit: cover;
            position: absolute;
          }

          &-1 {
            left: 30%;
            top: 30%;
          }
          &-2 {
            right: 30%;
            bottom: 30%;
          }
          &-3 {
            left: 30%;
            bottom: 30%;
          }
          &-4 {
            right: 30%;
            top: 30%;
          }
        }
        &:hover {
          .about-content-top-image-1 {
            opacity: 0;
            transform: scale(0.4, 0.55);
          }
          .about-content-top-image-2 {
            opacity: 1;
            &-1 {
              transform: translate(-75%, -60%);
              &:hover {
                box-shadow: 0 0 0 3px white;
                z-index: 5;
                transform: scale(1.8, 1.8) translate(-10%, -20%);
              }
            }
            &-2 {
              transform: translate(20%, 60%);
                &:hover {
                 box-shadow: 0 0 0 3px white;
                z-index: 5;
                transform: scale(1.8, 1.8) translate(-10%, 12%);
              }
            }
            &-3 {
              transform: translate(-75%, 60%);
                &:hover {
                 box-shadow: 0 0 0 3px white;
                z-index: 5;
                transform: scale(1.8, 1.8) translate(-10%, 12%);
              }
            }
            &-4 {
              transform: translate(20%, -60%);
                 &:hover {
                 box-shadow: 0 0 0 3px white;
                z-index: 5;
                transform: scale(1.8, 1.8) translate(-10%, -20%);
              }
            }
          }
        }
      }

      &-text {
        width: 50%;
        padding: 2%;
        &-title {
          padding: 3% 0 3% 5%;
          border: 4px solid $color-brown;
          border-top-left-radius: 50px;
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;
          background-color: white;
          &:hover {
          }
        }
        &-content {
          margin-top: 5%;
          font-weight: border;
          h4 {
            line-height: 180%;
            margin-top: 3%;
          }
        }
      }
    }
  }
}

@keyframes changePicture {
  0% {
    transform: scale(0.9, 0.9);
  }
  70% {
    transform: scale(0.5, 0.5);
  }
  100% {
    opacity: 0;
  }
}
</style>