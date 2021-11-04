import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/zh_TW/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



Vue.config.productionTip = false


new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app')
