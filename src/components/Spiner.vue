<template>
<div class="loader-area">
  <div class="loader-area-hightlight">
  <div class="loader"></div>
  </div>
  </div>
</template>

<style lang="scss" scoped>

@import "../assets/scss/color.scss";
.loader-area {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 999;
  height: 100%;
  width: 100%;
  overflow: hidden;
  &-hightlight {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.6em solid $color-brown;
  border-right: 1.6em solid $color-yellow;
  border-bottom: 1.6em solid $color-yellow;
  border-left: 1.6em solid $color-yellow;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 767px) {
  .loader-area {
  &-hightlight {
    width: 70%;
  }
  }
}

</style>

