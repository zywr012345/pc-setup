import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 轮播

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

export default app;
