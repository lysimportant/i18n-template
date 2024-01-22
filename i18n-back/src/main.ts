import router from './router'
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'normalize.css'
import './assets/css/base.css'
import 'element-plus/dist/index.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia()
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
