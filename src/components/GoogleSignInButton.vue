<template>
  <div class="button">
    <div id="google-sign-in-button"  ></div>
  </div>
</template>

<script>
export default {
  name: "GoogleSignInButton",
  data(){
    return{

    }


  },
  props: {
    width: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
  },
  mounted() {
    window.gapi.signin2.render("google-sign-in-button", {
      scope: "profile email",
      width: 50,
      height: 50,
      longtitle: false,
      theme: "light",
     onsuccess: this.signIn,
      onfailure: () => {},
    });
  },
  methods: {
    signIn(googleUser) {
      console.log('有到按鈕的地方')
      const id_token = googleUser.getAuthResponse().id_token;
      this.$emit("sign-in", id_token);
    },
  },
};
</script>



<style lang="scss" scoped>
@import "../assets/scss/color.scss";

.button {
  border: 4px solid $color-brown;
  border-radius: 5px;
}
</style>