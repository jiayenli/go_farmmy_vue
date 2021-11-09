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
      //console.log("fb有到");
      window.FB.init({
        appId: "279524904068988",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });

      window.gapi.load("auth2", () => {
       // console.log('google有到')
        window.gapi.auth2.init({
          client_id: "502621069725-6ksmjc0une7bfj1m7k0tj9gv5gi1cif4.apps.googleusercontent.com",
        });
      });

      
    };
  },
};
</script>
