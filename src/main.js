import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
import './assets/fonts/iconfont.css'

import './assets/css/global.css'
import './plugins/element.js'
Vue.config.productionTip = false
Vue.component('tree-table', TreeTable)
// 配置请求根路径
Vue.prototype.$http = axios
// 请求拦截
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
