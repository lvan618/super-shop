import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/fonts/iconfont.css'

import './assets/css/global.css'
import './plugins/element.js'
Vue.config.productionTip = false
// 配置请求根路径
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
