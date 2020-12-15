import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueParticles from 'vue-particles'

// 全局配置
import '@/assets/scss/reset.scss'
import 'element-ui/lib/theme-chalk/index.css'
import http from '@/api/config'
import './mock'

// 第三方包
import ElementUI from 'element-ui'
import echarts from 'echarts'
import '../node_modules/echarts/map/js/province/beijing.js'  // 引入北京地图数据

Vue.prototype.echarts = echarts


Vue.use(ElementUI)
Vue.prototype.$http = http

Vue.config.productionTip = false

axios.defaults.withCredentials = true
// axios.defaults.baseURL = "http://localhost:8080"
Vue.prototype.$axios = axios
Vue.use(axios)
Vue.use(VueParticles)

router.beforeEach((to, from, next) => {
  // 防止刷新后vuex里丢失token
  store.commit('getToken')
  // 防止刷新后vuex里丢失标签列表tagList
  store.commit('getMenu')
  let token = store.state.user.token
  // 过滤登录页，防止死循环
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    store.commit('addMenu', router)
  }
}).$mount('#app')
