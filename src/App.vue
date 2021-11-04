<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "assets/scss/reset.scss";
#app {
  height: 100vh;
  width: 100vw;
  outline: 1px green solid;
}
</style>

<script>
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import './assets/application.js'

export default {
  name: "App",
  mounted() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "279524904068988",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });



      console.log("fbAsyncInit");
    };
  },
};
</script>
