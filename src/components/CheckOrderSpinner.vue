<template>
<div class="loader-area">
  <div class="loader-area-hightlight">
  <div class="loader"></div>
  <h3>{{text}}</h3>
  </div>
  </div>
</template>

<style lang="scss" scoped>

@import "../assets/scss/color.scss";
.loader-area {
        display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: fixed;

  &-hightlight {
      display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 30%;
  border: 8px $color-yellow solid;
  border-radius: 20px;
  padding-bottom: 2% ;
   //height: 250px;

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
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}


</style>

<script>
export default {
  props: {
    text: {
      require: true
    }
  }
  
}
</script>