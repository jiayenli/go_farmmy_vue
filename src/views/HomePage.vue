<template>
  <div class="home">

      <CartNavbar />

      <img class="home-slogan" src="./../assets/home-slogan.png" />
    <div class="home-mask" @click="controlCartModel">
      <div class="home-anime">
        <div><img src="./../assets/home-img-4.png" /></div>
        <div><img src="./../assets/home-img-5.png" /></div>
        <div><img src="./../assets/home-img-3.png" /></div>
      </div>
    </div>
    <div class="home-major" @click="controlCartModel">
      <img class="home-major-crown" src="./../assets/home-major-02.png" />
      <img class="home-major-msg" src="./../assets/home-major-03.png" />

      <img class="home-major-product" src="./../assets/home-major.jpg" />
      <img class="home-major-name" src="./../assets/home-major-04.png" />
    </div>
    <div class="nav">
      <Navbar />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CartNavbar from "@/components/CartNavbar.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    CartNavbar
  },
  methods: {
        controlCartModel() {
       this.$store.commit('closeCartModel')


     },
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";

.home {
  margin: 0 0;
  outline: 1px red solid;
  width: 100vw;
  height: 100vh;
  background-image: url("./../assets/home-background.png");
  position: relative;

  &-slogan {
    z-index: 5;
    left: 5%;
    position: absolute;
    width: 250px;
    height: 500px;
  }

  &-mask {
    width: 100%;
    -webkit-mask: url("./../assets/home-img-cover.png") no-repeat center center /
      contain;
    mask-size: cover;
    position: relative;
  }
  &-anime {
    position: relative;
    height: 95vh;
    div {
      display: block;
      position: absolute;
      opacity: 0;
      animation: slider 18s linear infinite;
    }
    img {
      height: 90vh;
      width: 100vw;
      object-fit: cover;
    }
  }
  &-major {
    position: absolute;
    bottom: 30%;
    right: 10%;
    height: 200px;
    width: 200px;
    &-crown {
      //position: absolute;
      position: absolute;
      z-index: 1;
      left: -20px;
      top: -30px;
      height: 100px;
      width: 100px;
      transform: rotate(-40deg);
    }
    &-msg {
      position: absolute;
      left: 50px;
      top: -100px;
      width: 150px;
      height: 120px;
    }
    &-product {
      position: absolute;
      z-index: 2;
      border: 8px $color-brown solid;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
    }
    &-name {
      position: absolute;
      z-index: 3;
      height: 100px;
      width: 120px;
      bottom: -45px;
      left: 40px;
    }
  }
}
.nav {
  position: absolute;
  bottom:6vh;

}

/*動畫關鍵影格, slider動畫名字*/

@keyframes slider {
  10% {
    opacity: 1;
    filter: alpha(opacity=100);
  }
  27% {
    opacity: 1;
    filter: alpha(opacity=100);
  }
  45% {
    opacity: 0;
    filter: alpha(opacity=0);
  }
}

.home-anime div:nth-child(1) {
  animation-delay: 0s;
}

.home-anime div:nth-child(2) {
  animation-delay: 6s;
}

.home-anime div:nth-child(3) {
  animation-delay: 12s;
}
</style>