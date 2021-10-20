<template>
  <div id="app">
    <router-view/>
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
export default {
  name: 'App'
  
}
</script>
