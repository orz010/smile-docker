import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import HeaderBox from './components/HeaderBox.vue';
import AdminAsideBox from './components/AdminAsideBox.vue'

Vue.use(ElementUI)

Vue.prototype.$axios = axios
Vue.prototype.$baseUrl = "http://10.251.255.167:8000/"

Vue.config.productionTip = false
Vue.component("HeaderBox", HeaderBox)
Vue.component("AdminAsideBox", AdminAsideBox)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
