import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
import { createPinia } from 'pinia'
import { Button } from 'vant'
// router
import router from '@/router'
import './permission'
const app = createApp(App)
const pinia = createPinia()
app.use(Button)
app.use(router)
app.use(pinia)
app.mount('#app')
