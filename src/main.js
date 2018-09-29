// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Vuex from 'vuex';
import store from './vuex/store'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store:store,
  router:router,
  components: {App},
  template: '<App/>',
  render:h=>h(App)
})