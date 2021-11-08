<template>
  <div class="nav" @click="controlCartModel">
    <input type="checkbox" class="navbar-toggle" id="navbar-toggle" />
    <label class="navbar-toggle-label" for="navbar-toggle">
      <span class="hamburger"><i class="fas fa-bars"></i></span>
    </label>
    <div class="phone-nav">
      <div class="phone-nav-content">
        <router-link :to="{ name: 'About' }" class="phone-nav-icon">
          <img src="./../assets/home-nav-icon-08.png" />
        </router-link>

        <router-link :to="{ name: 'Product' }" class="phone-nav-icon">
          <img src="./../assets/home-nav-icon-06.png" />
        </router-link>

        <router-link :to="{ name: 'Producer' }" class="phone-nav-icon">
          <img src="./../assets/home-nav-icon-09.png" />
        </router-link>
        <router-link :to="{ name: 'User-Profile' }" class="phone-nav-icon">
          <img src="./../assets/home-nav-icon-07.png" />
        </router-link>
        <div class="phone-nav-logo">
          <router-link :to="{ name: 'Home' }">
            <img src="./../assets/home-logo.png" />
          </router-link>
        </div>
      </div>
    </div>

    <div class="home-nav">
      <router-link :to="{ name: 'About' }" class="home-nav-icon">
        <img src="./../assets/home-nav-icon-08.png" />
      </router-link>

      <router-link :to="{ name: 'Product' }" class="home-nav-icon">
        <img src="./../assets/home-nav-icon-06.png" />
      </router-link>

      <div class="home-nav-logo">
        <router-link :to="{ name: 'Home' }">
          <img src="./../assets/home-logo.png" />
        </router-link>
      </div>
      <router-link :to="{ name: 'Producer' }" class="home-nav-icon">
        <img src="./../assets/home-nav-icon-09.png" />
      </router-link>
      <router-link :to="{ name: 'User-Profile' }" class="home-nav-icon">
        <img src="./../assets/home-nav-icon-07.png" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    controlCartModel() {
      this.$store.commit("closeCartModel");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
@import "../assets/scss/efficient.scss";
.nav {
  position: relative;
}
.navbar-toggle {
  display: none;
}
.navbar-toggle-label {
  display: none;
  margin-top: 2%;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: $color-brown;
  color: white;
  position: absolute;
  left: 2%;
  z-index: 10;
  font-size: 26px;
  top: 2%;
}

.phone-nav {
  display: none;
}

.home-nav {
  // position: absolute;
  padding-top: 2%;
  margin-bottom: 2%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  //width: 100vw;
  &-logo {
    display: flex;
    width: 30%;

    img {
      margin: 0 auto;
      min-width: 220px;
      width: 70%;
    }
    &:hover {
      animation: logoFocus 0.1s linear infinite;
    }
  }
  &-icon {
    margin: 0 2%;
    width: 10%;
    min-width: 100px;
    // border-left: 4px #38301f solid;
    padding: 0 0 0 1%;
    z-index: 2;

    &::after {
      content: "";
      top: 80%;
      position: absolute;
      display: block;
      width: 9vw;
      height: 10%;
      z-index: -1;
      background-color: #edda7e;
      transition: 0.3s;
    }
    &::before {
      position: absolute;
      display: block;
      transform: translateX(-250%);
      top: 70%;
      content: "";
      height: 30%;
      width: 0.5%;
      background-color: #38301f;
    }
    &:hover {
      &::after {
        background-color: #9ac167;
      }
    }
  }
  .router-link-active {
    &::after {
      background-color: #9ac167;
    }
  }
}

@keyframes logoFocus {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(2deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes navAppear {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0%);
  }
}

@media screen and (max-width: 1300px) {
  .home-nav {
    &-icon {
      width: 15%;
      &::after {
        width: 13vw;
      }
    }
    &-logo {
      img {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 1100px) {
  .home-nav {
    &-icon {
      width: 18%;
    }
    &-logo {
      img {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .home-nav {
    display: none;
  }
  .navbar-toggle-label {
    display: flex;
  }
  .navbar-toggle:checked ~ .phone-nav {
    transition: 1s;
    display: flex;
    opacity: 1;
    &-content {
      animation: navAppear 0.3s linear;
    }
  }
  .phone-nav {
    display: none;
    z-index: 8;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    &-content {
      animation: navAppear 0.3s linear;
      display: flex;
      flex-direction: column;
      transition: 1s;
      align-items: center;
      width: 50%;
      height: 100vh;
      background-image: url("./../assets/home-background.png");
      padding-top: 10%;
    }
    &-icon {
      //width: 100%;

      img {
        width: 120px;
        height: 80px;
        margin-bottom: 20%;
      }
      &::before {
        position: absolute;
        display: block;
        transform: translate(-120%, 60%);
        content: "";
        height: 7%;
        width: 1.5%;
        background-color: $color-yellow;
      }
    }
    &-logo {
      position: relative;
      width: 40vw;
      margin: 30% auto 0 auto;
    }
  }
}
</style>