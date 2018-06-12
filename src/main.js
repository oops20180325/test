import Vue from 'vue'
import App from './App'
import Axios from './utils/diyaxios' // 封装的axue:加了个code判断
import router from './router/router'
import store from './store'
import MuseUI from 'muse-ui'// muse-ui换肤
import Toast from 'vue-easy-toast'// 提示插件
import 'muse-ui/dist/muse-ui.css'
import 'assets/theme.less'
import FastClick from 'fastclick' // 解决移动端300毫秒延迟
// 解决延迟
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
// 挂载Museui 和toast
Vue.use(MuseUI)
Vue.use(Toast)
Vue.prototype.$http = Axios // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等
/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
