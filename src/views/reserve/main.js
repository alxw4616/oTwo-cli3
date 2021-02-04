import Vue from 'vue'
import '@/cube-ui'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import '@/router/permission.js'

Vue.config.productionTip = false

// 全局样式
import '@/assets/css/flex-attribute.less';
import '@/assets/css/style.less';
import "weui";

// global filters
// register global utility filters
import * as filters from '@/utils/filters.js'
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})


// ajax 接口
import db from '@/utils/db.js'
Vue.prototype.$db = db

// 常用工具函数
import tool from '@/utils/tool.js'
Vue.prototype.$tool = tool

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
