import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

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
Vue.filter('dateFormat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '')
  const d = (dt.getDate() + 1 + '').padStart(2, '')
  const hh = (dt.getHours() + '').padStart(2, '')
  const mm = (dt.getMinutes() + '').padStart(2, '')
  const ss = (dt.getSeconds() + '').padStart(2, '')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
// 将富文本编辑器注册为全局可用
Vue.use(VueQuillEditor)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
