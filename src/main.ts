import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import locale from 'element-plus/lib/locale'
import 'element-plus/lib/theme-chalk/index.css'

// 设置语言
locale.use(lang)

createApp(App).use(store).use(router).use(ElementPlus, { size: 'mini', zIndex: 3000, locale }).mount('#app')
