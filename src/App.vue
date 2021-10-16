<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "assets/scss/reset.scss";
</style>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
export default {
  name: 'App'
  
}
</script>
