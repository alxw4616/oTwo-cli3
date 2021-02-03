import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/css/style.less';

// 字体图标 http://www.fontawesome.com.cn/
// <i class="fa fa-address-book-o" aria-hidden="true"></i>
import 'font-awesome/css/font-awesome.min.css'

console.log('process.env',process.env);

createApp(App).use(store).use(router).mount('#app')
