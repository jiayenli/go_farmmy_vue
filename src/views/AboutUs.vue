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
              src="./../assets/home-img-3.png"
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
      <div class="about-content-middle">
        <div class="about-content-middle-title">
          <h1>農作伙的特色</h1>
          <h4>產地直送，新鮮有保障！</h4>
        </div>
        <div class="about-content-middle-content">
          <h3>| 特色一：產地直送，全程冷藏宅配，確保好品質！</h3>
          <h3>| 特色二：火龍果甜度平均高達20以上，鮮甜好滋味！</h3>

          <h3>| 特色三：直接向農民買，實質回饋農民，農民心血看的見！</h3>
        </div>
      </div>
      <div class="about-content-buttom">
        <div class="about-content-buttom-title">
          <h1>聯繫我們</h1>
          <h4>想知道更多農作伙的消息，歡迎追蹤我們社群！</h4>
        </div>
        <div class="about-content-buttom-content">
          <a
            href="https://www.facebook.com/%E8%BE%B2%E4%BD%9C%E4%BC%99-Go-Farmmy-104432345254333/"
            target="_blank"
            ><i class="fab fa-facebook-square"></i
          ></a>
          <a
            href="https://l.facebook.com/l.php?u=http%3A%2F%2Finstagram.com%2Fgo_farmmy%3Ffbclid%3DIwAR3Cj7RjXG0w8V2-dPwfQAOSN7afgLykLj721PSZcgeLyn9i_myrRlxgH08&h=AT1Pjj931PAmhbqlPLKmmQkB0OUOHzWpCP9ELsAqytOIeMqla9y7XWuepU3aOGoG1XYPMD9ATPxgy_dqHWHmcqPNKtbQehpbR8y3Jto-e4PLoMI4alP0AXOA7dVC77MIINbhhw"
            target="_blank"
          >
            <i class="fab fa-instagram-square"></i
          ></a>
          <a href="mailto:gofarmmy.tw@gmail.com" target="_blank">
            <i class="fas fa-envelope-square"></i
          ></a>
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
    width: 100%;
    margin: 3% auto 0 auto;

    &-top {
      width: 80%;
      margin: 0 auto;
      display: flex;
      &-image {
        width: 50%;
        padding: 2%;
        position: relative;
        object-fit: cover;
        &-1 {
          height: 20vw;
          width: 80%;
          z-index: 5;
          position: absolute;
          opacity: 1;
          transition: 0.6s;

          img {
            object-fit: cover;
            border-bottom-right-radius: 70%;
            border-top-right-radius: 60%;
            border-top-left-radius: 70%;
            border-bottom-left-radius: 60%;
          }
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
            border-bottom-right-radius: 50%;
            border-top-right-radius: 50%;
            border-top-left-radius: 50%;
            border-bottom-left-radius: 60%;
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
              opacity: 0.5;
              &:hover {
                opacity: 1;
                //box-shadow: 0 0 0 3px $color-brown;
                z-index: 5;
                transform: scale(1.8, 1.8) translate(-10%, -20%);
              }
            }
            &-2 {
              opacity: 0.5;
              transform: translate(20%, 60%);
              &:hover {
                opacity: 1;
                //box-shadow: 0 0 0 3px white;
                z-index: 5;
                transform: scale(1.8, 1.8) translate(-10%, 12%);
              }
            }
            &-3 {
              transform: translate(-75%, 60%);
              opacity: 0.5;
              &:hover {
                opacity: 1;
                // box-shadow: 0 0 0 3px white;
                z-index: 5;
                transform: scale(1.8, 1.8) translate(-10%, 12%);
              }
            }
            &-4 {
              opacity: 0.5;
              transform: translate(20%, -60%);
              &:hover {
                opacity: 1;
                // box-shadow: 0 0 0 3px white;
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
    &-middle {
      width: 65%;
      margin: 2% auto;

      &-title {
        width: 45%;
        padding: 1.5% 0 1.5% 2%;
        border: 4px solid $color-brown;
        border-top-left-radius: 50px;
        border-top-right-radius: 50px;
        border-bottom-left-radius: 50px;
        background-color: white;
      }
      &-content {
        margin-top: 2%;
        padding-left: 1%;
        font-weight: border;
        padding-bottom: 2%;
        h3 {
          line-height: 180%;
        }
      }
    }
    &-buttom {
      background-color: rgba(163, 158, 148, 0.3);

      padding: 3% 0 3% 0;

      display: flex;
      flex-direction: column;
      align-items: center;

      &-title {
        width: 30%;
        padding: 1.5% 1.5%;
        border-radius: 50px;
        background-color: $color-brown;
        h1,
        h4 {
          text-align: center;
          color: white;
        }
      }
      &-content {
        width: 100%;
        margin-top: 2%;
        padding-left: 1%;
        font-weight: border;
        text-align: center;
        a {
          &:hover {
            opacity: 0.8;
          }
        }
        .fab,
        .fas {
          margin: 1%;
          font-size: 50px;
          color: $color-brown;
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

@media screen and (max-width: 1100px) {
  .about {
    &-content {
      &-top,
      &-middle {
        width: 90%;
        &-image {
          &:hover {
            .about-content-top-image-1 {
              opacity: 1;
              transform: scale(1, 1);
            }
          }
          &-2 {
            display: none;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .about {
    &-content {
      &-top {
        flex-direction: column;
        &-image {
          text-align: center;
          width: 100%;
          &-1 {
            width: 100%;
            height: 30vw;
            
            position: relative;
            img {
                       border-bottom-right-radius: 30px;
            border-top-right-radius: 30px;
            border-top-left-radius: 30px;
            border-bottom-left-radius: 30px;
            }

          }

        }
         &-text {
           width: 100%;
         }
      }
      &-middle {
        width: 80%;
        &-title {
          padding: 4% 0 4% 4%;
          width: 100%;
        }
      }
       &-buttom {
         &-title {
           width: 60%;
         }
       }
    }
  }
}
@media screen and (max-width: 539px) {
}
</style>