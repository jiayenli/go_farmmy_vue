<template>
  <div class="home-nav">
    <div class="home-nav-icon">
      <img src="./../assets/home-nav-icon-08.png" />
    </div>
    <div class="home-nav-icon">
      <img src="./../assets/home-nav-icon-06.png" />
    </div>
    <div class="home-nav-logo">
      <img src="./../assets/home-logo.png" />
    </div>
    <div class="home-nav-icon">
      <img src="./../assets/home-nav-icon-09.png" />
    </div>
    <div class="home-nav-icon">
      <img src="./../assets/home-nav-icon-07.png" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-nav {
  bottom: 5vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  width: 100vw;
  &-logo {
    display: flex;
    width: 30%;
    img {
      margin: 0 auto;
      width: 70%;
    }
    :hover {
       animation: logoFocus 0.1s linear infinite;
    }
  }
  &-icon {
    margin: 0 2%;
    width: 10%;
   // border-left: 4px #38301f solid;
    padding: 0 0 0 1%;
     z-index: 2;
 
    &::after {
      content: "";
      top:80%;
      position: absolute;
      display: block;
      width: 9VW;
      height: 10%;
      z-index: -1;
      background-color: #edda7e;
    }
    &::before {
       position: absolute;
      display: block;
  transform: translateX(-250%);
      top:70%;
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
</style>